# public/

Drop the wagyu clip here as **`steak.mp4`** (the 8s A5 wagyu pull-back).

`app/page.tsx` references it as `/steak.mp4`. The four chapter ranges in
`ScrollVideoSection` are timed to that clip's camera move:

| Progress   | Chapter        | Video moment                    |
| ---------- | -------------- | ------------------------------- |
| 0.00–0.25  | 01 · THE CUT   | close on sauce / marbling       |
| 0.25–0.50  | 02 · THE AGE   | mid pull-back                   |
| 0.50–0.75  | 03 · THE SEAR  | plate resolving                 |
| 0.75–1.00  | 04 · THE TABLE | full plate, chopsticks in frame |

If `steak.mp4` is absent, the section falls back to an ember gradient so the
chapter timing and progress bar still read during development.
