<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script>
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  $: filterType = "taxa";
  $: topology = "all";
</script>

<form class="space-y-6">
  <RadioGroup class="flex space-x-4">
    <RadioItem bind:group={filterType} name="justify" value={"taxa"}
      >Taxonomy</RadioItem
    >
    <RadioItem bind:group={filterType} name="justify" value={"id"}
      >Organism ID</RadioItem
    >
  </RadioGroup>

  {#if filterType === "id"}
    <div>
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="organism_id"
      >
        UniprotKB Organism ID
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="organism_id"
        type="number"
        placeholder="Organism ID"
      />
    </div>
  {:else}
    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="domain">
        Domain of Life
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="domain"
        type="text"
        placeholder="Domain of Life"
      />
    </div>
    <div>
      <label class="block text-gray-700 text-sm font-bold mb-2" for="kingdom">
        Kingdom
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="kingdom"
        type="text"
        placeholder="Kingdom"
      />
    </div>
  {/if}

  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" for="topology">
      Structural Topology
    </label>
    <RadioGroup
      id="topology"
      rounded="rounded-container-token"
      flexDirection="flex-col"
    >
      <RadioItem bind:group={topology} name="justify" value={"all"}
        >Non-filtered</RadioItem
      >
      <RadioItem bind:group={topology} name="justify" value={"alpha"}
        >Only Alpha-Helices</RadioItem
      >
      <RadioItem bind:group={topology} name="justify" value={"beta"}
        >Only Beta-Barrels</RadioItem
      >
      <RadioItem bind:group={topology} name="justify" value={"both"}
        >Both Helix and Barrel</RadioItem
      >
    </RadioGroup>
  </div>

  <div class="flex items-center space-x-2">
    <SlideToggle id="signalPeptide"
      >Show sequences with signal peptides</SlideToggle
    >
  </div>

  <button type="button" class="btn variant-filled-primary">Apply</button>
</form>
