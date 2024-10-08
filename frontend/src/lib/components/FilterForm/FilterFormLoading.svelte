<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<!-- LoadingCard.svelte -->
<script lang="ts">
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  export let isLoading: boolean;
</script>

<div class="p-4 relative">
  <div class={isLoading ? "pointer-events-none" : ""}>
    <slot></slot>
  </div>
  {#if isLoading}
    <div
      class="rounded-container-token absolute inset-0 bg-surface-100-800-token/50 backdrop-blur-sm flex items-center justify-center"
    >
      <ProgressRadial
        value={undefined}
        stroke={100}
        meter="stroke-primary-500"
        track="stroke-primary-500/30"
        strokeLinecap="butt"
      />
    </div>
  {/if}
</div>
