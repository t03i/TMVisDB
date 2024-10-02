<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  let className = "";
  export { className as class };
</script>

<div class="display-block {className}" {...$$restProps}>
  <div class="placeholder animate-pulse h-8 w-1/3 mb-2" />
  <div class="placeholder animate-pulse h-4 w-1/2 mb-4" />

  <div class="grid grid-cols-2 gap-4 mt-4">
    <div>
      <div class="placeholder animate-pulse h-6 w-1/4 mb-2" />
      <div class="placeholder animate-pulse h-4 w-3/4 mb-1" />
      <div class="placeholder animate-pulse h-4 w-2/3 mb-1" />
      <div class="placeholder animate-pulse h-4 w-5/6" />
    </div>

    <div>
      <div class="placeholder animate-pulse h-6 w-1/4 mb-2" />
      <div class="placeholder animate-pulse h-4 w-1/2" />
    </div>

    <div class="col-span-2">
      <div class="placeholder animate-pulse h-6 w-1/3 mb-2" />
      <div class="grid grid-cols-2 gap-2">
        {#each Array(3) as _, i}
          <div class="flex items-center">
            <div class="placeholder animate-pulse h-4 w-1/3 mr-2" />
            <div class="placeholder animate-pulse h-6 w-12" />
          </div>
        {/each}
      </div>
    </div>

    <div class="col-span-2">
      <div class="placeholder animate-pulse h-6 w-1/3 mb-2" />
      <div class="grid grid-cols-2 gap-2">
        <div>
          {#each Array(3) as _, i}
            <div class="placeholder animate-pulse h-4 w-3/4 mb-1" />
          {/each}
        </div>
        <div class="flex items-start justify-end">
          <div class="w-full max-w-[150px]">
            {#each Array(3) as _, i}
              <div class="placeholder animate-pulse h-4 w-full mb-4" />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
