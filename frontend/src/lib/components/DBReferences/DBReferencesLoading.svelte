<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { SOURCE_DATABASES } from "$lib/annotations";
</script>

<div {...$$restProps}>
  <h3 class="h3 no-wrap">
    <h3 class="h3 no-wrap">Annotation Sources</h3>
  </h3>
  <div class="flex flex-col lg:flex-row gap-4 justify-items-start mt-4">
    {#each SOURCE_DATABASES as dbName}
      <div class="flex mt-1 items-center">
        <span class="mr-2">{dbName} Annotation:</span>
        <span class="placeholder-circle w-16" />
      </div>
    {/each}
  </div>
</div>
