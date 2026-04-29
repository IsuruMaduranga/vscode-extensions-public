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

import { Skill } from './types';
import { AGENTS_MD_MANAGEMENT_SKILLS } from './agents-md-management';

export type { Skill } from './types';

/**
 * Flat registry of every skill known at build time. Order is plugin-major,
 * sub-skill-minor (matches the catalog rendering). Adding a new plugin =
 * append its skills array here.
 */
export const ALL_SKILLS: Skill[] = [
    ...AGENTS_MD_MANAGEMENT_SKILLS,
];

/**
 * Lookup by fully-qualified name (e.g. `"agents-md-management:init"`).
 * Returns `undefined` when the name is unknown — `invoke_skill` surfaces a
 * helpful error including the available names.
 */
export function getSkill(name: string): Skill | undefined {
    return ALL_SKILLS.find(s => s.name === name);
}

export function getAllSkillNames(): string[] {
    return ALL_SKILLS.map(s => s.name);
}

/**
 * Render the skills catalog as plain text for injection into the user
 * prompt. Format mirrors Claude Code's session-start skills reminder so the
 * agent recognizes the convention. Empty when no skills are registered (the
 * caller should then omit the entire block).
 */
export function getSkillsCatalogText(): string {
    if (ALL_SKILLS.length === 0) {
        return '';
    }
    return ALL_SKILLS.map(s => `- ${s.name}: ${s.description}`).join('\n');
}
