<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { modeCurrent } from "@skeletonlabs/skeleton";
  import type { CreateQueryResult } from "@tanstack/svelte-query";

  import { createStructureStore } from "$lib/stores/StructureStore";
  import { createAnnotationStore } from "$lib/stores/AnnotationStore";
  import { createGetProteinById } from "$lib/client/tmvisdb";
  import type { ProteinInfo } from "$lib/client/model";
  import type { SourceDB } from "$lib/annotations";
  import { AnnotationStyleManager } from "$lib/annotations";
  import { StructureViewerState } from '$lib/stores/StructureMarksStore';

  import config from "$lib/config";

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
    StructureColorSwitcher,
  } from "$lib/components/StructureViewer";

  import {
    FeatureViewer,
    FeatureViewerLoading,
  } from "$lib/components/FeatureViewer";

  /** @type {import('./$types').PageData} */
  export let data: { slug: string };

  let rootContainer: HTMLDivElement;
  let annotationStyleManager: AnnotationStyleManager;
  let structureState: StructureViewerState;

  let viewer: StructureViewer;
  function handleViewerReady(event: CustomEvent) {
    console.log("Viewer ready");
  }

  const handleFeatureEvent = (event: CustomEvent) => {
    const { detail } = event;
    const { feature } = detail;

    if (feature) {
        const residues = feature.locations[0].fragments.map((fragment: { start: number; end: number }) => ({
          start_residue_number: fragment.start,
          end_residue_number: fragment.end,
        }));
        structureState.setHighlight(residues, {r: 0, g: 255, b: 255}, true);
    }
  };

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
    isFetching: annotationsIsFetching,
    annotationStructureSelection,
    annotationDBReferences,
    annotationTracks,
  } = createAnnotationStore(uniprotAcc, infoQuery);


  onMount(() => {
    annotationStyleManager = new AnnotationStyleManager(
      rootContainer,
      modeCurrent ? "light" : "dark",
    );

    structureState = new StructureViewerState(annotationStyleManager, annotationStructureSelection);

    const unsubscribe = modeCurrent.subscribe((mode) => {
      annotationStyleManager.setTheme(mode ? "light" : "dark");
      structureState.updateColors();
    });
    return unsubscribe;
  });

  onDestroy(structureCleanup);
</script>

<svelte:head>
  <title>{config.APP_NAME} - {uniprotAcc}</title>
</svelte:head>

<div
  bind:this={rootContainer}
  class="m-5 flex h-full flex-col gap-4 p-3 lg:h-lvh"
>
  <div class="flex h-lvh min-h-[450px] flex-col gap-4 lg:h-1/2 lg:flex-row">
    <div class="card h-full w-full lg:w-1/2">
      {#if $structureQuery?.isLoading}
        <div class="h-full w-full p-6">
          <StructureViewerLoading />
        </div>
      {:else if $structureQuery?.error}
        <div class="h-full w-full p-6">
          <StructureViewerError error={$structureQuery?.error} {uniprotAcc} />
        </div>
      {:else if $structureUrl}
        <div class="relative h-full w-full">
          <StructureColorSwitcher
            structureState={structureState}
            annotationStructureSelection={$annotationStructureSelection}
          />
          <StructureViewer
            bind:this={viewer}
            structureUrl={$structureUrl}
            format={$structureQuery?.data?.format}
            binary={$structureQuery?.data?.binary}
            state={structureState}
            on:viewerReady={handleViewerReady}
            class="card h-full min-h-[200px] w-full"
          />
        </div>
      {/if}
    </div>
    <div class="card h-full w-full p-6 lg:w-1/2">
      {#if !$infoQuery?.error && $infoQuery?.data}
        <ProteinDetailView proteinInfo={$infoQuery.data} />
      {:else if $infoQuery?.isLoading}
        <ProteinDetailLoading />
      {:else if $infoQuery?.error}
        <ProteinDetailError error={$infoQuery.error} {uniprotAcc} />
      {/if}
    </div>
  </div>

  <div class="card w-full space-y-6 p-6">
    <h3 class="no-wrap h3">Annotation Sources</h3>
    {#if $annotationsIsFetching}
      <DBReferencesLoading />
    {:else if $annotationDBReferences && Object.keys($annotationDBReferences).length > 0}
      <DBReferencesView dbReferences={$annotationDBReferences} />
    {/if}
  </div>
  <div class="card w-full space-y-6 p-6">
    <h3 class="no-wrap h3">Annotations</h3>
    {#if $annotationsIsFetching}
      <FeatureViewerLoading />
    {:else if $structureQuery.data?.sequence && $annotationTracks}
      <FeatureViewer
        on:feature-clicked={handleFeatureEvent}
        sequence={$structureQuery.data?.sequence}
        trackData={$annotationTracks}
      />
    {/if}
  </div>
</div>
