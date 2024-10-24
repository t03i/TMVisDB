<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  import SequenceInput from "$lib/components/SequenceInput.svelte";

  import {
    createGetUniprotAnnotation,
    type UniprotAnnotationData,
    uniprot_entry_url,
  } from "$lib/external/uniprot";
  import {
    createCheckProteinExists,
    type CheckProteinExistsQueryResult,
  } from "$lib/client/tmvisdb";
  import config from "$lib/config";
  import { missingEntryOptions } from "$lib/github";

  $: identifier = $page.url.searchParams.get("search") || "";

  $: uniprotQuery = identifier
    ? (createGetUniprotAnnotation(
        identifier,
      ) as unknown as CreateQueryResult<UniprotAnnotationData>)
    : null;

  $: tmvisdbQuery = $uniprotQuery?.data?.accession
    ? (createCheckProteinExists(
        $uniprotQuery.data.accession,
      ) as unknown as CreateQueryResult<CheckProteinExistsQueryResult>)
    : null;

  $: isLoading = $uniprotQuery?.isLoading || $tmvisdbQuery?.isLoading;

  $: if (tmvisdbQuery && $tmvisdbQuery.data?.exists) {
    goto(`/detail/${$uniprotQuery?.data?.accession}`);
  }

  $: uniprotError =
    identifier &&
    $uniprotQuery &&
    !$uniprotQuery.isLoading &&
    ($uniprotQuery.error || !$uniprotQuery.data);
  $: tmvisdbError =
    $uniprotQuery?.data?.accession &&
    $tmvisdbQuery &&
    !$tmvisdbQuery.isLoading &&
    ($tmvisdbQuery.error || ($tmvisdbQuery.data && !$tmvisdbQuery.data.exists));
</script>

<svelte:head>
  <title>{config.APP_NAME} Search</title>
</svelte:head>

<div
  class="m-3 flex h-full min-h-44 min-w-44 flex-col items-center justify-center"
>
  {#if !isLoading}
    <div class="w-full md:w-1/2">
      <SequenceInput />
    </div>
  {/if}

  {#if isLoading}
    <div class="flex w-full items-center justify-center space-x-4 md:w-1/2">
      <ProgressRadial
        value={undefined}
        stroke={80}
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
        strokeLinecap="butt"
        class="h-8 w-8"
      />
      <p class="text-xl">Searching...</p>
    </div>
  {/if}

  {#if $uniprotQuery?.data?.accession}
    <div class="card variant-filled-success mt-4 p-4">
      We found a protein matching your search in UniprotKB:
      <a
        class="anchor"
        href={uniprot_entry_url($uniprotQuery.data.accession)}
        target="_blank"
        rel="noopener"
      >
        {$uniprotQuery.data.accession}
        <iconify-icon icon="line-md:external-link"></iconify-icon>
      </a>
    </div>
  {/if}

  {#if uniprotError}
    <div class="card variant-filled-error mt-4 p-4">
      We could not find a protein matching your search in UniprotKB.
    </div>
  {/if}

  {#if tmvisdbError}
    <div class="card variant-filled-error mt-4 p-4">
      We could not find a protein for {$uniprotQuery?.data?.accession} in {config.APP_NAME}.
      If you believe this is an error,
      <a
        href={config.GITHUB_LINKS.getNewIssueUrl(
          missingEntryOptions($uniprotQuery?.data?.accession),
        )}
        class="anchor">create an issue</a
      >.
    </div>
  {/if}
</div>
