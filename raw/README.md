# Raw Question Bank Files

Place official Word (.docx) files here before running the parse script.

## Download Source

2025 official question bank from Ministry of Transportation:
https://www.thb.gov.tw/cl.aspx?n=12

## Files to Download

| Filename (rename to)  | Category flag   |
| --------------------- | --------------- |
| `汽車法規是非題.docx` | `regulation-tf` |
| `汽車法規選擇題.docx` | `regulation-mc` |
| `汽車標誌是非題.docx` | `sign-tf`       |
| `汽車標誌選擇題.docx` | `sign-mc`       |
| `機械常識.docx`       | `mechanical`    |

## Parse Command

```bash
npm install mammoth --save-dev

node scripts/parse-exam-questions.mjs \
  --input ./raw/汽車法規是非題.docx \
  --category regulation-tf \
  --start-id 1001 \
  --output ./src/data/exam-questions-regulation-tf.ts
```

Then import the generated array and spread it into `EXAM_QUESTIONS` in `src/data/exam-questions.ts`.
