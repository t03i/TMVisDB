<script lang="ts">
  import { onDestroy } from "svelte";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  import {
    createGetAlphaFoldStructure,
    type AlphaFoldStructure,
  } from "$lib/external/alphaFoldDB";
  import {
    createGetUniprotAnnotation,
    type UniprotAnnotationData,
  } from "$lib/external/uniprot";
  import { createGetProteinById } from "$lib/client/tmvisdb";
  import type { ProteinInfo } from "$lib/client/model";
  import {
    ProteinDetailView,
    ProteinDetailLoading,
    ProteinDetailError,
  } from "$lib/components/ProteinDetail";
  import {
    DBReferencesView,
    DBReferencesLoading,
  } from "$lib/components/DBReferences";
  import AnnotationLoader from "$lib/components/AnnotationLoader.svelte";
  import {
    StructureViewer,
    StructureViewerError,
    StructureViewerLoading,
  } from "$lib/components/StructureViewer";
  import type { AxiosError } from "axios";

  /** @type {import('./$types').PageData} */
  export let data: { slug: string };

  $: uniprotAcc = data.slug;
  let structureQuery: CreateQueryResult<AlphaFoldStructure | null, AxiosError>;
  let structureUrl: string = "";
  let infoQuery: CreateQueryResult<{ data: ProteinInfo }, AxiosError>;
  let uniprotQuery: CreateQueryResult<UniprotAnnotationData | null, AxiosError>;
  let annotationQuery: CreateQueryResult<unknown, AxiosError>;

  $: if (uniprotAcc) {
    structureQuery = createGetAlphaFoldStructure(uniprotAcc);
    uniprotQuery = createGetUniprotAnnotation(uniprotAcc);
    infoQuery = createGetProteinById(uniprotAcc);
  }

  $: if ($structureQuery?.data) {
    const blob = new Blob([$structureQuery.data.structureData], {
      type: $structureQuery.data.binary
        ? "application/octet-stream"
        : "text/plain",
    });
    structureUrl = URL.createObjectURL(blob);
  }

  function cleanup() {
    if (structureUrl && structureUrl.startsWith("blob:")) {
      URL.revokeObjectURL(structureUrl);
    }
  }

  onDestroy(cleanup);
</script>

<div class="flex flex-col m-5 p-3 gap-4 h-full lg:h-lvh">
  <div class="flex flex-col lg:flex-row gap-4 h-lvh lg:h-1/2">
    <div class="card w-full lg:w-1/2 h-full">
      {#if $structureQuery?.isLoading}
        <div class="h-full w-full p-6">
          <StructureViewerLoading />
        </div>
      {:else if $structureQuery?.error}
        <div class="h-full w-full p-6">
          <StructureViewerError error={$structureQuery?.error} />
        </div>
      {:else if structureUrl}
        <StructureViewer
          {structureUrl}
          format={$structureQuery?.data?.format}
          binary={$structureQuery?.data?.binary}
          class="h-full w-full card"
        />
      {/if}
    </div>
    <div class="card w-full lg:w-1/2 p-6 h-full">
      {#if !$infoQuery?.error && $infoQuery?.data?.data}
        <ProteinDetailView proteinInfo={$infoQuery.data.data} />
      {:else if $infoQuery?.isLoading}
        <ProteinDetailLoading />
      {:else if $infoQuery?.error}
        <ProteinDetailError error={$infoQuery.error} />
      {/if}
    </div>
  </div>

  {#if $infoQuery?.data?.data}
    <AnnotationLoader proteinInfo={$infoQuery.data.data} bind:annotationQuery>
      <div class="card w-full p-6 space-y-6">
        {#if annotationQuery?.isLoading}
          <DBReferencesLoading />
        {:else if annotationQuery?.isError}
          <p>Error loading annotations: {annotationQuery.error.message}</p>
        {:else if dbReferences}
          <DBReferencesView {dbReferences} />
        {/if}
      </div>
    </AnnotationLoader>
  {/if}
</div>
