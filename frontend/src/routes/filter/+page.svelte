<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import DataLoader from "$lib/components/DataLoader.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let isHydrated = data.isHydrated;
  const itemsPerPage = 20;

  let params = Object.fromEntries($page.url.searchParams);

  $: isFiltered = !!params.search_for;

  onMount(() => {
    isHydrated = true;
    params = Object.fromEntries($page.url.searchParams);
  });
</script>

<DataLoader
  {params}
  initialData={data.initialData}
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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Accession</th>
          <th>Length</th>
          <th>Organism</th>
        </tr>
      </thead>
      <tbody> </tbody>
    </table>
  {:else}
    <p>No proteins found.</p>
  {/if}
</DataLoader>
