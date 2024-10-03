<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import "iconify-icon";
  import config from "$lib/config";
  import type { AxiosError } from "axios";

  export let error: AxiosError;
  let className = "";
  export { className as class };

  $: errorMessage = error.message || "An unknown error occurred";
  $: statusCode = error.status || 500;
  $: is404Error = statusCode === 404;
</script>

<div class="display-block {className}" {...$$restProps}>
  <div class="flex flex-col items-center justify-center p-4 rounded-lg mb-5">
    <div class="h-1/3 flex items-end justify-center">
      {#if is404Error}
        <p class="text-error-500 text-[150pt] leading-none">🤔</p>
      {:else}
        <iconify-icon
          icon="line-md:close-circle"
          class="text-error-500 text-[150pt]"
        />
      {/if}
    </div>
    <h2 class="h2 mb-2">Error</h2>
    {#if is404Error}
      <p class="text-center">
        This protein is not (yet) in {config.APP_NAME}. If you think it should
        be, feel free to
        <a
          href="{config.GITHUB_URL}/issues"
          target="_blank"
          rel="noopener"
          class="anchor"
        >
          submit an issue
        </a>.
      </p>
    {:else}
      <p class="text-center">{errorMessage}</p>
      <div class="flex flex-row justify-center mt-4">
        <button
          class="btn variant-filled-error mt-4 mr-2"
          on:click={() => window.location.reload()}
        >
          Try Again
        </button>
        <a
          href="{config.GITHUB_URL}/issues"
          target="_blank"
          rel="noopener"
          class="btn variant-filled mt-4"
        >
          Submit an Issue
        </a>
      </div>
    {/if}
  </div>
</div>
