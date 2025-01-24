<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  let className = "";
  export { className as class };
</script>

<div class="display-block card{className}" {...$$restProps}>
  <div class="placeholder mb-2 h-8 w-1/3 animate-pulse" />
  <div class="placeholder mb-4 h-4 w-1/2 animate-pulse" />

  <div class="mt-4 grid grid-cols-2 gap-4">
    <div>
      <div class="placeholder mb-2 h-6 w-1/4 animate-pulse" />
      <div class="placeholder mb-1 h-4 w-3/4 animate-pulse" />
      <div class="placeholder mb-1 h-4 w-2/3 animate-pulse" />
      <div class="placeholder h-4 w-5/6 animate-pulse" />
    </div>

    <div>
      <div class="placeholder mb-2 h-6 w-1/4 animate-pulse" />
      <div class="placeholder h-4 w-1/2 animate-pulse" />
    </div>

    <div class="col-span-2">
      <div class="placeholder mb-2 h-6 w-1/3 animate-pulse" />
      <div class="grid grid-cols-2 gap-2">
        {#each Array(3) as _, i}
          <div class="flex items-center">
            <div class="placeholder mr-2 h-4 w-1/3 animate-pulse" />
            <div class="placeholder h-6 w-12 animate-pulse" />
          </div>
        {/each}
      </div>
    </div>

    <div class="col-span-2">
      <div class="placeholder mb-2 h-6 w-1/3 animate-pulse" />
      <div class="grid grid-cols-2 gap-2">
        <div>
          {#each Array(3) as _, i}
            <div class="placeholder mb-1 h-4 w-3/4 animate-pulse" />
          {/each}
        </div>
        <div class="flex items-start justify-end">
          <div class="w-full max-w-[150px]">
            {#each Array(3) as _, i}
              <div class="placeholder mb-4 h-4 w-full animate-pulse" />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
