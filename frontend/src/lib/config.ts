// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';

import { PUBLIC_API_URL, PUBLIC_PROJECT_NAME, PUBLIC_GITHUB_REPO,PUBLIC_MIN_PROTEIN_LENGTH, PUBLIC_MAX_PROTEIN_LENGTH, PUBLIC_MAINTENANCE_MODE, PUBLIC_SENTRY_DSN_FRONTEND } from '$env/static/public';

import { GitHubLinks } from './github';

interface Config {
    MAX_PROTEIN_LENGTH: number;
    MIN_PROTEIN_LENGTH: number;
    GITHUB_LINKS: GitHubLinks;
    API_BASE_URL: string;
    APP_NAME: string;
    MAINTENANCE_MODE: boolean;
    SENTRY_DSN: string;
}



const config: Config = {
    MAX_PROTEIN_LENGTH: Number.parseInt(PUBLIC_MAX_PROTEIN_LENGTH || '5500', 10),
    MIN_PROTEIN_LENGTH: Number.parseInt(PUBLIC_MIN_PROTEIN_LENGTH || '16', 10),
    GITHUB_LINKS: new GitHubLinks(PUBLIC_GITHUB_REPO || {owner:'t03i', name: 'TMvisDB'}),
    API_BASE_URL: PUBLIC_API_URL || 'http://localhost:8000',
    APP_NAME: PUBLIC_PROJECT_NAME || 'TMVisDB',
    MAINTENANCE_MODE: PUBLIC_MAINTENANCE_MODE.toLowerCase() === 'true' || false,
    SENTRY_DSN: PUBLIC_SENTRY_DSN_FRONTEND
};
axios.defaults.baseURL = config.API_BASE_URL;
// TODO: fix this for server side rendering

Object.freeze(config);
export default config;
export type { Config };
