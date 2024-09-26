<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<!-- LoadingCard.svelte -->
<script lang="ts">
  import { ConicGradient } from "@skeletonlabs/skeleton";
  import type { ConicStop } from "@skeletonlabs/skeleton";

  export let isLoading: boolean;

  const conicStops: ConicStop[] = [
    { color: "transparent", start: 0, end: 25 },
    { color: "rgb(var(--color-primary-500))", start: 75, end: 100 },
  ];
</script>

<div class="card border-r-2 p-4 h-screen relative">
  <div class={isLoading ? "pointer-events-none" : ""}>
    <slot></slot>
  </div>
  {#if isLoading}
    <div
      class="rounded-container-token absolute inset-0 bg-surface-100-800-token/50 backdrop-blur-sm flex items-center justify-center"
    >
      <ConicGradient stops={conicStops} spin />
    </div>
  {/if}
</div>
