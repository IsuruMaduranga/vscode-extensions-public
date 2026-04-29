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
import { SKILL_AGENTS_MD_INIT } from './init';
import { SKILL_AGENTS_MD_REVISE } from './revise';
import { SKILL_AGENTS_MD_IMPROVE } from './improve';

/**
 * Sub-skills under the `agents-md-management` plugin. Order matters — it
 * controls how skills appear in the catalog block, so users see the
 * lifecycle order (init → revise → improve).
 */
export const AGENTS_MD_MANAGEMENT_SKILLS: Skill[] = [
    SKILL_AGENTS_MD_INIT,
    SKILL_AGENTS_MD_REVISE,
    SKILL_AGENTS_MD_IMPROVE,
];
