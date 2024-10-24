<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import config from "$lib/config";
  import { DiscussionCategory } from "$lib/github";
</script>

<svelte:head>
  <title>{config.APP_NAME} Maintenance 🚧</title>
</svelte:head>

<div class="fixed inset-0 z-50 flex items-center justify-center">
  <div class="variant-glass-surface max-w-2xl space-y-6 p-8">
    <div class="card flex flex-col items-center space-y-4 text-center">
      <span class="emoji text-6xl">🚧</span>
      <h1 class="h1">Maintenance Mode</h1>
      <p class="text-lg">
        We're currently updating our systems to serve you better. We expect to
        be back online shortly.
      </p>

      <div class="card variant-soft mt-4 w-full p-4">
        <h2 class="h3 mb-2">
          <a
            class="anchor"
            target="_blank"
            rel="noopener"
            href={config.GITHUB_LINKS.getDiscussionsUrl(
              DiscussionCategory.ANNOUNCEMENTS,
            )}
            >Why are we in maintenance?<iconify-icon
              icon="line-md:external-link"
            ></iconify-icon></a
          >
        </h2>
      </div>

      <div class="mt-4 flex flex-col space-y-2">
        <p class="text-sm">Need assistance?</p>
        <a
          href={config.GITHUB_LINKS.getDiscussionsUrl(DiscussionCategory.QA)}
          class="variant-filled-primary btn"
        >
          Contact Support
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  /* Add a subtle animation to the emoji */
  .emoji {
    animation: bounce 1s ease-in-out infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
