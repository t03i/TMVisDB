<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { RadioGroup, RadioItem, SlideToggle } from "@skeletonlabs/skeleton";
  import { Topology } from "$lib/client/model";
  import config from "$lib/config";
  import taxonomyData from "$lib/assets/shared/taxonomies.json";

  type FilterType = "taxa" | "id";

  // Define default values in a dictionary
  const defaultFilters = {
    filterType: "taxa" as FilterType,
    filterTopology: Topology.All,
    filterMinLength: config.MIN_PROTEIN_LENGTH,
    filterMaxLength: config.MAX_PROTEIN_LENGTH,
    filterSignalPeptide: true,
    filterOrganismId: "",
    filterDomain: "",
    filterKingdom: "",
  };

  // Initialize filters with default values
  $: filters = { ...defaultFilters };

  // Compute available clades based on selected domain
  $: availableClades =
    taxonomyData.find((d) => d.value === filters.filterDomain)?.clades || [];

  // Ensure signal peptide filter is enabled when topology is 'All'
  $: if (filters.filterTopology === Topology.All) {
    filters.filterSignalPeptide = true;
  }

  const dispatch = createEventDispatcher();

  // Reset filters to default values
  function resetFilters() {
    filters = { ...defaultFilters };
  }

  // Handle form reset
  function handleReset() {
    resetFilters();
    goto("?"); // Clear all query parameters
    dispatch("reset");
  }

  // Handle form submission
  function handleSubmit(event: Event) {
    event.preventDefault();

    const params: Record<string, string> = {};

    Object.entries(filters).forEach(([key, value]) => {
      const defaultValue = defaultFilters[key as keyof typeof defaultFilters];
      if (value !== defaultValue) {
        const paramKey = key.replace("filter", "").toLowerCase();
        params[paramKey] = String(value);
      }
    });

    // Always include the search_for parameter
    params.search_for = filters.filterType;

    // Include signal peptide if topology is not the default value
    if (filters.filterTopology !== defaultFilters.filterTopology) {
      params.peptide = String(filters.filterSignalPeptide);
    }

    goto(`?${new URLSearchParams(params).toString()}`);
    dispatch("filter");
  }

  // Initialize filters from URL on mount
  onMount(() => {
    const url = $page.url;
    const params = new URLSearchParams(url.search);

    Object.keys(defaultFilters).forEach((key) => {
      const paramKey = key.replace("filter", "").toLowerCase();
      const paramValue = params.get(paramKey);
      if (paramValue !== null) {
        if (key === "filterTopology") {
          // @ts-ignore
          filters[key] = paramValue;
        } else if (key === "filterMinLength" || key === "filterMaxLength") {
          filters[key] = parseInt(paramValue);
        } else if (key === "filterSignalPeptide") {
          filters[key] = paramValue !== "false";
        } else {
          // @ts-ignore
          filters[key] = paramValue;
        }
      }
    });
  });

  // Check if current state matches default state
  function isDefaultState(): boolean {
    return Object.keys(defaultFilters).every(
      // @ts-ignore
      (key) => key === "filterType" || filters[key] === defaultFilters[key],
    );
  }

  // Check if a filter has been applied
  function isFilterApplied(): boolean {
    const url = $page.url;
    const params = new URLSearchParams(url.search);
    return params.has("search_for");
  }
  let canApplyFilter = false;
  let canReset = false;
  $: if (filters) {
    canApplyFilter = !isDefaultState();
  }
  $: if (filters) {
    canReset = isFilterApplied();
  }
</script>

<form
  class="flex w-full flex-col items-center gap-4 p-4"
  on:submit|preventDefault={handleSubmit}
>
  <div class="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-4">
    <!-- Filter Type Radio Group -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold">Filter By:</span>
      <RadioGroup class="flex-col space-x-2 md:flex-row">
        <RadioItem name="filter-1" bind:group={filters.filterType} value="taxa"
          >Taxonomy</RadioItem
        >
        <RadioItem name="filter-2" bind:group={filters.filterType} value="id"
          >Organism ID</RadioItem
        >
      </RadioGroup>
    </div>

    {#if filters.filterType === "id"}
      <!-- Organism ID Input -->
      <div class="flex items-center gap-2">
        <label for="organism_id" class="text-sm font-bold"
          >UniProtKB Organism ID:</label
        >
        <input
          id="organism_id"
          type="number"
          class="input w-32 px-2 py-1 leading-tight"
          placeholder="Organism ID"
          bind:value={filters.filterOrganismId}
          required
        />
      </div>
    {:else}
      <!-- Domain Selection -->
      <div class="flex items-center gap-2">
        <label for="domain" class="text-sm font-bold">Domain:</label>
        <select
          id="domain"
          class="select w-40 px-2 py-1 leading-tight"
          bind:value={filters.filterDomain}
          required
        >
          <option value="" disabled selected>Select Domain</option>
          {#each taxonomyData as { value }}
            <option {value}>{value}</option>
          {/each}
        </select>
      </div>
      <!-- Kingdom Selection -->
      <div class="flex items-center gap-2">
        <label for="kingdom" class="text-sm font-bold">Kingdom:</label>
        <select
          id="kingdom"
          class="select w-40 px-2 py-1 leading-tight"
          bind:value={filters.filterKingdom}
        >
          <option value="">All</option>
          {#each availableClades as value}
            <option {value}>{value}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>

  <div class="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-4">
    <!-- Structural Topology Radio Group -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold">Topology:</span>
      <RadioGroup class="flex flex-col space-x-2 md:flex-row">
        <RadioItem
          name="topology-1"
          bind:group={filters.filterTopology}
          value={Topology.All}>All</RadioItem
        >
        <RadioItem
          name="topology-2"
          bind:group={filters.filterTopology}
          value={Topology.Both}>Both</RadioItem
        >
        <RadioItem
          name="topology-3"
          bind:group={filters.filterTopology}
          value={Topology["Alpha-helix"]}>α-Helix</RadioItem
        >
        <RadioItem
          name="topology-4"
          bind:group={filters.filterTopology}
          value={Topology["Beta-strand"]}>β-Barrel</RadioItem
        >
      </RadioGroup>
    </div>

    <!-- Signal Peptide Slide Toggle -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold">Signal Peptide:</span>
      <SlideToggle
        name="signal-peptide"
        bind:checked={filters.filterSignalPeptide}
        disabled={filters.filterTopology === Topology.All}
      ></SlideToggle>
    </div>

    <!-- Sequence Length Range Inputs -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold">Length:</span>
      <input
        type="number"
        class="input w-20 px-2 py-1"
        bind:value={filters.filterMinLength}
        min={config.MIN_PROTEIN_LENGTH}
        max={filters.filterMaxLength}
        placeholder="Min"
      />
      <span>-</span>
      <input
        type="number"
        class="input w-20 px-2 py-1"
        bind:value={filters.filterMaxLength}
        min={filters.filterMinLength}
        max={config.MAX_PROTEIN_LENGTH}
        placeholder="Max"
      />
    </div>
  </div>

  <!-- Form Actions -->
  <div class="flex gap-2">
    <button
      type="submit"
      class="variant-filled-success btn"
      disabled={!canApplyFilter}>Apply</button
    >
    <button
      type="button"
      on:click={handleReset}
      class="variant-soft-warning btn"
      disabled={!canReset}
    >
      Reset
    </button>
  </div>
</form>
