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

import { tool } from 'ai';
import { z } from 'zod';
import { ToolResult } from './types';
import { getSkill, getAllSkillNames } from '../skills';
import { logDebug } from '../../copilot/logger';

export type InvokeSkillExecuteFn = (args: { skill_name: string }) => Promise<ToolResult>;

export function createInvokeSkillExecute(): InvokeSkillExecuteFn {
    return async ({ skill_name }) => {
        const trimmed = skill_name?.trim();
        if (!trimmed) {
            return {
                success: false,
                message: `Missing skill_name. Provide a fully-qualified skill id (e.g. "agents-md-management:init"). Available: ${getAllSkillNames().join(', ')}`,
                error: 'Error: Missing skill_name',
            };
        }
        const skill = getSkill(trimmed);
        if (!skill) {
            return {
                success: false,
                message: `Unknown skill "${trimmed}". Available skills: ${getAllSkillNames().join(', ')}`,
                error: 'Error: Unknown skill',
            };
        }
        logDebug(`[SkillTool] Loaded skill: ${skill.name}`);
        // Wrap the body in <SKILL_INSTRUCTIONS> tags so the agent treats it
        // as authoritative follow-up instructions (same convention as
        // <CONTEXT_REFERENCE> in load_context_reference).
        return {
            success: true,
            message: [
                `Loaded skill '${skill.name}'.`,
                `Description: ${skill.description}`,
                '',
                '<SKILL_INSTRUCTIONS>',
                skill.body,
                '</SKILL_INSTRUCTIONS>',
            ].join('\n'),
        };
    };
}

const invokeSkillInputSchema = z.object({
    skill_name: z.string().describe('Fully-qualified skill id from the "Available skills" catalog (e.g. "agents-md-management:init").'),
});

export function createInvokeSkillTool(execute: InvokeSkillExecuteFn) {
    return (tool as any)({
        description: `Loads a named skill on demand. Returns a self-contained instruction body wrapped in <SKILL_INSTRUCTIONS> that you must follow as authoritative guidance for the rest of the turn. Use the exact skill name from the "Available skills" catalog injected in the user prompt.`,
        inputSchema: invokeSkillInputSchema,
        execute,
    });
}
