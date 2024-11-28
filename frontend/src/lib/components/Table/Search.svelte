<script lang="ts">
  import type { DataHandler } from "@vincjo/datatables";
  export let handler: DataHandler;
  let value: string;
</script>

<input
  class="input w-36 sm:w-64"
  type="search"
  placeholder="Search Page"
  bind:value
  on:input={() => handler.search(value)}
/>
