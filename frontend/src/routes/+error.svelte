<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->

<script>
  import { emojis } from "$lib/statusEmojis";
  import { page } from "$app/stores";
</script>

<div
  class="text-token grid h-screen w-full grid-cols-1 place-items-center gap-4"
>
  <div class="bg-initial card flex items-center justify-center">
    <header class="card-header justify-center text-9xl">
      {emojis[$page.status] ?? emojis[500]}
    </header>
    <div class="space-y-4 p-4">
      <h3>Error {$page.status} - Oops! Something went wrong.</h3>
      <p class="pre">{$page.error?.message ?? "An unknown error occurred"}</p>
    </div>
  </div>
</div>
