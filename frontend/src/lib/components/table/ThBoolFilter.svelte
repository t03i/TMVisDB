<script lang="ts">
  import type { DataHandler } from "@vincjo/datatables";

  export let handler: DataHandler;
  export let filterBy: string;

  let selectedValue = "";

  function updateFilter() {
    handler.filter(selectedValue, filterBy);
  }
</script>

<th>
  <select
    bind:value={selectedValue}
    on:change={updateFilter}
    class="select-sm select"
  >
    <option value="">Any</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
</th>
