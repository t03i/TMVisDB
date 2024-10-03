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

    const params: Record<string, string> = {
      search_for: filters.filterType,
      topology: filters.filterTopology,
      peptide: String(filters.filterSignalPeptide),
      min: String(filters.filterMinLength),
      max: String(filters.filterMaxLength),
    };

    if (filters.filterType === "id") {
      params.organism_id = filters.filterOrganismId;
    } else {
      params.domain = filters.filterDomain;
      params.kingdom = filters.filterKingdom;
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
          filters[key] = paramValue as Topology;
        } else if (key === "filterMinLength" || key === "filterMaxLength") {
          filters[key] = parseInt(paramValue);
        } else if (key === "filterSignalPeptide") {
          filters[key] = paramValue !== "false";
        } else {
          filters[key] = paramValue;
        }
      }
    });
  });

  // Check if current state matches default state
  function isDefaultState(): boolean {
    return Object.keys(defaultFilters).every(
      (key) => filters[key] === defaultFilters[key],
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

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
  <!-- Filter Type Radio Group -->
  <fieldset>
    <legend class="text-sm font-bold">Search By</legend>
    <RadioGroup class="flex space-x-4">
      <RadioItem name="filter-1" bind:group={filters.filterType} value="taxa"
        >Taxonomy</RadioItem
      >
      <RadioItem name="filter-2" bind:group={filters.filterType} value="id"
        >Organism ID</RadioItem
      >
    </RadioGroup>
  </fieldset>

  {#if filters.filterType === "id"}
    <!-- Organism ID Input -->
    <div>
      <label for="organism_id" class="text-sm font-bold"
        >UniProtKB Organism ID</label
      >
      <input
        id="organism_id"
        type="number"
        class="input py-2 px-3 leading-tight"
        placeholder="Enter Organism ID"
        bind:value={filters.filterOrganismId}
        required
      />
    </div>
  {:else}
    <!-- Domain Selection -->
    <div>
      <label for="domain" class="text-sm font-bold">Domain of Life</label>
      <select
        id="domain"
        class="select py-2 px-3 leading-tight"
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
    <div>
      <label for="kingdom" class="text-sm font-bold">Kingdom</label>
      <select
        id="kingdom"
        size="4"
        class="select py-2 px-3 leading-tight"
        bind:value={filters.filterKingdom}
      >
        <option value="">All</option>
        {#each availableClades as value}
          <option {value}>{value}</option>
        {/each}
      </select>
    </div>
  {/if}

  <!-- Structural Topology Radio Group -->
  <div>
    <fieldset>
      <legend class="text-sm font-bold">Structural Topology</legend>
      <RadioGroup class="grid grid-cols-2 gap-4">
        <RadioItem
          name="topology-1"
          bind:group={filters.filterTopology}
          value={Topology.All}>Non-filtered</RadioItem
        >
        <RadioItem
          name="topology-2"
          bind:group={filters.filterTopology}
          value={Topology.Both}>Both Helix and Barrel</RadioItem
        >
        <RadioItem
          name="topology-3"
          bind:group={filters.filterTopology}
          value={Topology["Alpha-helix"]}>Only Alpha-Helices</RadioItem
        >
        <RadioItem
          name="topology-4"
          bind:group={filters.filterTopology}
          value={Topology["Beta-strand"]}>Only Beta-Barrels</RadioItem
        >
      </RadioGroup>
    </fieldset>
  </div>

  <!-- Signal Peptide Slide Toggle -->
  <div class="flex items-center space-x-2">
    <SlideToggle
      name="signal-peptide"
      bind:checked={filters.filterSignalPeptide}
      disabled={filters.filterTopology === Topology.All}
    >
      Show sequences with signal peptides
    </SlideToggle>
  </div>

  <!-- Sequence Length Range Inputs -->
  <div>
    <label class="text-sm font-bold" for="input-range"
      >Sequence Length Range</label
    >
    <div class="flex items-center space-x-4" id="input-range">
      <input
        type="number"
        class="input"
        bind:value={filters.filterMinLength}
        min={config.MIN_PROTEIN_LENGTH}
        max={filters.filterMaxLength}
        placeholder="Min Length"
      />
      <span>to</span>
      <input
        type="number"
        class="input"
        bind:value={filters.filterMaxLength}
        min={filters.filterMinLength}
        max={config.MAX_PROTEIN_LENGTH}
        placeholder="Max Length"
      />
    </div>
  </div>

  <!-- Form Actions -->
  <div class="space-x-4">
    <button type="submit" class="btn variant-filled" disabled={!canApplyFilter}
      >Apply</button
    >
    <button
      type="button"
      on:click={handleReset}
      class="btn variant-soft"
      disabled={!canReset}
    >
      Reset (Random)
    </button>
  </div>
</form>
