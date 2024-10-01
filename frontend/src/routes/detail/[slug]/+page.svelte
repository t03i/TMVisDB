<!-- +page.svelte -->
<script lang="ts">
  import { onDestroy, getContext } from "svelte";

  import { StructureViewer } from "$lib/components/StructureViewer";
  import { useAlphaFoldFetchStructure } from "$lib/external/alphaFoldDB";
  import {
    createGetProteinAnnotations,
    createGetProteinById,
  } from "$lib/client/tmvisdb";

  /** @type {import('./$types').PageData} */
  export let data;

  let uniprotId = data.slug;

  let sequence = "";
  let structureQuery;
  let infoQuery;
  let annotationsQuery;
  let structureUrl = "";

  $: if (uniprotId) {
    structureQuery = useAlphaFoldFetchStructure(uniprotId);
    infoQuery = createGetProteinById(uniprotId);
    annotationsQuery = createGetProteinAnnotations(uniprotId);
  }

  // Reactive statement to update sequence when data is available
  $: if ($structureQuery?.data) {
    sequence = $structureQuery.data.sequence;
    const blob = new Blob([$structureQuery.data.structureData], {
      type: $structureQuery.data.binary
        ? "application/octet-stream"
        : "text/plain",
    });

    // Create a Blob URL
    structureUrl = URL.createObjectURL(blob);
  }

  // Cleanup function to revoke Blob URL
  function cleanup() {
    if (structureUrl && structureUrl.startsWith("blob:")) {
      URL.revokeObjectURL($structureQuery?.data.structureUrl);
    }
  }

  onDestroy(() => {
    cleanup();
  });
</script>

<div class="flex flex-col md:flex-row m-5 p-3 gap-4 items-center">
  <StructureViewer
    {structureUrl}
    format={$structureQuery?.data?.format}
    binary={$structureQuery?.data?.binary}
    isLoading={$structureQuery?.isLoading}
    error={$structureQuery?.error ? $structureQuery.error.message : null}
    class="card w-full md:basis-1/2 h-svh md:h-[500px]"
  />
  <div class="card w-full md:basis-3/4">
    <h1 class="text-2xl font-bold">{uniprotId}</h1>
    {#if $infoQuery}
      <p>{$infoQuery.data?.name}</p>
    {/if}
  </div>
</div>
