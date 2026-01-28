<!--
 Copyright 2026 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { onMount } from "svelte";
  import "iconify-icon";
  import type { ProteinInfo } from "$lib/client/model";
  import type { PublicAnnotation } from "$lib/client/model";
  import { generateCSV, generate3Lines } from "$lib/download/generators";
  import { downloadFile, createFilename } from "$lib/download/utils";

  export let proteinInfo: ProteinInfo;
  export let annotations: PublicAnnotation[];

  let dropdownOpen = false;
  let buttonElement: HTMLButtonElement;
  let dropdownElement: HTMLDivElement;

  function handleDownload(format: "csv" | "3lines") {
    try {
      let content: string;
      let mimeType: string;

      if (format === "csv") {
        content = generateCSV(proteinInfo, annotations);
        mimeType = "text/csv";
      } else {
        if (!proteinInfo.sequence) {
          alert("Sequence data is required for .3lines format");
          return;
        }
        content = generate3Lines(proteinInfo, annotations);
        mimeType = "text/plain";
      }

      const filename = createFilename(proteinInfo.uniprot_accession, format);
      downloadFile(content, filename, mimeType);
      dropdownOpen = false;
    } catch (error) {
      console.error("Download failed:", error);
      alert(`Failed to download: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownElement &&
      buttonElement &&
      !dropdownElement.contains(event.target as Node) &&
      !buttonElement.contains(event.target as Node)
    ) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div class="relative inline-block">
  <button
    bind:this={buttonElement}
    on:click={toggleDropdown}
    class="btn"
    aria-haspopup="true"
    aria-expanded={dropdownOpen}
    title="Download annotations"
  >
    <iconify-icon icon="mdi:download" height="1.5em"></iconify-icon>
    <iconify-icon icon="mdi:chevron-down" height="1em" class="ml-1"></iconify-icon>
  </button>

  {#if dropdownOpen}
    <div
      bind:this={dropdownElement}
      class="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-surface-500-500-token bg-surface-100 p-1 shadow-lg dark:bg-surface-800"
      role="menu"
    >
      <button
        class="w-full rounded px-4 py-2 text-left text-sm hover:bg-surface-200 dark:hover:bg-surface-700"
        role="menuitem"
        on:click={() => handleDownload("csv")}
      >
        Download as CSV
      </button>
      <button
        class="w-full rounded px-4 py-2 text-left text-sm hover:bg-surface-200 dark:hover:bg-surface-700"
        role="menuitem"
        on:click={() => handleDownload("3lines")}
      >
        Download as .3lines
      </button>
    </div>
  {/if}
</div>
