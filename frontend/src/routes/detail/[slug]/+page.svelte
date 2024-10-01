<script lang="ts">
  import { onDestroy } from "svelte";
  import { StructureViewer } from "$lib/components/StructureViewer";
  import { useAlphaFoldFetchStructure } from "$lib/external/alphaFoldDB";
  import {
    createGetProteinAnnotations,
    createGetProteinById,
  } from "$lib/client/tmvisdb";
  import ProteinDetailView from "$lib/components/ProteinDetailView.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  let uniprotId = data.slug;
  let structureQuery;
  let sequence = "";
  let structureUrl = "";
  let infoQuery;
  let annotationsQuery;

  $: if (uniprotId) {
    structureQuery = useAlphaFoldFetchStructure(uniprotId);
    infoQuery = createGetProteinById(uniprotId);
    annotationsQuery = createGetProteinAnnotations(uniprotId);
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

<div class="flex flex-col lg:flex-row m-5 p-3 gap-4">
  <StructureViewer
    {structureUrl}
    format={$structureQuery?.data?.format}
    binary={$structureQuery?.data?.binary}
    isLoading={$structureQuery?.isLoading}
    error={$structureQuery?.error ? $structureQuery.error.message : null}
    class="card w-full lg:w-1/2 h-[500px]"
  />

  <div class="card w-full lg:w-1/2 p-6 space-y-6">
    {#if $infoQuery?.data?.data}
      <ProteinDetailView proteinInfo={$infoQuery.data.data} />
    {:else if $infoQuery?.isLoading}
      <p>Loading protein information...</p>
    {:else if $infoQuery?.error}
      <p class="text-error-500">
        Error loading protein information: {$infoQuery.error.message}
      </p>
    {/if}
  </div>
</div>
