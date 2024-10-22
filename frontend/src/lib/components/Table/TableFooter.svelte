<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import RowCount from "./RowCount.svelte";
  import Pagination from "./Pagination.svelte";

  export let currentPage: number;
  export let pageSize: number;
  export let totalItems: number;
  export let onSetPage: (page: number) => void;
</script>

<footer class="flex justify-between px-3 pb-3">
  <RowCount {currentPage} {pageSize} {totalItems} />
  <Pagination {currentPage} {pageSize} {totalItems} {onSetPage} />
</footer>
