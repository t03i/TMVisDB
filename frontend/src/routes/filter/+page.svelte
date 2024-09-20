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

<DataLoader {params} let:proteins let:isLoading let:error>
  {#if isLoading}
    <p>Loading proteins...</p>
  {:else if error}
    <p>Error loading proteins: {error.message}</p>
  {:else if proteins}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Accession</th>
          <th>Length</th>
          <th>Organism</th>
        </tr>
      </thead>
      <tbody>
        {#each proteins as protein}
          <tr>
            <td>{protein.name}</td>
            <td>{protein.uniprot_accession}</td>
            <td>{protein.seq_length}</td>
            <td>{protein.organism_name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No proteins found.</p>
  {/if}
</DataLoader>
{#if data.initialProteins}
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Accession</th>
        <th>Length</th>
        <th>Organism</th>
        <!-- Add more headers as needed -->
      </tr>
    </thead>
    <tbody>
      {#each data.initialProteins.items as protein}
        <tr>
          <td>{protein.name}</td>
          <td>{protein.uniprot_accession}</td>
          <td>{protein.seq_length}</td>
          <td>{protein.organism_name}</td>
          <!-- Add more cells as needed -->
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
