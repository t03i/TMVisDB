// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import config from '$lib/config'; // Import to ensure axios base URL is set

import * as Sentry from "@sentry/sveltekit";


Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.ENVIRONMENT,
    enabled: config.ENVIRONMENT !== 'development',
    release: `v${config.VERSION}`,
    tracesSampleRate: config.SENTRY_SAMPLE_RATE,
    tracePropagationTargets: ["localhost", new RegExp(config.API_BASE_URL)],

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

export const handleError = Sentry.handleErrorWithSentry();
export const handle = Sentry.sentryHandle();
