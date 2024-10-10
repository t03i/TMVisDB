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
  import type { ProteinExistence } from "$lib/client/model";
  import config from "$lib/config";

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

<div
  class="flex flex-col items-center justify-center h-full m-3 min-h-44 min-w-44"
>
  {#if !isLoading}
    <div class="w-full md:w-1/2">
      <SequenceInput />
    </div>
  {/if}

  {#if isLoading}
    <div class="flex items-center justify-center w-full md:w-1/2 space-x-4">
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
    <div class="card p-4 variant-filled-success mt-4">
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
    <div class="card p-4 variant-filled-error mt-4">
      We could not find a protein matching your search in UniprotKB.
    </div>
  {/if}

  {#if tmvisdbError}
    <div class="card p-4 variant-filled-error mt-4">
      We could not find a protein for {$uniprotQuery?.data?.accession} in {config.APP_NAME}.
      If you believe this is an error,
      <a href={config.GITHUB_URL} class="anchor">create an issue</a>.
    </div>
  {/if}
</div>
