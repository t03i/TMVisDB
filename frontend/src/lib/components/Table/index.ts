// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

export { default as DataTable } from './DataTable.svelte';
export { default as LoadingTable } from './LoadingTable.svelte';
export { default as PaginationFooter } from './PaginationFooter.svelte'

export interface TableHeader<T> {
    key: string;
    title: string;
    sortable: boolean;
    filterable: boolean;
    filterType?: 'text' | 'boolean';
    format: (row: T) => string | HTMLElement;
  }
