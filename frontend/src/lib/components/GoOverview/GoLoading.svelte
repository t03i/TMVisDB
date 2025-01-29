<!--
 Copyright 2025 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script lang="ts">
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import "iconify-icon";

  let className = "";
  export { className as class };
</script>

<div
  class="flex min-h-full w-full items-center justify-center {className}"
  {...$$restProps}
>
  <div class="w-full">
    <div class="flex justify-end">
      <div class="h-6 w-48 animate-pulse rounded bg-surface-500/30"></div>
    </div>
    <div class="flex justify-center">
      <div class="relative h-64 w-1/3 items-center justify-center">
        {#each Array(8) as _, i}
          <div
            class="absolute animate-pulse rounded-full bg-surface-500/30"
            style="width: {20 + Math.random() * 60}px;
                     height: 20px;
                     left: {Math.random() * 80}%;
                     top: {Math.random() * 80}%;"
          ></div>
        {/each}
      </div>
    </div>
  </div>
</div>
