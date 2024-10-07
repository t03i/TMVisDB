<script lang="ts">
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import type { CreateQueryResult } from "@tanstack/svelte-query";
  import type { AxiosError } from "axios";

  //TODO clean technical debt of quick and dirty

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

  import { createStructureStore } from "$lib/stores/StructureStore";

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

  const {
    query: structureQuery,
    structureUrl,
    cleanup: structureCleanup,
  } = createStructureStore(data.slug);

  let infoQuery: CreateQueryResult<ProteinInfo, AxiosError>;
  let uniprotQuery: CreateQueryResult<UniprotAnnotationData | null, AxiosError>;
  let tmAlphaFoldQuery: CreateQueryResult<any, any>;
  let tmvisdbQuery: CreateQueryResult<any, any>;
  let dbReferences: DBReferences = {};
  let trackData: TrackData | undefined = undefined;
  let annotationsLoading = false;

  // $: if (uniprotAcc) {
  //   infoQuery = createGetProteinById(uniprotAcc);
  // }

  // $: if ($infoQuery?.data) {
  //   uniprotQuery = createGetUniprotAnnotation(
  //     $infoQuery.data.uniprot_accession,
  //   );
  //   tmAlphaFoldQuery = createGetTMAlphaFoldAnnotation(
  //     $infoQuery.data.uniprot_id,
  //   );
  //   tmvisdbQuery = createGetProteinAnnotations(
  //     $infoQuery.data.uniprot_accession,
  //   );
  // }

  // $: annotationsLoading =
  //   $uniprotQuery?.isFetching ||
  //   $tmAlphaFoldQuery?.isFetching ||
  //   $tmvisdbQuery?.isFetching;

  // $: if ($infoQuery?.data && !annotationsLoading) {
  //   let annotations: PublicAnnotation[] = [
  //     ...($uniprotQuery?.data?.annotations ?? []),
  //     ...($tmAlphaFoldQuery?.data?.annotations ?? []),
  //     ...($tmvisdbQuery?.data?.annotations ?? []),
  //   ];
  //   dbReferences = annotationsToReferences(annotations);
  //   trackData = annotationsToTracks(annotations);
  // }

  onDestroy(structureCleanup);
</script>

<div class="flex flex-col m-5 p-3 gap-4 h-full lg:h-lvh">
  <div class="flex flex-col lg:flex-row gap-4 h-lvh lg:h-1/2 min-h-[450px]">
    <div class="card w-full lg:w-1/2 h-full">
      {#if $structureQuery?.isLoading}
        <div class="h-full w-full p-6">
          <StructureViewerLoading />
        </div>
      {:else if $structureQuery?.error}
        <div class="h-full w-full p-6">
          <StructureViewerError error={$structureQuery?.error} />
        </div>
      {:else if $structureUrl}
        <StructureViewer
          structureUrl={$structureUrl}
          format={$structureQuery?.data?.format}
          binary={$structureQuery?.data?.binary}
          class="h-full w-full card min-h-[200px]"
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
      <h3 class="h3 no-wrap">Annotation Sources</h3>
      {#if annotationsLoading}
        <DBReferencesLoading />
      {:else if dbReferences && Object.keys(dbReferences).length > 0}
        <DBReferencesView {dbReferences} />
      {/if}
    </div>
    <div class="card w-full p-6 space-y-6">
      <h3 class="h3 no-wrap">Annotations</h3>
      {#if annotationsLoading}
        Create Loading component
      {:else if dbReferences && $structureQuery.data?.sequence && trackData}
        <FeatureViewer
          sequence={$structureQuery.data?.sequence}
          {trackData}
          featureEventHandler={highlightHandler}
        />
      {/if}
    </div>
  {/if}
</div>
