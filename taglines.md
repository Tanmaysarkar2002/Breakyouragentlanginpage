# Tagline candidates

Voice rules these follow (BRAND.md): dry, confident, developer-to-developer, short
sentences, show the evidence, **never fear-monger**. No emoji. Lowercase `breakyouragent`
and `bya` always — the wordmark is mono and never capitalised.

> The final tagline is an open decision and needs a trademark search before it ships
> (CLAUDE.md §9). Nothing here is decided. The current primary is
> **"Crash-test your AI agent."**

## Hero headline

Short enough to hold at 88px on one or two lines.

| # | Tagline | Why it works |
| --- | --- | --- |
| H1 | **Crash-test your AI agent.** | Current primary. The whole concept in four words, imperative, no jargon. Hard to beat. |
| H2 | ~~**`bya run` before they do.**~~ | **Blocked 2026-09-22: there is no CLI.** The POC had one; the rewrite dropped it and `pyproject.toml` ships no console script. Do not use this, or any `bya <command>` copy, until a CLI actually exists. |
| H3 | **Every agent breaks. Find out how.** | States a fact, then offers information. Reads as confidence, not threat. |
| H4 | **Break it on purpose.** | The crash-test idea compressed to three words. Works on a sticker. |
| H5 | **Your agent has bugs you haven't prompted yet.** | Existing alternate. The sharpest line in the set, but long for a hero. |
| H6 | **Attack your own agent first.** | Frames it as the responsible move. Pairs well with the ownership rule. |
| H7 | **Ship agents that hold.** | Positive framing, outcome not threat. Quieter than the rest. |

## Eyebrow / pill (above the headline)

- The crash-test lab for AI agents  *(current, and the decided brand concept)*
- Red-team your agent in 60 seconds
- One URL in. A crash report out.  *(currently a section heading)*

## Final CTA

- **Find the failure point in the lab, not in production.**  *(current)*
- ~~Break it before it breaks in production.~~  *(retired 2026-09-22: same rhetorical frame as the competitor headline, see below)*
- See exactly where it breaks.
- Get your score.

## Badge and README

- `resilience | 87/100`  *(decided badge format; the site uses 68 as its illustrative value)*
  **No badge endpoint exists yet**, so do not write copy that tells people to embed it in a README.
- crash-tested with bya
- `bya`-tested: 68/100

## Social / OG description

- Paste your agent's endpoint. Get a resilience score and the transcript behind every failure.
- Self-serve red-teaming for AI agents. OWASP-mapped. Free tier at launch.  *(current)*

## Off limits: the competitor collision  [added 2026-09-22]

`enokilabs.ai` sells the same thing to the same buyer. Their H1 is **"Break your agent before
attackers do."** Short phrases are not copyrightable, so this is not a copyright question. It is a
trademark and confusion question, and it is live because our brand name *is* "break your agent".

Rules that follow from it:

- **Never use the frame "Break X before Y."** That is their headline's shape. The old closing CTA
  "Break it before it breaks in production." was replaced with **"Find the failure point in the lab,
  not in production."** on this basis.
- Their step names are Connect / Attack / Find / Verify. Ours are **Aim / Impact / Teardown** and
  should stay in the crash-test register rather than drifting back to generic security verbs.
- Lean on the crash-test lab metaphor, which is ours and which they do not use: the calibration
  roundel, impact point, sled, teardown, failure point, the lab.

**Open, and the owner's call, not a writer's:** whether `breakyouragent` can ship as the brand at
all given their headline. That needs a real trademark search (CLAUDE.md §9 already flags it) and
probably a lawyer, before any money goes into the name.

## Rejected on purpose

These break the voice rules, kept here so nobody re-proposes them:

- "Is your agent safe?" — fear-mongering, and the honest answer is never yes.
- "Hackers are already testing your agent." — unverifiable claim, pure fear.
- "Enterprise-grade AI security." — vendor noise, and we are not enterprise.
- Anything calling the project "open source" — §9 has not chosen a licence, so no such grant exists.
- "Unbreakable agents." — we cannot promise that; §7 of the terms says the opposite.
