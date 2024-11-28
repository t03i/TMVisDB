// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import axios from "axios";

import {
  PUBLIC_API_URL,
  PUBLIC_GITHUB_REPO,
  PUBLIC_MAINTENANCE_MODE,
  PUBLIC_MAX_PROTEIN_LENGTH,
  PUBLIC_MIN_PROTEIN_LENGTH,
  PUBLIC_PROJECT_NAME,
  PUBLIC_SENTRY_DSN_FRONTEND,
  PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
} from "$env/static/public";

import { GitHubLinks } from "./github";

interface Config {
  MAX_PROTEIN_LENGTH: number;
  MIN_PROTEIN_LENGTH: number;
  GITHUB_LINKS: GitHubLinks;
  API_BASE_URL: string;
  APP_NAME: string;
  MAINTENANCE_MODE: boolean;
  SENTRY_DSN: string;
  SENTRY_SAMPLE_RATE: number;
  ENVIRONMENT: string;
  VERSION: string;
  PROTEIN_PAGE_SIZE: number;
}

const config: Config = {
  MAX_PROTEIN_LENGTH: Number.parseInt(PUBLIC_MAX_PROTEIN_LENGTH || "5500", 10),
  MIN_PROTEIN_LENGTH: Number.parseInt(PUBLIC_MIN_PROTEIN_LENGTH || "16", 10),
  GITHUB_LINKS: new GitHubLinks(
    PUBLIC_GITHUB_REPO || { owner: "t03i", name: "TMvisDB" },
  ),
  API_BASE_URL: PUBLIC_API_URL || "http://localhost:8000",
  APP_NAME: PUBLIC_PROJECT_NAME || "TMVisDB",
  MAINTENANCE_MODE: PUBLIC_MAINTENANCE_MODE.toLowerCase() === "true" || false,
  SENTRY_DSN: PUBLIC_SENTRY_DSN_FRONTEND || "",
  SENTRY_SAMPLE_RATE: Number.parseFloat(
    PUBLIC_SENTRY_TRACES_SAMPLE_RATE || "0.1",
  ),
  ENVIRONMENT: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE,
  VERSION: import.meta.env.__VERSION__ || "dev",
  PROTEIN_PAGE_SIZE: 50,
};
axios.defaults.baseURL = config.API_BASE_URL;
// TODO: fix this for server side rendering

Object.freeze(config);
export default config;
export type { Config };
