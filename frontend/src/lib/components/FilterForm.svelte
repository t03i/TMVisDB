<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script>
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import { RadioGroup, RadioItem, RangeSlider } from "@skeletonlabs/skeleton";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  import config from "$lib/config";
  import { Topology } from "$lib/client/model";

  $: filterType = "taxa";
  $: topology = Topology.All;
  $: minLength = config.MIN_PROTEIN_LENGTH;
  $: maxLength = config.MAX_PROTEIN_LENGTH;
  $: signalPeptide = true;
  $: filtered = true;

  $: {
    if (topology === Topology.All) {
      signalPeptide = true;
    }
  }

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    const params = {
      lineage,
      topology,
      hasSignalPeptide: signalPeptide,
      sequenceLengthMin: minLength,
      sequenceLengthMax: maxLength,
    };

    // Navigate to the current page with query parameters
    goto(`?${new URLSearchParams(params).toString()}`);

    // Dispatch an event to notify the parent component
    dispatch("filter");
  }
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
      <label class="block text-sm font-bold mb-2" for="organism_id">
        UniprotKB Organism ID
      </label>
      <input
        class="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="organism_id"
        type="number"
        placeholder="Organism ID"
      />
    </div>
  {:else}
    <div>
      <label class="block text-sm font-bold mb-2" for="domain">
        Domain of Life
      </label>
      <input
        class="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="domain"
        type="text"
        placeholder="Domain of Life"
      />
    </div>
    <div>
      <label class="block text-sm font-bold mb-2" for="kingdom">
        Kingdom
      </label>
      <input
        class="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        id="kingdom"
        type="text"
        placeholder="Kingdom"
      />
    </div>
  {/if}
  <div>
    <label class="block text-sm font-bold mb-2" for="topology">
      Structural Topology
    </label>
    <RadioGroup
      id="topology"
      rounded="rounded-container-token"
      flexDirection="flex-col"
    >
      <RadioItem bind:group={topology} name="justify" value={Topology.All}
        >Non-filtered</RadioItem
      >
      <RadioItem
        bind:group={topology}
        name="justify"
        value={Topology["Alpha-helix"]}>Only Alpha-Helices</RadioItem
      >
      <RadioItem
        bind:group={topology}
        name="justify"
        value={Topology["Beta-strand"]}>Only Beta-Barrels</RadioItem
      >
      <RadioItem bind:group={topology} name="justify" value={Topology.Both}
        >Both Helix and Barrel</RadioItem
      >
    </RadioGroup>
  </div>
  <div class="flex items-center space-x-2">
    <SlideToggle
      name="signalPeptide"
      bind:checked={signalPeptide}
      disabled={topology === Topology.All}
      >Show sequences with signal peptides</SlideToggle
    >
  </div>
  <div class="flex items-center space-x-2">
    <RangeSlider
      name="min_length"
      min={config.MIN_PROTEIN_LENGTH}
      max={maxLength}
      step={1}
      bind:value={minLength}
    >
      <div class="flex justify-between items-center">
        <div class="font-bold">Minimum Sequence Length:</div>
        <div class="text-xs">{minLength}</div>
      </div></RangeSlider
    >
  </div>
  <div class="flex items-center space-x-2">
    <RangeSlider
      name="max_length"
      min={minLength}
      max={config.MAX_PROTEIN_LENGTH}
      step={1}
      bind:value={maxLength}
    >
      <div class="flex justify-between items-center">
        <div class="font-bold">Maximum Sequence Length:</div>
        <div class="text-xs">{maxLength}</div>
      </div></RangeSlider
    >
  </div>

  <button type="submit" class="btn variant-filled-primary">Apply</button>
  <button type="button" class="btn variant-filled-secondary"
    >{#if filtered}
      Reset &
    {/if}Random</button
  >
</form>
