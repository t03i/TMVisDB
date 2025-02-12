<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script lang="ts">
  import "iconify-icon";
  import config from "$lib/config";
  import type { AxiosError } from "axios";
  import {
    bugOptions,
    IssueTemplate,
    missingStructureOptions,
  } from "$lib/github";

  export let error: AxiosError;
  let className = "";
  export { className as class };
  export let uniprotAcc: string = "<Uniprot Accession>";

  $: errorMessage = error.message || "An unknown error occurred";
  $: statusCode = error.status || 500;
  $: is404Error = statusCode === 404;
</script>

<div class="display-block {className}" {...$$restProps}>
  <div class="mb-5 flex flex-col items-center justify-center rounded-lg p-4">
    <div class="flex h-1/3 items-end justify-center">
      {#if is404Error}
        <p class="text-[150pt] leading-none text-error-500">🧬</p>
      {:else}
        <iconify-icon
          icon="line-md:close-circle"
          class="text-[150pt] text-error-500"
        />
      {/if}
    </div>
    <h2 class="h2 mb-2">Structure Error</h2>
    {#if is404Error}
      <p class="text-center">
        The structure for this protein is not available in AlphaFoldDB. If you
        believe this is an error, please
        <a
          href={config.GITHUB_LINKS.getNewIssueUrl(
            missingStructureOptions(uniprotAcc),
          )}
          target="_blank"
          rel="noopener"
          class="anchor"
        >
          submit an issue
        </a>.
      </p>
    {:else}
      <p class="text-center">{errorMessage}</p>
      <div class="mt-4 flex flex-row justify-center">
        <button
          class="variant-filled-error btn mr-2 mt-4"
          on:click={() => window.location.reload()}
        >
          Try Again
        </button>
        <a
          href={config.GITHUB_LINKS.getNewIssueUrl(bugOptions())}
          target="_blank"
          rel="noopener"
          class="variant-filled btn mt-4"
        >
          Report an Issue
        </a>
      </div>
    {/if}
  </div>
</div>
