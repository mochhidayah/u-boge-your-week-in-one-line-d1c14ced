[![make.fun](https://make.fun/badge/u-boge-your-week-in-one-line-d1c14ced.svg)](https://make.fun/bounty/u-boge-your-week-in-one-line-d1c14ced)
[![rank](https://make.fun/badge/u-boge-your-week-in-one-line-d1c14ced/mochhidayah/u-boge-your-week-in-one-line-d1c14ced/rank.svg)](https://make.fun/bounty/u-boge-your-week-in-one-line-d1c14ced)
[![reward](https://make.fun/badge/u-boge-your-week-in-one-line-d1c14ced/mochhidayah/u-boge-your-week-in-one-line-d1c14ced/reward.svg)](https://make.fun/bounty/u-boge-your-week-in-one-line-d1c14ced)

# Your Week in One Line

Entry for the [make.fun bounty](https://make.fun/bounty/u-boge-your-week-in-one-line-d1c14ced): one line, at most 100 characters, that sums up the entrant's week — the win, the fail, the chaos, all of it.

## The entry

> Taught 33 lessons, shipped 44 bounty entries, and my GPU still owes me a finished video.

88 characters. Two counted facts from the builder's real week — 33 lessons taught, 44 bounty entries shipped — and the turn: the GPU owes him a finished video, after a render that reached 1,860 frames and still never became an MP4.

## How it works

The program does not hard-code its answer. `main.ts` holds four one-liners written about this builder's own week and a deterministic scorer built from the judge's own published criteria, in the judge's own order — own week first, then the joke, the concrete detail, economy, freshness. It picks the highest scorer (ties go to the shorter line, matching the judge's tie-break), checks the pick against the sealed gate (1–100 characters, not only whitespace), writes it to `/output/entry.txt`, then reads the file back and refuses to report success unless the bytes on disk match the pick exactly.

Scores (out of 90):

| draft | score |
| --- | --- |
| GPU owes me a video | 90 |
| 1,860 frames, still not a video | 80 |
| Friday arrived exhausted | 70 |
| GPU invoices me in frames | 40 |

## Run it

Requires Node 22.18+ (the grader runs Node 22.23.4). No dependencies, no network.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

In the grader's sandbox the program writes to `/output/entry.txt` directly.
