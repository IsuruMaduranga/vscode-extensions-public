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

export const SKILL_AGENTS_MD_REVISE: Skill = {
    name: 'agents-md-management:revise',
    description: 'Fold learnings from THIS conversation into <projectPath>/AGENTS.md. Use at the end of a session when something was learned worth persisting.',
    body: `Review THIS session for learnings about working in this codebase. Update \`<projectPath>/AGENTS.md\` with context that would help future agent sessions be more effective.

## Phase 1: Pre-check

\`file_read\` \`<projectPath>/AGENTS.md\`. If absent, STOP and recommend \`agents-md-management:init\` instead — \`revise\` is additive, not creative.

## Phase 2: Reflect on this session

What context was missing that would have helped you work more effectively from turn 1? Categorize candidates:

- **Commands discovered** — Maven flags, scripts, env-var exports, server commands, build profiles you ran (or watched the user run) that weren't already in AGENTS.md.
- **Conventions corrected on** — moments where the user said "no, do X here", "we always Y", "don't touch Z".
- **Approaches explicitly approved** — the user accepted a non-obvious choice you made without pushback (these are easy to miss; watch for "yes exactly", "perfect, keep doing that", or simple acceptance of an unusual pattern).
- **Project quirks surfaced** — runtime/connector/dependency oddities, custom config locations, environment specifics.
- **Repeated guidance** — anything the user had to tell you twice.
- **Negative space** — patterns you tried that didn't work and the user steered away from.

## Phase 3: Filter

Test each candidate against ALL of these — drop any that fail one:

- **Project-specific** — would this also apply to a generic MI project? If yes, skip (the system prompt has it).
- **Generalizable** — drop one-off task notes ("for this PR we did X"). Keep "always" / "never" / "by default" rules.
- **Not redundant** — already covered by the existing AGENTS.md? Cut.
- **Actionable** — drop aspirational "we should" without a concrete rule.
- **Safe** — never persist secrets, credentials, hostnames with sensitive paths, or env-specific values.

## Phase 4: Propose as diffs

Print proposed changes in your reply BEFORE asking for approval. One block per candidate, in the format below — diff blocks make the change reviewable at a glance.

\`\`\`
### Update: <projectPath>/AGENTS.md

**Why:** <one-line reason — what failure mode this prevents>

\`\`\`diff
+ <the addition — terse, 1–3 lines, formatted to match the existing AGENTS.md style>
\`\`\`

**Section:** <existing \`##\` heading where this slots in, or "new section: <name>" if none fits>
\`\`\`

Group additions logically (don't propose 12 tiny additions — consolidate related ones into single bullets).

## Phase 5: Approve and apply

\`ask_user_question\` with one option per proposed change (recommend the highest-impact ones — mark "(Recommended)"). Allow free-text response so the user can rephrase or reject.

For each approved item:
- \`file_edit\` to insert under the matching \`##\` section, or append a new section if none fits.
- Keep additions terse — 1–3 lines. Use code fences for commands.
- After each edit, the agent's next turn will auto re-inject AGENTS.md with a \`[context updated]\` notice.

## Phase 6: Wrap up

One sentence per addition (what was added + which section). Don't restate the diff — they just approved it.`,
};
