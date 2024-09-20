<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import DataLoader from "$lib/components/DataLoader.svelte";
  import ProteinDatatable from "$lib/components/ProteinDatatable.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let isHydrated = data.isHydrated;
  const itemsPerPage = 20;

  let params = Object.fromEntries($page.url.searchParams);

  onMount(() => {
    isHydrated = true;
    params = Object.fromEntries($page.url.searchParams);
  });
</script>

{#if isHydrated}
  <DataLoader
    {params}
    initialData={data.initialProteins}
    page_size={itemsPerPage}
    let:data
    let:isSuccessful
    let:isLoading
    let:error
  >
    {#if isLoading}
      <p>Loading proteins...</p>
    {:else if error}
      <p>Error loading proteins: {error.message}</p>
    {:else if isSuccessful}
      <ProteinDatatable {data} />
    {:else}
      <p>No proteins found.</p>
    {/if}
  </DataLoader>
{/if}
