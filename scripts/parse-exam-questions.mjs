/**
 * parse-exam-questions.mjs
 *
 * Parses Taiwan driving license exam question bank Word files (.docx)
 * from the Ministry of Transportation (交通部公路局) and outputs
 * TypeScript ExamQuestion[] entries to stdout or a file.
 *
 * Usage:
 *   node scripts/parse-exam-questions.mjs \
 *     --input ./raw/汽車法規是非題.docx \
 *     --category regulation-tf \
 *     [--start-id 1001] \
 *     [--output ./src/data/exam-questions-extra.ts]
 *
 * Prerequisites:
 *   npm install mammoth --save-dev
 *
 * Supported categories:
 *   regulation-tf   法規是非題
 *   regulation-mc   法規選擇題
 *   sign-tf         標誌是非題
 *   sign-mc         標誌選擇題
 *   mechanical      機械常識
 *
 * Download 2025 official question bank from:
 *   https://www.thb.gov.tw/cl.aspx?n=12
 */

import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── CLI arg parsing ──────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      args[key] = argv[i + 1] ?? true;
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv);
const inputPath = args.input;
const category = args.category;
const startId = parseInt(args['start-id'] ?? '1', 10);
const outputPath = args.output;

if (!inputPath || !category) {
  console.error(
    'Usage: node scripts/parse-exam-questions.mjs --input <file.docx> --category <cat> [--start-id N] [--output <file.ts>]',
  );
  console.error(
    'Categories: regulation-tf | regulation-mc | sign-tf | sign-mc | mechanical',
  );
  process.exit(1);
}

// ─── Load mammoth ─────────────────────────────────────────────────────────────

let mammoth;
try {
  mammoth = (await import('mammoth')).default;
} catch {
  console.error('Error: mammoth is not installed. Run: npm install mammoth --save-dev');
  process.exit(1);
}

// ─── Parse Word file ──────────────────────────────────────────────────────────

const isTf = category.endsWith('-tf');

const filePath = resolve(process.cwd(), inputPath);
const buffer = await readFile(filePath);

const { value: rawText } = await mammoth.extractRawText({ buffer });

// ─── Detect question format by scanning the document ─────────────────────────
//
// Taiwan government question bank formats observed:
//
// 是非題 format:
//   1. 題目文字
//   答：○  (or ✕ or O or X)
//
// 選擇題 format (may vary by file):
//   1. 題目文字
//   (1) 選項A  (2) 選項B  (3) 選項C  (4) 選項D
//   答：(2)
//
// Some files use different numbering styles:
//   001  題目  or  第1題  or  1.  etc.

const lines = rawText
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

// ─── State machine parser ─────────────────────────────────────────────────────

const questions = [];
let currentQ = null;
let currentOptions = [];
let questionCounter = startId;

/** Detect line that starts a new question (starts with a number + punctuation/space) */
function isQuestionStart(line) {
  return /^(\d{1,4})[.、。\s]/.test(line);
}

/** Extract question number and body from a question-start line */
function parseQuestionLine(line) {
  const m = line.match(/^(\d{1,4})[.、。\s]+(.+)/);
  return m ? m[2].trim() : line;
}

/** Detect answer line */
function isAnswerLine(line) {
  return /^答[案：:]/i.test(line) || /^[Aa]ns[.：:]/i.test(line) || /^正確答案[：:]/i.test(line);
}

/** Parse TF answer — returns 0 for correct (○/O/T/1), 1 for wrong (✕/X/F/2) */
function parseTfAnswer(line) {
  const normalized = line.replace(/答[案：:]\s*/i, '').trim();
  if (/[○OoTt1]/.test(normalized)) return 0;
  if (/[✕×XxFf2]/.test(normalized)) return 1;
  return 0; // fallback
}

/** Parse MC answer — returns 0-based index */
function parseMcAnswer(line) {
  const normalized = line.replace(/答[案：:]\s*/i, '').trim();
  // (1) / 1 / A / (A) formats
  const numMatch = normalized.match(/[(\[（]?([1-4])[)\]）]?/);
  if (numMatch) return parseInt(numMatch[1]) - 1;
  const alphaMatch = normalized.match(/[(\[（]?([A-Da-d])[)\]）]?/);
  if (alphaMatch) return alphaMatch[1].toUpperCase().charCodeAt(0) - 65;
  return 0;
}

/** Try to extract inline options from a single line: (1)A (2)B (3)C (4)D */
function extractInlineOptions(line) {
  const parts = line.split(/[(\[（]\d[)\]）]\s*/);
  const opts = parts.filter((p) => p.trim().length > 0).map((p) => p.trim());
  return opts.length >= 2 ? opts : null;
}

/** Detect if line is an option line: starts with (1)/(2) or (A)/(B) etc. */
function isOptionLine(line) {
  return /^[(\[（]\s*[1-4A-Da-d]\s*[)\]）]/.test(line);
}

function extractOptionText(line) {
  return line.replace(/^[(\[（]\s*[1-4A-Da-d]\s*[)\]）]\s*/, '').trim();
}

function saveCurrentQuestion() {
  if (!currentQ) return;

  if (isTf) {
    questions.push({
      id: `EQ-${String(questionCounter).padStart(4, '0')}`,
      category,
      question: currentQ.text,
      options: ['○', '✕'],
      correct: currentQ.answer ?? 0,
      explanation: '',
    });
  } else {
    if (currentOptions.length < 2) {
      // Skip malformed
      currentQ = null;
      currentOptions = [];
      return;
    }
    questions.push({
      id: `EQ-${String(questionCounter).padStart(4, '0')}`,
      category,
      question: currentQ.text,
      options: currentOptions,
      correct: currentQ.answer ?? 0,
      explanation: '',
    });
  }

  questionCounter++;
  currentQ = null;
  currentOptions = [];
}

// ─── Main parse loop ──────────────────────────────────────────────────────────

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (isQuestionStart(line)) {
    saveCurrentQuestion();

    const questionText = parseQuestionLine(line);

    // Check if options are inline on the same line
    const inlineOpts = !isTf ? extractInlineOptions(questionText) : null;
    if (inlineOpts) {
      // Options were part of the question line — unusual but handle it
      currentQ = { text: questionText.split(/[(\[（]1[)\]）]/)[0].trim(), answer: null };
      currentOptions = inlineOpts;
    } else {
      currentQ = { text: questionText, answer: null };
      currentOptions = [];
    }
  } else if (currentQ) {
    if (isAnswerLine(line)) {
      currentQ.answer = isTf ? parseTfAnswer(line) : parseMcAnswer(line);
    } else if (!isTf && isOptionLine(line)) {
      currentOptions.push(extractOptionText(line));
    } else if (!isTf && currentOptions.length === 0 && !isQuestionStart(line)) {
      // Possibly continued question text
      if (line.length < 200 && !isAnswerLine(line)) {
        currentQ.text += line;
      }
    }
  }
}

// Save the last question
saveCurrentQuestion();

// ─── Generate TypeScript output ───────────────────────────────────────────────

if (questions.length === 0) {
  console.error('Warning: No questions were parsed. Check the input file format.');
  process.exit(1);
}

console.error(`Parsed ${questions.length} questions from ${inputPath}`);

const tsLines = questions.map((q) => {
  const optsStr = q.options.map((o) => `    '${o.replace(/'/g, "\\'")}',`).join('\n');
  return `  {
    id: '${q.id}',
    category: '${q.category}',
    question: '${q.question.replace(/'/g, "\\'")}',
    options: [\n${optsStr}\n    ],
    correct: ${q.correct},
    explanation: '',
  },`;
});

const output = `// Auto-generated by parse-exam-questions.mjs
// Source: ${inputPath}
// Questions: ${questions.length}
// Category: ${category}
// Run date: ${new Date().toISOString()}

import type { ExamQuestion } from '../types/exam';

export const EXTRA_EXAM_QUESTIONS: ExamQuestion[] = [
${tsLines.join('\n')}
];
`;

if (outputPath) {
  const outPath = resolve(process.cwd(), outputPath);
  await writeFile(outPath, output, 'utf8');
  console.error(`Written to ${outPath}`);
} else {
  process.stdout.write(output);
}
