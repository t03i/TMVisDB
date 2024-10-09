<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  import { createStructureStore } from "$lib/stores/StructureStore";
  import { createAnnotationStore } from "$lib/stores/AnnotationStore";
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

  import {
    StructureViewer,
    StructureViewerError,
    StructureViewerLoading,
  } from "$lib/components/StructureViewer";

  import {
    FeatureViewer,
    FeatureViewerLoading,
  } from "$lib/components/FeatureViewer";

  /** @type {import('./$types').PageData} */
  export let data: { slug: string };

  const uniprotAcc = data.slug;

  const {
    query: structureQuery,
    structureUrl,
    cleanup: structureCleanup,
  } = createStructureStore(uniprotAcc);

  const infoQuery = createGetProteinById(
    uniprotAcc,
  ) as unknown as CreateQueryResult<ProteinInfo>;

  const {
    uniprotQuery,
    tmvisdbQuery,
    tmAlphaFoldQuery,
    isFetching: annotationsIsFetching,
    annotationDBReferences,
    annotationTracks,
  } = createAnnotationStore(uniprotAcc, infoQuery);

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

  <div class="card w-full p-6 space-y-6">
    <h3 class="h3 no-wrap">Annotation Sources</h3>
    {#if $annotationsIsFetching}
      <DBReferencesLoading />
    {:else if $annotationDBReferences && Object.keys($annotationDBReferences).length > 0}
      <DBReferencesView dbReferences={$annotationDBReferences} />
    {/if}
  </div>
  <div class="card w-full p-6 space-y-6">
    <h3 class="h3 no-wrap">Annotations</h3>
    {#if $annotationsIsFetching}
      <FeatureViewerLoading />
    {:else if $structureQuery.data?.sequence && $annotationTracks}
      <FeatureViewer
        sequence={$structureQuery.data?.sequence}
        trackData={$annotationTracks}
      />
    {/if}
  </div>
</div>
