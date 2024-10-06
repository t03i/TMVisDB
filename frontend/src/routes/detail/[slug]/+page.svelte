<script lang="ts">
  import { onDestroy } from "svelte";
  import type { CreateQueryResult } from "@tanstack/svelte-query";
  import type { AxiosError } from "axios";

  //TODO clean technical debt of quick and dirty

  import {
    createGetAlphaFoldStructure,
    type AlphaFoldStructure,
  } from "$lib/external/alphaFoldDB";
  import {
    createGetUniprotAnnotation,
    type UniprotAnnotationData,
  } from "$lib/external/uniprot";
  import { createGetProteinById } from "$lib/client/tmvisdb";
  import { createGetTMAlphaFoldAnnotation } from "$lib/external/tmAlphaFold";
  import { createGetProteinAnnotations } from "$lib/client/tmvisdb";
  import {
    annotationsToReferences,
    annotationsToTracks,
  } from "$lib/annotations";
  import type { TrackData, DBReferences } from "$lib/annotations";

  import type { ProteinInfo, PublicAnnotation } from "$lib/client/model";
  import {
    ProteinDetailView,
    ProteinDetailLoading,
    ProteinDetailError,
  } from "$lib/components/ProteinDetail";
  import {
    DBReferencesView,
    DBReferencesLoading,
  } from "$lib/components/DBReferences";
  import {
    StructureViewer,
    StructureViewerError,
    StructureViewerLoading,
  } from "$lib/components/StructureViewer";
  import FeatureViewer from "$lib/components/FeatureViewer.svelte";

  /** @type {import('./$types').PageData} */
  export let data: { slug: string };

  $: uniprotAcc = data.slug;
  let structureQuery: CreateQueryResult<AlphaFoldStructure | null, AxiosError>;
  let structureUrl: string = "";
  let infoQuery: CreateQueryResult<ProteinInfo, AxiosError>;
  let uniprotQuery: CreateQueryResult<UniprotAnnotationData | null, AxiosError>;
  let tmAlphaFoldQuery: CreateQueryResult<any, any>;
  let tmvisdbQuery: CreateQueryResult<any, any>;
  let dbReferences: DBReferences = {};
  let trackData: TrackData | undefined = undefined;
  let annotationsLoading = false;

  $: if (uniprotAcc) {
    structureQuery = createGetAlphaFoldStructure(uniprotAcc);
    infoQuery = createGetProteinById(uniprotAcc);
  }

  $: if ($infoQuery?.data) {
    uniprotQuery = createGetUniprotAnnotation(
      $infoQuery.data.uniprot_accession,
    );
    tmAlphaFoldQuery = createGetTMAlphaFoldAnnotation(
      $infoQuery.data.uniprot_id,
    );
    tmvisdbQuery = createGetProteinAnnotations(
      $infoQuery.data.uniprot_accession,
    );
  }

  $: annotationsLoading =
    $uniprotQuery?.isFetching ||
    $tmAlphaFoldQuery?.isFetching ||
    $tmvisdbQuery?.isFetching;

  $: if ($infoQuery?.data && !annotationsLoading) {
    let annotations: PublicAnnotation[] = [
      ...($uniprotQuery?.data?.annotations ?? []),
      ...($tmAlphaFoldQuery?.data?.annotations ?? []),
      ...($tmvisdbQuery?.data?.annotations ?? []),
    ];
    dbReferences = annotationsToReferences(annotations);
    trackData = annotationsToTracks(annotations);
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
  <div class="flex flex-col lg:flex-row gap-4 h-lvh lg:h-1/2 lg:min-h-[425px]">
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
      {#if !$infoQuery?.error && $infoQuery?.data}
        <ProteinDetailView proteinInfo={$infoQuery.data} />
      {:else if $infoQuery?.isLoading}
        <ProteinDetailLoading />
      {:else if $infoQuery?.error}
        <ProteinDetailError error={$infoQuery.error} />
      {/if}
    </div>
  </div>

  {#if $infoQuery?.data}
    <div class="card w-full p-6 space-y-6">
      {#if annotationsLoading}
        <DBReferencesLoading />
      {:else if dbReferences && Object.keys(dbReferences).length > 0}
        <DBReferencesView {dbReferences} />
      {/if}
    </div>
    <div class="card w-full p-6 space-y-6">
      {#if annotationsLoading}
        Create Loading component
      {:else if dbReferences && $structureQuery.data?.sequence && trackData}
        <FeatureViewer sequence={$structureQuery.data?.sequence} {trackData} />
      {/if}
    </div>
  {/if}
</div>
