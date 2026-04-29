/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com/) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Skill } from '../types';

export const SKILL_AGENTS_MD_IMPROVE: Skill = {
    name: 'agents-md-management:improve',
    description: 'Audit <projectPath>/AGENTS.md against quality criteria (terseness, project-specificity, actionability) and propose targeted edits.',
    body: `Audit, evaluate, and improve \`<projectPath>/AGENTS.md\`. Output a quality report FIRST, then propose targeted edits, then apply approved ones.

**This skill writes to AGENTS.md.** After the report and explicit approval, apply the changes via \`file_edit\`.

## Phase 1: Pre-check

\`file_read\` \`<projectPath>/AGENTS.md\`. If absent, STOP and recommend \`agents-md-management:init\` — \`improve\` audits an existing file, it doesn't bootstrap one.

If the file is over 100KB, flag it immediately: the agent loader truncates beyond that, so cuts must take priority. Note this in the report header.

## Phase 2: Quality assessment

Score each criterion (point weights below). For each criterion, also list the specific lines/sections that drove the score down — those become Phase 4 edit candidates.

| Criterion | Weight | What to check |
|---|---|---|
| **Project-specific** | 20 | Would this apply to ANY MI project? If yes, it's dead weight — the system prompt already covers it. |
| **Concise** | 20 | 1–3 lines per topic. Long paragraphs and prose explanations are candidates for compression. |
| **Actionable** | 15 | Each instruction = something the agent can apply now. Cut "we should" / "ideally" / "consider" without a concrete rule. |
| **Current** | 15 | Verify referenced files / scripts / paths still exist. Use \`glob\` / \`file_read\` to spot-check. Flag broken references. |
| **Non-conflicting** | 15 | Internal contradictions, or rules that override system prompt safety / mode constraints. |
| **Coverage** | 15 | Does it actually capture what's surprising about THIS project? Note gaps for the user (a candidate \`revise\` follow-up). |

**Quality bands:**
- A (90–100): comprehensive, terse, current
- B (70–89): good, minor cleanup
- C (50–69): bones are right but bloated, stale, or missing key context
- D (30–49): sparse or significantly outdated
- F (0–29): mostly dead weight; consider rewriting from scratch with \`init\`

## Phase 3: Quality report (output BEFORE making any edits)

Print the full report directly in your reply — no file writes yet. Format:

\`\`\`markdown
## AGENTS.md Quality Report

**File:** <projectPath>/AGENTS.md (X lines, Y bytes)
**Score:** XX/100 (Grade: X)

### Criterion breakdown
| Criterion | Score | Notes |
|---|---|---|
| Project-specific | X/20 | ... |
| Concise | X/20 | ... |
| Actionable | X/15 | ... |
| Current | X/15 | ... |
| Non-conflicting | X/15 | ... |
| Coverage | X/15 | ... |

### Issues
- [specific problems with quoted line excerpts]

### Coverage gaps (suggest \`revise\` later)
- [things the file should probably mention but doesn't]
\`\`\`

## Phase 4: Propose targeted edits

Group findings into four buckets and show each as a diff:

- **Cut** — low-value, redundant, stale, or generic
- **Tighten** — verbose → terse rewrite proposed
- **Fix** — factual error, broken file/script reference
- **Flag** — internal contradiction or safety conflict (these usually need user judgment, not a clean edit)

For each edit, print:

\`\`\`
### Update: <projectPath>/AGENTS.md  ·  <Cut | Tighten | Fix | Flag>

**Why:** <one-line reason>

\`\`\`diff
- <line(s) being removed>
+ <line(s) being added (omit for pure cuts)>
\`\`\`
\`\`\`

## Phase 5: Approve

\`ask_user_question\` with one option per proposed edit (highest-impact first, "(Recommended)" tag). Allow free-text response so the user can request rewordings or batch-reject.

If there are many edits (>6), batch them: ask first about Cuts (cheap, easy yes), then Tighten, then Fix, then Flag.

## Phase 6: Apply + re-validate

For each approved edit:
- \`file_edit\` to apply.
- After all edits, \`file_read\` AGENTS.md and confirm the structure is intact (headings still well-grouped, no orphaned bullets, no broken markdown).

## Phase 7: Wrap up

One short paragraph:
- What was changed (count by bucket: "Cut 3, Tightened 2, Fixed 1, Flagged 1 for your review").
- What was kept (anything notable the user kept despite a recommendation).
- New score estimate after edits.
- If coverage gaps were noted in Phase 3, suggest running \`agents-md-management:revise\` after the next working session to fill them.

## Common issues to specifically call out

- Generic MI / Synapse / Maven / Java advice the system prompt already covers ("validate XML before deploying", "use connectors", "build with Maven")
- Stale connector or runtime version references (verify against \`pom.xml\`)
- Broken paths under \`src/main/wso2mi/artifacts/\` (verify with \`glob\`)
- "TODO" items or "to be filled" placeholders never completed
- Verbose paragraphs that should be one-liners
- Same point made in two \`##\` sections — consolidate
- Anything that would override system prompt safety / mode rules — never silently approve, always ask`,
};
