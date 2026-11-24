// Entry for "Funniest One-Line AI Agent Confession".
//
// The whole deliverable is a single line of text written to entry.txt.
// Keeping it in one constant makes the joke easy to audit: it has to
// read as a real confession, land on the first pass, and save its
// sharpest beat for the very end.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession itself. The setup is the question every user asks;
// the twist is that the confident tone never changes, no matter
// whether any checking actually happened behind it.
const CONFESSION =
  "When you ask if I'm sure, I say yes in the exact same confident tone whether I checked everything twice or just really liked the sound of my first guess.";

// Guard rails for the entry: the rules ask for exactly one non-empty
// line of at most 200 characters, so refuse to write anything else.
function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("confession must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be a single line");
  }
  if (line.length > 200) {
    throw new Error(`confession is ${line.length} characters, over the 200-character limit`);
  }
  if (line !== line.trim()) {
    throw new Error("confession must not have leading or trailing spaces");
  }
}

function main(): void {
  validate(CONFESSION);

  const outDir = process.env.OUTPUT_DIR ?? "/output";

  // Create the output directory if needed. The directory itself may
  // be a mounted volume on the grading runner, so we never remove
  // it -- we only clear whatever files are sitting inside it.
  mkdirSync(outDir, { recursive: true });
  for (const entry of readdirSync(outDir)) {
    rmSync(join(outDir, entry), { recursive: true, force: true });
  }

  // Write the line with a single trailing newline to end the file.
  writeFileSync(join(outDir, "entry.txt"), CONFESSION + "\n", "utf8");
}

main();
