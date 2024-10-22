<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { page } from "$app/stores";

  import "iconify-icon";
  import type { DataHandler } from "@vincjo/datatables";

  import type { TableHeader } from "$lib/components/Table";
  import config from "$lib/config";

  export let data: Record<string, any>[];
  export let headers: TableHeader<any>[];
  export let currentPage: number = 1;

  function convertToCSV(data: any[], headers: TableHeader<any>[]): string {
    const csvRows = [];

    // Add the headers
    csvRows.push(headers.map((header) => header.title).join(","));

    // Add the data
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header.key]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  }

  function downloadCSV(data: string, filename: string) {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function filenameFromFilter() {
    const params = new URLSearchParams($page.url.searchParams);
    const filterInfo = params.toString() ? `-${params.toString()}` : "random";
    const filename = `${config.APP_NAME}-data-${filterInfo}-${currentPage}.csv`;
    return filename;
  }

  function handleDownload() {
    const csv = convertToCSV(data, headers);
    const filename = filenameFromFilter();
    downloadCSV(csv, filename);
  }
</script>

<button on:click={handleDownload} class="btn">
  <iconify-icon icon="material-symbols:download" height="1.5em"></iconify-icon>
</button>
