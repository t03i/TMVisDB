<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import type { DataHandler } from "@vincjo/datatables";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { popup } from "@skeletonlabs/skeleton";
  import type { PopupSettings } from "@skeletonlabs/skeleton";

  export let handler: DataHandler;
  export let filterBy: string;

  let value: boolean = true;
  let enabled: boolean = false;

  function updateFilter() {
    if (enabled) {
      handler.filter(String(value), filterBy);
    } else {
      handler.filter("", filterBy);
    }
  }

  function handleToggleChange() {
    updateFilter();
  }

  function handleCheckboxChange() {
    if (enabled) {
      updateFilter();
    }
  }

  const popupHover: PopupSettings = {
    event: "hover",
    target: "popupHover",
    placement: "top",
  };
</script>

<th class="" use:popup={popupHover}>
  <div class="card p-4 variant-filled-secondary" data-popup="popupHover">
    <p>Enable Filter</p>
    <div class="arrow variant-filled-secondary" />
  </div>

  <SlideToggle
    name="enable-filter"
    active="bg-primary-500"
    size="sm"
    bind:checked={enabled}
    on:change={handleToggleChange}
  />
  <input
    type="checkbox"
    bind:checked={value}
    class="checkbox checkbox-sm"
    disabled={!enabled}
    on:change={handleCheckboxChange}
  />
</th>
