// main.ts — entrypoint for "Your Week in One Line" (make.fun).
//
// The program picks the sharpest of a few hand-written one-liners about
// this builder's own week, checks it against the sealed gate (UTF-8 text,
// 1-100 characters, not only whitespace), writes it to /output/entry.txt,
// and reads the file back to confirm the bytes on disk are the pick.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader's sandbox it writes to /output/entry.txt directly.
// Requires Node 22.18+ (the grader runs Node 22.23.4). No dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Draft = {
  text: string;
  // What the line is doing, in the judge's own order: own week, joke,
  // concrete detail, economy, freshness. Kept beside the text so the
  // scorer's reasoning is auditable instead of a magic number.
  notes: string;
};

const DRAFTS: Draft[] = [
  {
    text: "Taught 33 lessons, shipped 44 bounty entries, and my GPU still owes me a finished video.",
    notes: "own week with two counted facts; the GPU owing a video is the turn",
  },
  {
    text: "My GPU rendered 1,860 frames then quit; my week in one line: the video is still not a video.",
    notes: "own week with one counted fact; the punchline repeats the word video",
  },
  {
    text: "Graded homework, hunted bounties, fed a WhatsApp bot — and Friday still arrived exhausted.",
    notes: "own week with three concrete jobs; the twist hands Friday the tiredness",
  },
  {
    text: "Thirty-three lessons, forty-four entries, zero finished videos: my GPU invoices me in frames.",
    notes: "own week with three counted facts; invoices-in-frames is the turn",
  },
];

// Judge's criteria, most important first, as small checkable signals.
function score(draft: Draft): number {
  const text = draft.text;
  let points = 0;
  // 1. Sums up the entrant's own week: first-person work verbs + a week span.
  if (/\b(taught|shipped|graded|hunted|fed|rendered)\b/i.test(text)) points += 30;
  // 2. Lands a joke or sharp turn: a debt, a quit, a swap of who is tired.
  if (/\b(owes|quit|invoices|still arrived|still not)\b/i.test(text)) points += 25;
  // 3. One concrete detail only this week could have: a counted number.
  const numbers = text.match(/\d[\d,]*/g) ?? [];
  points += Math.min(numbers.length, 2) * 10;
  // 4. Spends every word well: inside the gate with room to spare, no padding.
  if (text.length >= 70 && text.length <= 100) points += 15;
  if (/\b(very|really|just|quite)\b/i.test(text)) points -= 10;
  // 5. Fresh, not a saying or template: no proverb-shaped phrasing.
  if (/^(monday|another week|what a week|time flies)/i.test(text)) points -= 15;
  return points;
}

function pickBest(): Draft {
  let best = DRAFTS[0];
  let bestScore = score(best);
  for (const draft of DRAFTS.slice(1)) {
    const s = score(draft);
    // On a tie the shorter line wins: the judge's own tie-break prefers
    // the smaller text, so the program should too.
    if (s > bestScore || (s === bestScore && draft.text.length < best.text.length)) {
      best = draft;
      bestScore = s;
    }
  }
  console.log(`scores: ${DRAFTS.map((d) => `${score(d)}`).join(", ")} — picked ${bestScore}`);
  return best;
}

function main(): void {
  const winner = pickBest();
  const line = winner.text;
  // The sealed gate: 1-100 characters, not only whitespace.
  if (line.length < 1 || line.length > 100 || line.trim().length === 0) {
    throw new Error(`picked line fails the gate at ${line.length} characters: ${line}`);
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, line, "utf8");
  // Read back: refuse to report success unless disk matches the pick.
  const back = readFileSync(target, "utf8");
  if (back !== line) {
    throw new Error(`entry.txt on disk does not match the pick (${back.length} chars read back)`);
  }
  console.log(`wrote ${line.length} chars to ${target}: ${line}`);
}

main();
