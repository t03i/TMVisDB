<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { get } from "svelte/store";
  import type { CreateQueryResult } from "@tanstack/svelte-query";
  import type { ProteinCount, HTTPValidationError } from "$lib/client/model";

  import RowCount from "./RowCount.svelte";
  import Pagination from "./Pagination.svelte";
  import type { Pagination as PaginationType } from "$lib/stores/DataQueryStore";

  export let pageSize: number;
  export let loadedRows: number;
  export let pagination: PaginationType | null;
  export let countQuery: CreateQueryResult<
    ProteinCount,
    HTTPValidationError
  > | null;
  $: currentPage = pagination ? get(pagination.currentPage) : 1;
</script>

<div class="flex justify-between px-3 pb-3">
  <RowCount {currentPage} {pageSize} {countQuery} {loadedRows} />
  <Pagination {pagination} />
</div>
