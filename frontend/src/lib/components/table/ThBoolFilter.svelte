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
</script>

<th>
  <SlideToggle
    name="enable-filter"
    active="bg-primary-500"
    size="sm"
    bind:checked={enabled}
    on:change={() => {
      if (!enabled && filterBy) handler.filter("", filterBy);
      if (filterBy) handler.filter(String(value), filterBy);
    }}
  />
  <input
    type="checkbox"
    bind:checked={value}
    class="input"
    disabled={!enabled}
    on:change={() => {
      if (filterBy) handler.filter(String(value), filterBy);
    }}
  />
</th>
