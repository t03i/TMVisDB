<script lang="ts">
  import { onDestroy } from "svelte";
  import { StructureViewer } from "$lib/components/StructureViewer";
  import { useAlphaFoldFetchStructure } from "$lib/external/alphaFoldDB";
  import { useUniprotFetchAnnotation } from "$lib/external/uniprot";
  import { createGetProteinById } from "$lib/client/tmvisdb";

  import {
    ProteinDetailView,
    ProteinDetailLoading,
    ProteinDetailError,
  } from "$lib/components/ProteinDetail";
  import DbReferencesView from "$lib/components/DBReferencesView.svelte";
  import AnnotationLoader from "$lib/components/AnnotationLoader.svelte";
  import StructureViewerError from "$lib/components/StructureViewer/StructureViewerError.svelte";
  import StructureViewerLoading from "$lib/components/StructureViewer/StructureViewerLoading.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  let uniprotAcc = data.slug;
  let structureQuery;
  let sequence = "";
  let structureUrl = "";
  let infoQuery;
  let uniprotQuery;

  $: if (uniprotAcc) {
    structureQuery = useAlphaFoldFetchStructure(uniprotAcc);
    uniprotQuery = useUniprotFetchAnnotation(uniprotAcc);
    infoQuery = createGetProteinById(uniprotAcc);
  }

  $: if ($structureQuery?.data) {
    sequence = $structureQuery.data.sequence;
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
        <StructureViewerLoading />
      {:else if $structureQuery?.error}
        <StructureViewerError error={$structureQuery?.error} />
      {:else if structureUrl}
        <StructureViewer
          {structureUrl}
          format={$structureQuery?.data?.format}
          binary={$structureQuery?.data?.binary}
          class="h-full w-full card"
        />
      {/if}
    </div>
    <div class="card w-full lg:w-1/2 p-6 space-y-6">
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
    <AnnotationLoader
      proteinInfo={$infoQuery.data.data}
      let:annotationQuery
      let:annotationsBySource
      let:dbReferences
    >
      {#if annotationQuery.isLoading}
        <p>Loading annotations...</p>
      {:else if annotationQuery.isError}
        <p>Error loading annotations: {annotationQuery.error.message}</p>
      {:else if dbReferences}
        <div class="card w-full p-6 space-y-6">
          <DbReferencesView {dbReferences} />
        </div>
      {/if}
    </AnnotationLoader>
  {/if}
</div>
