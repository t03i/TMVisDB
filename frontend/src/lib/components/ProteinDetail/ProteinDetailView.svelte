<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import "iconify-icon";
  import type { ProteinInfo } from "$lib/client/model";
  import {
    uniprot_entry_url,
    uniprot_taxonomy_url,
  } from "$lib/external/uniprot";

  export let proteinInfo: ProteinInfo;

  let className = "";
  export { className as class };
</script>

<div class="display-block {className}" {...$$restProps}>
  {#if proteinInfo}
    <div class="flex flex-col gap-4">
      <!-- UniProt Information Card -->
      <section class="card p-4">
        <h2 class="h2">{proteinInfo.uniprot_id}</h2>
        <p class="text-sm">
          UniProt Accession:
          <a
            href={uniprot_entry_url(proteinInfo.uniprot_accession)}
            class="anchor"
            target="_blank"
            rel="noopener"
          >
            {proteinInfo.uniprot_accession}
            <iconify-icon icon="line-md:external-link"></iconify-icon>
          </a>
        </p>

        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 class="h3">Taxonomy</h3>
            <p class="text-sm">Super Kingdom: {proteinInfo.super_kingdom}</p>
            {#if proteinInfo.clade}
              <p class="text-sm">Clade: {proteinInfo.clade}</p>
            {/if}
            <p class="text-sm">
              Taxon Name:
              <a
                href={uniprot_taxonomy_url(proteinInfo.taxon_id)}
                class="anchor"
                target="_blank"
                rel="noopener"
                >{proteinInfo.name} ({proteinInfo.taxon_id})
                <iconify-icon icon="line-md:external-link"></iconify-icon>
              </a>
            </p>
          </div>

          <div>
            <h3 class="h3">Sequence</h3>
            <p class="text-sm">Length: {proteinInfo.seq_length}</p>
          </div>
        </div>
      </section>

      <!-- TMbed Summary Card -->
      <section class="card p-4">
        <h2 class="h3 mb-2">TMbed Summary</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <h3 class="h4">Structure Features</h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex items-center">
                <span class="mr-2">Alpha Helix:</span>
                <span
                  class="badge variant-filled-{proteinInfo.has_alpha_helix
                    ? 'success'
                    : 'error'}"
                >
                  {proteinInfo.has_alpha_helix ? "Yes" : "No"}
                </span>
              </div>
              <div class="flex items-center">
                <span class="mr-2">Beta Barrel:</span>
                <span
                  class="badge variant-filled-{proteinInfo.has_beta_strand
                    ? 'success'
                    : 'error'}"
                >
                  {proteinInfo.has_beta_strand ? "Yes" : "No"}
                </span>
              </div>
              <div class="flex items-center">
                <span class="mr-2">Signal:</span>
                <span
                  class="badge variant-filled-{proteinInfo.has_signal
                    ? 'success'
                    : 'error'}"
                >
                  {proteinInfo.has_signal ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          <div class="col-span-2">
            <h3 class="h4">Detailed Counts</h3>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <p class="text-sm">
                  TM Helix: {proteinInfo.tm_helix_count} ({proteinInfo.tm_helix_percent.toFixed(
                    2,
                  )}%)
                </p>
                <p class="text-sm">
                  TM Strand: {proteinInfo.tm_strand_count} ({proteinInfo.tm_strand_percent.toFixed(
                    2,
                  )}%)
                </p>
                <p class="text-sm">
                  Signal: {proteinInfo.signal_count} ({proteinInfo.signal_percent.toFixed(
                    2,
                  )}%)
                </p>
              </div>
              <div class="items-star flex justify-end">
                <div class="w-full max-w-[150px]">
                  <ProgressBar
                    value={proteinInfo.tm_helix_percent}
                    max={1}
                    label="TM Helix"
                    class="mb-4"
                  />
                  <ProgressBar
                    value={proteinInfo.tm_strand_percent}
                    max={1}
                    class="mb-4"
                    label="TM Strand"
                  />
                  <ProgressBar
                    value={proteinInfo.signal_percent}
                    max={1}
                    label="Signal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  {/if}
</div>
