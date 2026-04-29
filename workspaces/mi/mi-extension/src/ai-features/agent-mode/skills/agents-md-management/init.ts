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

export const SKILL_AGENTS_MD_INIT: Skill = {
    name: 'agents-md-management:init',
    description: 'Create a new <projectPath>/AGENTS.md interactively. Use when the user asks to set up project-level agent instructions for the first time.',
    body: `Set up a minimal AGENTS.md at \`<projectPath>/AGENTS.md\`. AGENTS.md is loaded into every agent turn, so it must be concise — only include what the agent would get wrong without it.

## Phase 0: Pre-check

\`file_read\` \`<projectPath>/AGENTS.md\`. If it already exists, STOP and recommend \`agents-md-management:improve\` (or \`:revise\` for additive updates). Do not silently overwrite.

## Phase 1: Lightweight discovery (3–5 tool calls max)

The goal is to gather signal for Phase 3 prompts and pre-populate sections — not to summarize the codebase.

- \`file_read\` \`pom.xml\` — capture MI runtime version + any non-default plugins/profiles.
- \`glob\` \`src/main/wso2mi/artifacts/**\` — note which artifact types this project uses.
- \`file_read\` \`README.md\` if present — pull build/run instructions, project name/purpose, anything that looks project-specific.
- Look for inherited agent-instruction files and merge important parts: \`.cursor/rules/**\`, \`.cursorrules\`, \`.github/copilot-instructions.md\`, \`.windsurfrules\`, \`.clinerules\`. Don't dump them — extract one-liners.

Skip deep code reading. AGENTS.md captures user intent, not code summary.

## Phase 2: Ask the user what to capture

Use \`ask_user_question\` with multi-select. Offer these option labels (recommend 2 to start, "(Recommended)" tag on the strongest two given Phase 1 findings):

- **Build / run commands** — Maven profiles, custom scripts, deployment shortcuts, server start/stop quirks.
- **Project conventions** — folder layout, naming rules, artifact patterns specific to this codebase.
- **Environment quirks** — local server path, JDK version, proxies, env-var-driven config.
- **In-house terminology** — domain vocabulary the agent would otherwise misinterpret.
- **Things to avoid** — deprecated patterns, off-limits files, legacy folders.
- **Let me decide** — agent picks based on Phase 1 findings.

## Phase 3: Draft AGENTS.md

**Hard rules — apply on every line:**
- Terse: 1–3 lines per topic, bullet form. Use code blocks for commands.
- **Project-specific only**: skip anything generic to MI / Synapse / Java / Maven. The agent already has all of that in its system prompt and \`load_context_reference\`.
- **Skip the discoverable**: don't restate what \`pom.xml\` or a directory listing already says (artifact types present, dependency versions, file paths).
- **Skip generic dev practices**: no "write tests", "use error handling", "no secrets in code". The agent already operates that way.
- **Actionable**: every line is something the agent can apply now. Cut "we should", "consider", "ideally" unless paired with a concrete rule.
- **No invented sections**: don't add "Common Tasks", "Tips", "Support" unless backed by something you read in Phase 1.

**Preamble** — start the file with this exact prefix:
\`\`\`
# AGENTS.md
Project-level instructions for the WSO2 MI Copilot agent. Auto-loaded into every agent turn — keep concise.
\`\`\`

**Section headings** — use \`##\` for groups (e.g. \`## Build & Run\`, \`## Conventions\`, \`## Environment\`, \`## Avoid\`). Only include sections the user picked or Phase 1 surfaced.

## Phase 4: Show the draft, get approval, write

1. Print the full draft in your reply, inside a \`\`\`markdown fenced block so the user can review.
2. \`ask_user_question\`: "Save this AGENTS.md?" with options "Save" (Recommended) | "Edit first" | "Cancel". Allow free-text response so the user can request specific tweaks.
3. On Save, \`file_write\` to \`<projectPath>/AGENTS.md\`. On "Edit first", apply their requested changes and re-confirm.

## Phase 5: Wrap up

One short paragraph:
- File saved at \`<projectPath>/AGENTS.md\` and auto-loaded into the next agent turn (re-injected on edit).
- They can edit it directly anytime; no restart needed.
- \`agents-md-management:revise\` to fold session learnings later, \`:improve\` for full audit.`,
};
