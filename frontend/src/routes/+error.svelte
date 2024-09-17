<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script>
  import { emojis } from "$lib/status_emojis.ts";
  import { page } from "$app/stores";
</script>

<div
  class="w-full text-token grid grid-cols-1 gap-4 h-screen place-items-center"
>
  <div class="card bg-initial flex justify-center items-center">
    <header class="card-header justify-center text-9xl">
      {emojis[$page.status] ?? emojis[500]}
    </header>
    <div class="p-4 space-y-4">
      <h3>Error {$page.status} - Oops! Something went wrong.</h3>
      <p class="pre">{$page.error?.message ?? "An unknown error occurred"}</p>
    </div>
  </div>
</div>
