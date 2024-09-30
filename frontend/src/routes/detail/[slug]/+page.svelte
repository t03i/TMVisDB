<!-- +page.svelte -->
<script lang="ts">
  import { onDestroy, getContext } from "svelte";

  import { StructureViewer } from "$lib/components/StructureViewer";
  import { useAlphaFoldFetchStructure } from "$lib/external/alphaFoldDB";
  import { createGetProteinById } from "$lib/client/tmvisdb";

  /** @type {import('./$types').PageData} */
  export let data;

  let uniprotId = data.slug;

  let sequence = "";
  let structureQuery;
  let infoQuery;
  let structureUrl = "";

  $: if (uniprotId) {
    structureQuery = useAlphaFoldFetchStructure(uniprotId);
    infoQuery = createGetProteinById(uniprotId);
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

<StructureViewer
  {structureUrl}
  format={$structureQuery?.data?.format}
  binary={$structureQuery?.data?.binary}
  isLoading={$structureQuery?.isLoading}
  error={$structureQuery?.error ? $structureQuery.error.message : null}
  class="w-1/4 h-64"
/>

{#if sequence}
  <p>Sequence length: {sequence.length}</p>
{/if}
