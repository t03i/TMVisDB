<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  import type { CreateQueryResult } from "@tanstack/svelte-query";
  import * as Sentry from "@sentry/svelte";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

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

  $: {
    if (identifier) {
      Sentry.addBreadcrumb({
        category: "search",
        message: `Searching for protein: ${identifier}`,
        level: "info",
      });
    }
  }

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
  <div class="mb-4 w-full text-center md:w-1/2">
    <Accordion>
      <AccordionItem open>
        <svelte:fragment slot="summary">
          <h3 class="mt-4 font-semibold">Explanation</h3>
        </svelte:fragment>
        <svelte:fragment slot="content">
          <p class="text-left text-sm">
            Please enter a UniProt Identifier or Protein Name. If the protein is
            found in our database, you will be automatically redirected to its
            detailed entry. If the protein exists only in UniProt, a link to its
            UniProt entry will be displayed. If the protein is not available in
            our database, TMbed did not predict a membrane topology or the
            structure was not available in AlphaFoldDB. In case the protein
            cannot be found at all, an error message will be shown.
          </p>
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
  </div>
</div>
