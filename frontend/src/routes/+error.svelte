<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script>
  import { emojis } from "$lib/statusEmojis";
  import { page } from "$app/stores";
  import config from "$lib/config";
</script>

<div class="grid h-[calc(100vh-4rem)] w-full place-items-center p-4">
  <div class="card variant-glass-surface w-full max-w-2xl">
    <header class="card-header flex flex-col items-center p-4">
      <span
        class="emoji h1 mt-4 text-center"
        role="img"
        aria-label="Error emoji"
      >
        {emojis[$page.status] ?? emojis[500]}
      </span>
    </header>

    <section class="space-y-4 p-4">
      <div class="card variant-soft p-4">
        <p class="text-center text-lg">
          {$page.error?.message ?? "An unknown error occurred"}
        </p>
        <p class="mt-2 text-center text-sm opacity-75">
          Error Code: {$page.status}
        </p>
      </div>

      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a href="/" class="variant-filled-primary btn w-full sm:w-auto">
          <iconify-icon icon="lucide:home" class="mr-2"></iconify-icon>
          Go Home
        </a>

        {#if $page.status >= 500}
          <a
            href={`${config.GITHUB_URL}/issues/new`}
            class="variant-soft btn w-full sm:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <iconify-icon icon="lucide:bug" class="mr-2"></iconify-icon>
            Report Issue
          </a>
        {/if}

        <button
          class="variant-ghost btn w-full sm:w-auto"
          on:click={() => window.location.reload()}
        >
          <iconify-icon icon="lucide:refresh-cw" class="mr-2"></iconify-icon>
          Try Again
        </button>
      </div>
    </section>
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
