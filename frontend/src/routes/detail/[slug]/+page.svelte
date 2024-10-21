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

  let highlightResidueFn: (
    residues: { start_residue_number: number; end_residue_number: number }[],
    color: { r: number; g: number; b: number },
  ) => void;
  let clearHighlightFn: () => void;

  let viewer: StructureViewer;
  function handleViewerReady(event: CustomEvent) {
    console.log("Viewer ready");
    highlightResidueFn = viewer.highlightResidues;
    clearHighlightFn = viewer.clearHighlight;
  }

  function convertToRGB(color: string): { r: number; g: number; b: number } {
    if (color.startsWith("rgb")) {
      const [r, g, b] = color.match(/\d+/g)!.map(Number);
      return { r, g, b };
    } else if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return { r, g, b };
    }
    return { r: 255, g: 255, b: 0 }; // Default to yellow if parsing fails
  }

  const handleFeatureEvent = (event: CustomEvent) => {
    const { detail } = event;
    const { feature, target } = detail;

    if (feature) {
      const cssVarName = feature.color.match(/var\((.*?)(,|\))/)[1];
      const color = getComputedStyle(target)
        .getPropertyValue(cssVarName)
        .trim();
      const rgbColor = convertToRGB(color);

      const residues = feature.locations[0].fragments.map((fragment) => ({
        start_residue_number: fragment.start,
        end_residue_number: fragment.end,
      }));
      highlightResidueFn(residues, rgbColor);
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
    uniprotQuery,
    tmvisdbQuery,
    tmAlphaFoldQuery,
    isFetching: annotationsIsFetching,
    annotationDBReferences,
    annotationTracks,
  } = createAnnotationStore(uniprotAcc, infoQuery);

  onDestroy(structureCleanup);
</script>

<div class="m-5 flex h-full flex-col gap-4 p-3 lg:h-lvh">
  <div class="flex h-lvh min-h-[450px] flex-col gap-4 lg:h-1/2 lg:flex-row">
    <div class="card h-full w-full lg:w-1/2">
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
          bind:this={viewer}
          structureUrl={$structureUrl}
          format={$structureQuery?.data?.format}
          binary={$structureQuery?.data?.binary}
          on:viewerReady={handleViewerReady}
          class="card h-full min-h-[200px] w-full"
        />
      {/if}
    </div>
    <div class="card h-full w-full p-6 lg:w-1/2">
      {#if !$infoQuery?.error && $infoQuery?.data}
        <ProteinDetailView proteinInfo={$infoQuery.data} />
      {:else if $infoQuery?.isLoading}
        <ProteinDetailLoading />
      {:else if $infoQuery?.error}
        <ProteinDetailError error={$infoQuery.error} />
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
