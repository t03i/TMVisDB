// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import axios from 'axios';

import { PUBLIC_API_URL, PUBLIC_PROJECT_NAME, PUBLIC_GITHUB_REPO,PUBLIC_MIN_PROTEIN_LENGTH, PUBLIC_MAX_PROTEIN_LENGTH  } from '$env/static/public';

interface Config {
    MAX_PROTEIN_LENGTH: number;
    MIN_PROTEIN_LENGTH: number;
    GITHUB_URL: string;
    API_BASE_URL: string;
    APP_NAME: string;
}

const config: Config = {
    MAX_PROTEIN_LENGTH: Number.parseInt(PUBLIC_MAX_PROTEIN_LENGTH || '5500', 10),
    MIN_PROTEIN_LENGTH: Number.parseInt(PUBLIC_MIN_PROTEIN_LENGTH || '16', 10),
    GITHUB_URL: `https://github.com/${PUBLIC_GITHUB_REPO}` || 'https://github.com/rostlab/tmvisdb',
    API_BASE_URL: PUBLIC_API_URL || 'http://localhost:8000',
    APP_NAME: PUBLIC_PROJECT_NAME || 'TMVisDB',
};
axios.defaults.baseURL = config.API_BASE_URL;

export default config;
