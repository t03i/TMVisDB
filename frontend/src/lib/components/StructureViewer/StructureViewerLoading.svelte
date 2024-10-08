<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { ProgressRadial } from "@skeletonlabs/skeleton";
  let className = "";
  export { className as class };
</script>

<div
  class="flex justify-center items-center h-full {className}"
  {...$$restProps}
>
  <ProgressRadial
    value={undefined}
    stroke={100}
    meter="stroke-primary-500"
    track="stroke-primary-500/30"
    strokeLinecap="butt"
    class="justify-self-center "
  />
</div>
