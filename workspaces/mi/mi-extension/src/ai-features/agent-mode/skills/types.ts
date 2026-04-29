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

/**
 * A skill is a named bundle of follow-up instructions that the agent loads on
 * demand via the `invoke_skill` tool. Mirrors the Claude Code skills pattern:
 * every turn the agent sees a short catalog (name + description) of available
 * skills in the user prompt; calling `invoke_skill` with a name returns the
 * full body, which the agent then follows as authoritative instructions for
 * the rest of the turn.
 *
 * Names use a `<plugin>:<sub-skill>` convention (e.g.
 * `agents-md-management:init`) so multiple plugins can coexist without name
 * collisions, matching Claude Code's namespacing.
 */
export interface Skill {
    /** Fully-qualified skill id, e.g. "agents-md-management:init". */
    name: string;
    /** One-line catalog blurb. Shown verbatim in the user-prompt skills block. */
    description: string;
    /**
     * Full instruction body returned by `invoke_skill`. Treat as a self-
     * contained playbook the agent should follow step-by-step once invoked.
     * Markdown-formatted; should reference tools by their canonical names.
     */
    body: string;
}
