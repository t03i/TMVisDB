<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  /** @type {import('./$types').PageData} */
  export let data;

  let isHydrated = data.isHydrated;
  const itemsPerPage = 20;

  let params = Object.fromEntries($page.url.searchParams);

  $: isFiltered = !!params;

  onMount(() => {
    isHydrated = true;
    params = Object.fromEntries($page.url.searchParams);
    console.log("isFiltered", isFiltered);
    console.log("params", params);
  });
</script>

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
