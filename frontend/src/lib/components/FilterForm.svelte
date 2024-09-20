<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  import { Topology } from "$lib/client/model";
  import config from "$lib/config";
  import taxonomyData from "$lib/assets/shared/taxonomies.json";

  type FilterType = "taxa" | "id";
  let filterType: FilterType;
  let filterTopology: Topology;

  $: filterType = "taxa";
  $: filterTopology = Topology.All;
  $: filterMinLength = config.MIN_PROTEIN_LENGTH;
  $: filterMaxLength = config.MAX_PROTEIN_LENGTH;
  $: filterSignalPeptide = true;
  $: filterOrganismId = "";
  $: filterDomain = "";
  $: filterKingdom = "";
  $: availableClades =
    taxonomyData.find((d) => d.value === filterDomain)?.clades || [];

  $: {
    if (filterTopology === Topology.All) {
      filterSignalPeptide = true;
    }
  }

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    const params: Record<string, string> = {
      search_for: filterType,
      topology: filterTopology,
      peptide: String(filterSignalPeptide),
      min: String(filterMinLength),
      max: String(filterMaxLength),
    };

    if (filterType === "id") {
      params.organism_id = String(filterOrganismId);
    } else {
      params.domain = filterDomain;
      params.kingdom = filterKingdom;
    }

    // Navigate to the current page with query parameters
    goto(`?${new URLSearchParams(params).toString()}`);

    // Dispatch an event to notify the parent component
    dispatch("filter");
  }
</script>

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
  <RadioGroup class="space-x-4" display="flex">
    <RadioItem bind:group={filterType} name="justify" value={"taxa"}
      >Taxonomy</RadioItem
    >
    <RadioItem bind:group={filterType} name="justify" value={"id"}
      >Organism ID</RadioItem
    >
  </RadioGroup>

  {#if filterType === "id"}
    <div>
      <label class="block text-sm font-bold mb-2" for="organism_id">
        UniprotKB Organism ID
      </label>
      <input
        class="input py-2 px-3 leading-tight"
        id="organism_id"
        type="number"
        placeholder="Enter Organism ID"
        bind:value={filterOrganismId}
        required
      />
    </div>
  {:else}
    <div>
      <label class="block text-sm font-bold mb-2" for="domain">
        Domain of Life
      </label>
      <select
        class="select py-2 px-3 leading-tight"
        bind:value={filterDomain}
        required
      >
        <option value="">Select Domain</option>
        {#each taxonomyData as { value }}
          <option {value}> {value}</option>
        {/each}
      </select>
    </div>
    <div>
      <label class="block text-sm font-bold mb-2" for="kingdom">
        Kingdom
      </label>
      <select
        size="4"
        class="select py-2 px-3 leading-tight"
        bind:value={filterKingdom}
      >
        <option value="">All</option>
        {#each availableClades as value}
          <option {value}> {value}</option>
        {/each}
      </select>
    </div>
  {/if}

  <div>
    <label class="block text-sm font-bold mb-2" for="topology">
      Structural Topology
    </label>
    <RadioGroup
      id="topology"
      rounded="rounded-container-token"
      class="grid grid-cols-2 gap-4"
    >
      <RadioItem bind:group={filterTopology} name="justify" value={Topology.All}
        >Non-filtered</RadioItem
      >
      <RadioItem
        bind:group={filterTopology}
        name="justify"
        value={Topology.Both}>Both Helix and Barrel</RadioItem
      >
      <RadioItem
        bind:group={filterTopology}
        name="justify"
        value={Topology["Alpha-helix"]}>Only Alpha-Helices</RadioItem
      >
      <RadioItem
        bind:group={filterTopology}
        name="justify"
        value={Topology["Beta-strand"]}>Only Beta-Barrels</RadioItem
      >
    </RadioGroup>
  </div>

  <div class="flex items-center space-x-2">
    <SlideToggle
      name="signalPeptide"
      bind:checked={filterSignalPeptide}
      disabled={filterTopology === Topology.All}
      >Show sequences with signal peptides</SlideToggle
    >
  </div>

  <div class="space-y-4">
    <label class="block text-sm font-bold" for="sequence-length"
      >Sequence Length Range</label
    >
    <div class="flex items-center space-x-4">
      <input
        type="number"
        name="min_length"
        class="input"
        bind:value={filterMinLength}
        min={config.MIN_PROTEIN_LENGTH}
        max={filterMaxLength}
        placeholder="Min Length"
      />
      <span>to</span>
      <input
        type="number"
        name="max_length"
        class="input"
        bind:value={filterMaxLength}
        min={filterMinLength}
        max={config.MAX_PROTEIN_LENGTH}
        placeholder="Max Length"
      />
    </div>
  </div>

  <div class="flex space-x-4">
    <button type="submit" class="btn variant-filled">Apply</button>
  </div>
</form>
