#!/usr/bin/env node
/**
 * parse-pdf-questions.mjs
 *
 * Extracts exam questions from official Taiwan driving exam PDFs.
 * Uses pdftotext (poppler) for PDF text extraction.
 *
 * Usage:
 *   node scripts/parse-pdf-questions.mjs \
 *     --input  raw/汽車法規是非題-中文1131114.pdf \
 *     --category regulation-tf \
 *     --start-id 1001 \
 *     --output src/data/exam-questions-regulation-tf.ts
 */

import { spawnSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CLI arg parsing ──────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv);
const inputPath = args['input'];
const category = args['category'];
const startId = parseInt(args['start-id'] ?? '1', 10);
const outputPath = args['output'];
// For sign categories: path prefix for images (e.g. "signs/tf")
const imagePrefix = args['image-prefix'] ?? null;

const VALID_CATEGORIES = ['regulation-tf', 'regulation-mc', 'sign-tf', 'sign-mc', 'mechanical'];
if (!inputPath || !category || !VALID_CATEGORIES.includes(category)) {
  console.error('Usage: node parse-pdf-questions.mjs --input <pdf> --category <cat> [--start-id N] [--output <ts>]');
  console.error('Categories: ' + VALID_CATEGORIES.join(' | '));
  process.exit(1);
}

const isTf = category.endsWith('-tf');
const isSign = category.startsWith('sign');

// ── PDF text extraction ──────────────────────────────────────────────────────

function extractPdfText(pdfPath) {
  const result = spawnSync('pdftotext', ['-layout', resolve(pdfPath), '-'], {
    encoding: 'utf8',
    maxBuffer: 30 * 1024 * 1024,
  });
  if (result.error) { console.error('pdftotext not found — install poppler: brew install poppler'); process.exit(1); }
  if (result.status !== 0) { console.error('pdftotext error:', result.stderr); process.exit(1); }
  return result.stdout;
}

// ── Text helpers ─────────────────────────────────────────────────────────────

function normaliseText(str) {
  return str
    // Full-width brackets → ASCII
    .replace(/（/g, '(').replace(/）/g, ')')
    // Full-width digits → ASCII
    .replace(/[１２３４５６７８９０]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Lines to ignore when collecting surrounding text
function isNoise(line) {
  const t = line.trim();
  if (!t) return false; // blank lines handled separately
  return (
    /^\d{1,2}$/.test(t) ||              // standalone category code (e.g. "10", "02")
    /第\s*\d+\s*頁/.test(t) ||          // page numbers
    /分類編/.test(t) ||                  // category legend header
    /題號\s*答案/.test(t) ||             // table column header
    /題\s+目/.test(t) ||                 // table column header (question)
    /^汽車(法規|標誌)/.test(t) ||        // PDF title lines
    /^汽車標誌、標線/.test(t) ||
    /分類項目/.test(t)
  );
}

// Strip trailing 2-digit category code from any line of text
function stripLineCode(str) {
  return str.replace(/\s{2,}\d{2}\s*$/, '').trim();
}

// Strip the 2-digit category code from the inline text portion.
// The regex `\s*(.*)` already consumed leading spaces, so m[3] may be JUST "10"
// (no leading space), or have trailing " 10" after real content.
function stripInlineCategoryCode(str) {
  const t = str.trim();
  // Case 1: inline text IS the category code (nothing else on this line)
  if (/^\d{1,2}$/.test(t)) return '';
  // Case 2: real text followed by whitespace + category code
  return t.replace(/\s{2,}\d{2}\s*$/, '').trim();
}

// ── Two-pass parser ──────────────────────────────────────────────────────────

const TF_PATTERN  = /^\s{0,12}(\d{3})\s+(○|X|Ｏ)\s*(.*)/;
const MC_PATTERN  = /^\s{0,12}(\d{3})\s+([1-4])\s*(.*)/;
const Q_PATTERN   = isTf ? TF_PATTERN : MC_PATTERN;

function parseQuestions(rawText) {
  const lines = rawText.split('\n');

  // ── Pass 1: locate all question marker lines ─────────────────────────────
  const markers = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(Q_PATTERN);
    if (!m) continue;
    if (parseInt(m[1], 10) === 0) continue;
    markers.push({ lineIdx: i, num: parseInt(m[1], 10), answer: m[2], inlineText: m[3] ?? '' });
  }

  // Helper: check if there is at least one blank line in [from+1, to-1]
  function hasBlankBetween(from, to) {
    for (let i = from + 1; i < to; i++) {
      if (!lines[i]?.trim()) return true;
    }
    return false;
  }

  // ── Pass 2: collect text around each marker ──────────────────────────────
  const parsed = [];

  for (let mi = 0; mi < markers.length; mi++) {
    const marker = markers[mi];

    const prevMarkerLine = mi > 0 ? markers[mi - 1].lineIdx : -1;
    const nextMarkerLine = mi < markers.length - 1 ? markers[mi + 1].lineIdx : lines.length;

    // If no blank line between this and the neighbor, use midpoint to avoid text bleeding
    const noBefore = prevMarkerLine >= 0 && !hasBlankBetween(prevMarkerLine, marker.lineIdx);
    const noAfter  = nextMarkerLine < lines.length && !hasBlankBetween(marker.lineIdx, nextMarkerLine);

    const preStop  = noBefore
      ? Math.floor((prevMarkerLine + marker.lineIdx) / 2)  // midpoint (exclusive lower bound)
      : prevMarkerLine;                                     // marker boundary

    const postStop = noAfter
      ? Math.floor((marker.lineIdx + nextMarkerLine) / 2) + 1  // midpoint (exclusive upper bound)
      : nextMarkerLine;                                         // marker boundary

    // Pre-text: go backward, stop at blank OR preStop boundary
    const preLines = [];
    for (let i = marker.lineIdx - 1; i > preStop; i--) {
      const trimmed = lines[i]?.trim() ?? '';
      if (!trimmed) break;
      if (isNoise(trimmed)) continue;
      preLines.unshift(stripLineCode(trimmed));
    }

    // Post-text: go forward, stop at blank OR postStop boundary
    const postLines = [];
    for (let i = marker.lineIdx + 1; i < postStop; i++) {
      const trimmed = lines[i]?.trim() ?? '';
      if (!trimmed) break;
      if (isNoise(trimmed)) continue;
      postLines.push(stripLineCode(trimmed));
    }

    // Inline text: strip the trailing category code (right-most column of the table)
    const inlineText = stripInlineCategoryCode(marker.inlineText);

    // Combine and normalise
    const parts = [...preLines, inlineText, ...postLines].filter(Boolean);
    const combined = normaliseText(parts.join(' '));

    parsed.push({ num: marker.num, answer: marker.answer, text: combined });
  }

  return parsed;
}

// ── Option splitting for MC ──────────────────────────────────────────────────

function splitMcOptions(text) {
  // Options appear as (1)text (2)text (3)text — possibly full-width already normalised
  const parts = text.split(/\(([1-4])\)\s*/);
  // parts = [beforeOpt1, "1", opt1text, "2", opt2text, ...]
  const questionPart = parts[0].trim();
  const options = [];
  for (let i = 1; i < parts.length; i += 2) {
    const optText = ((parts[i + 1] ?? '')).trim().replace(/。\s*$/, '').replace(/\s+/g, ' ');
    if (optText) options.push(optText);
  }
  return { questionPart, options };
}

// ── Build ExamQuestion objects ───────────────────────────────────────────────

function buildQuestions(parsed) {
  const questions = [];

  for (const item of parsed) {
    if (!item.text && !isSign) continue;   // skip empty non-sign questions

    if (isTf) {
      // For sign-tf: text is just the label, wrap it
      const questionText = isSign
        ? `如圖所示的標誌，其含義為「${item.text}」，此說明是否正確？`
        : item.text;

      if (questionText.length < 4) continue;

      const correct = (item.answer === '○' || item.answer === 'Ｏ') ? 0 : 1;
      questions.push({
        question: questionText,
        options: ['○（是）', 'X（否）'],
        correct,
      });
    } else {
      // MC
      let questionText, options, correct;

      if (isSign) {
        // sign-mc: text = "(1)option1 (2)option2 (3)option3"
        const { options: opts } = splitMcOptions(item.text);
        if (opts.length < 2) continue;
        questionText = '如圖所示的標誌，其含義為何？';
        options = opts;
      } else {
        // regulation-mc: text = "question sentence (1)opt1 (2)opt2 (3)opt3"
        const { questionPart, options: opts } = splitMcOptions(item.text);
        if (opts.length < 2) continue;
        questionText = questionPart || '（請依選項判斷）';
        options = opts;
      }

      correct = parseInt(item.answer, 10) - 1;
      if (correct < 0 || correct >= options.length) continue;

      questions.push({ question: questionText, options, correct });
    }
  }

  return questions;
}

// ── ID and explanation ───────────────────────────────────────────────────────

function formatId(n) { return `EQ-${String(n).padStart(4, '0')}`; }

function makeExplanation(q) {
  if (isTf) {
    return q.correct === 0
      ? '此敘述正確。請記住相關交通規則以確保行車安全。'
      : '此敘述不正確，請注意相關法規或標誌說明。';
  }
  return `正確答案為「${q.options[q.correct]}」。請參閱相關法規或標誌說明。`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log(`Extracting: ${inputPath}`);
const rawText = extractPdfText(inputPath);
console.log(`Raw chars: ${rawText.length}`);

const parsed = parseQuestions(rawText);
console.log(`Markers found: ${parsed.length}`);

const built = buildQuestions(parsed);
console.log(`Valid questions: ${built.length}`);

if (built.length === 0) { console.error('No questions built — check PDF format.'); process.exit(1); }

const examQuestions = built.map((q, i) => {
  const base = {
    id: formatId(startId + i),
    category,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: makeExplanation(q),
  };
  if (imagePrefix) {
    base.image = `${imagePrefix}/${String(i).padStart(3, '0')}.png`;
  }
  return base;
});

// ── Output ───────────────────────────────────────────────────────────────────

if (outputPath) {
  const tsContent = `// Auto-generated by parse-pdf-questions.mjs — DO NOT EDIT MANUALLY
// Source: ${inputPath}  |  Category: ${category}  |  Count: ${examQuestions.length}

import type { ExamQuestion } from '../types/exam';

export const QUESTIONS_${category.replace(/-/g, '_').toUpperCase()}: ExamQuestion[] = ${JSON.stringify(examQuestions, null, 2)};
`;
  writeFileSync(resolve(outputPath), tsContent, 'utf8');
  console.log(`Written → ${outputPath}`);
} else {
  // Preview mode
  console.log('\n=== First 5 questions ===');
  examQuestions.slice(0, 5).forEach((q) => {
    console.log(`\n[${q.id}] ${q.question}`);
    q.options.forEach((o, i) => console.log(`  ${i + 1}. ${o}${i === q.correct ? ' ✓' : ''}`));
  });
  console.log('\n=== Last 5 questions ===');
  examQuestions.slice(-5).forEach((q) => {
    console.log(`\n[${q.id}] ${q.question}`);
    q.options.forEach((o, i) => console.log(`  ${i + 1}. ${o}${i === q.correct ? ' ✓' : ''}`));
  });

  // Save full JSON for inspection
  const tmpPath = resolve(__dirname, '../raw/parsed-output.json');
  writeFileSync(tmpPath, JSON.stringify(examQuestions, null, 2), 'utf8');
  console.log(`\nFull JSON → raw/parsed-output.json`);
}
