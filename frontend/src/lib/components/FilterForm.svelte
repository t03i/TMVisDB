<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { RadioGroup, RadioItem, SlideToggle } from "@skeletonlabs/skeleton";
  import { Topology } from "$lib/client/model";
  import config from "$lib/config";
  import taxonomyData from "$lib/assets/shared/taxonomies.json";

  type FilterType = "taxa" | "id";

  // Initialize filters with default values
  let filterType: FilterType = "taxa";
  let filterTopology: Topology = Topology.All;
  let filterMinLength = config.MIN_PROTEIN_LENGTH;
  let filterMaxLength = config.MAX_PROTEIN_LENGTH;
  let filterSignalPeptide = true;
  let filterOrganismId = "";
  let filterDomain = "";
  let filterKingdom = "";

  // Compute available clades based on selected domain
  $: availableClades =
    taxonomyData.find((d) => d.value === filterDomain)?.clades || [];

  // Ensure signal peptide filter is enabled when topology is 'All'
  $: if (filterTopology === Topology.All) {
    filterSignalPeptide = true;
  }

  const dispatch = createEventDispatcher();

  // Reset filters to default values
  function resetFilters() {
    filterType = "taxa";
    filterTopology = Topology.All;
    filterMinLength = config.MIN_PROTEIN_LENGTH;
    filterMaxLength = config.MAX_PROTEIN_LENGTH;
    filterSignalPeptide = true;
    filterOrganismId = "";
    filterDomain = "";
    filterKingdom = "";
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
      search_for: filterType,
      topology: filterTopology,
      peptide: String(filterSignalPeptide),
      min: String(filterMinLength),
      max: String(filterMaxLength),
    };

    if (filterType === "id") {
      params.organism_id = filterOrganismId;
    } else {
      params.domain = filterDomain;
      params.kingdom = filterKingdom;
    }

    goto(`?${new URLSearchParams(params).toString()}`);
    dispatch("filter");
  }

  // Initialize filters from URL on mount
  onMount(() => {
    const url = $page.url;
    const params = new URLSearchParams(url.search);

    filterType = (params.get("search_for") as FilterType) || "taxa";
    filterTopology = (params.get("topology") as Topology) || Topology.All;
    filterMinLength = parseInt(
      params.get("min") || String(config.MIN_PROTEIN_LENGTH),
    );
    filterMaxLength = parseInt(
      params.get("max") || String(config.MAX_PROTEIN_LENGTH),
    );
    filterSignalPeptide = params.get("peptide") !== "false";
    filterOrganismId = params.get("organism_id") || "";
    filterDomain = params.get("domain") || "";
    filterKingdom = params.get("kingdom") || "";
  });
</script>

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
  <!-- Filter Type Radio Group -->
  <fieldset>
    <legend class="text-sm font-bold">Search By</legend>
    <RadioGroup class="flex space-x-4">
      <RadioItem name="filter-1" bind:group={filterType} value="taxa"
        >Taxonomy</RadioItem
      >
      <RadioItem name="filter-2" bind:group={filterType} value="id"
        >Organism ID</RadioItem
      >
    </RadioGroup>
  </fieldset>

  {#if filterType === "id"}
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
        bind:value={filterOrganismId}
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
        bind:value={filterDomain}
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
        bind:value={filterKingdom}
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
          bind:group={filterTopology}
          value={Topology.All}>Non-filtered</RadioItem
        >
        <RadioItem
          name="topology-2"
          bind:group={filterTopology}
          value={Topology.Both}>Both Helix and Barrel</RadioItem
        >
        <RadioItem
          name="topology-3"
          bind:group={filterTopology}
          value={Topology["Alpha-helix"]}>Only Alpha-Helices</RadioItem
        >
        <RadioItem
          name="topology-4"
          bind:group={filterTopology}
          value={Topology["Beta-strand"]}>Only Beta-Barrels</RadioItem
        >
      </RadioGroup>
    </fieldset>
  </div>

  <!-- Signal Peptide Slide Toggle -->
  <div class="flex items-center space-x-2">
    <SlideToggle
      name="signal-peptide"
      bind:checked={filterSignalPeptide}
      disabled={filterTopology === Topology.All}
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
        bind:value={filterMinLength}
        min={config.MIN_PROTEIN_LENGTH}
        max={filterMaxLength}
        placeholder="Min Length"
      />
      <span>to</span>
      <input
        type="number"
        class="input"
        bind:value={filterMaxLength}
        min={filterMinLength}
        max={config.MAX_PROTEIN_LENGTH}
        placeholder="Max Length"
      />
    </div>
  </div>

  <!-- Form Actions -->
  <div class="space-x-4">
    <button type="submit" class="btn variant-filled">Apply</button>
    <button type="button" on:click={handleReset} class="btn variant-soft">
      Reset (Random)
    </button>
  </div>
</form>
