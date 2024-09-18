// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0


interface Config {
    MAX_PROTEIN_LENGTH: number;
    MIN_PROTEIN_LENGTH: number;
    GITHUB_URL: string;
    API_BASE_URL: string;
    APP_NAME: string;
}

const config: Config = {
    MAX_PROTEIN_LENGTH: Number.parseInt(import.meta.env.VITE_MAX_PROTEIN_LENGTH || '5500', 10),
    MIN_PROTEIN_LENGTH: Number.parseInt(import.meta.env.VITE_MIN_PROTEIN_LENGTH || '16', 10),
    GITHUB_URL: `https://github.com/${import.meta.env.VITE_GITHUB_REPO}` || 'https://github.com/rostlab/tmvisdb',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    APP_NAME: import.meta.env.VITE_APP_NAME || 'TMVisDB',
};

export default config;
