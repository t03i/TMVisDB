// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import config from "$lib/config";
import * as Sentry from "@sentry/svelte";

Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.ENVIRONMENT,
    release: `v${config.VERSION}`,
    enabled: config.ENVIRONMENT !== 'development',
    integrations: [
        Sentry.breadcrumbsIntegration({
        console: false,
        dom: false,
        fetch: true,
        history: true,
        xhr: false,
      }),
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: config.SENTRY_SAMPLE_RATE,
    tracePropagationTargets: [/^localhost$/, new RegExp(config.API_BASE_URL)],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

export function handleError({ error, event }) {
  // Only report errors to Sentry if they're not already handled
  if (error && !('handled' in error)) {
    Sentry.captureException(error, {
      contexts: {
        sveltekit: { event }
      }
    });
  }

  return {
    message: error?.message ?? 'An unexpected error occurred',
  };
}
