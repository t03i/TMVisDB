<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import type { DataHandler } from "@vincjo/datatables";
  import { SlideToggle } from "@skeletonlabs/skeleton";

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
</script>

<th class=" items-center">
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
