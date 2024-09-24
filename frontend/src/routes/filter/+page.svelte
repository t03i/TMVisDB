<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import { ConicGradient } from "@skeletonlabs/skeleton";
  import type { ConicStop } from "@skeletonlabs/skeleton";

  import DataLoader from "$lib/components/DataLoader.svelte";
  import ProteinDatatable from "$lib/components/ProteinDatatable.svelte";
  import FilterForm from "$lib/components/FilterForm.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let isHydrated = data.isHydrated;
  const itemsPerPage = 20;

  const conicStops: ConicStop[] = [
    { color: "transparent", start: 0, end: 25 },
    { color: "rgb(var(--color-primary-500))", start: 75, end: 100 },
  ];

  $: params = Object.fromEntries($page.url.searchParams);
</script>

<DataLoader
  {params}
  initialData={data.initialProteins}
  page_size={itemsPerPage}
  let:data
  let:isSuccessful
  let:isLoading
  let:error
>
  <div class="flex flex-row gap-4 mx-8 my-8">
    <div class="card basis-2/12 border-r-2 p-4 h-screen relative">
      <div class={isLoading ? "pointer-events-none" : ""}>
        <FilterForm />
      </div>
      {#if isLoading}
        <div
          class="rounded-container-token absolute inset-0 bg-surface-100-800-token/50 backdrop-blur-sm flex items-center justify-center"
        >
          <ConicGradient stops={conicStops} spin />
        </div>
      {/if}
    </div>
    <div class="basis-10/12 card">
      <!--TODO handle loading state-->

      {#if isSuccessful}
        <ProteinDatatable {data} />
      {:else}
        <p>No proteins found.</p>
      {/if}
    </div>
  </div>
</DataLoader>
