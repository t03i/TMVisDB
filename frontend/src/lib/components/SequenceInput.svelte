<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { goto } from "$app/navigation";

  import {
    uniprot_get_input_type,
    UniprotACCType,
    UniprotACCTypeNameMap,
  } from "$lib/external/uniprot";
  import "iconify-icon";

  let identifier: string;
  let input_type: UniprotACCType = UniprotACCType.UNKNOWN;

  $: if (identifier) {
    input_type = uniprot_get_input_type(identifier);
  } else {
    input_type = UniprotACCType.UNKNOWN;
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    goto(`?${new URLSearchParams({ search: identifier }).toString()}`);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div
    class="input-group grid-cols-[auto_1fr_auto] bg-transparent shadow-lg"
    class:border-error-500-400-token={input_type == UniprotACCType.UNKNOWN}
    class:border-success-500-400-token={input_type != UniprotACCType.UNKNOWN}
    title={input_type == UniprotACCType.UNKNOWN
      ? "Invalid UniprotKB Identifier"
      : `Search for ${UniprotACCTypeNameMap[input_type]}`}
  >
    <div class=" input-group-shim bg-transparent">
      <iconify-icon
        icon="material-symbols:search"
        height="1em"
        class="text-surface-300"
      ></iconify-icon>
    </div>
    <input
      type="search"
      id="sequence-search"
      placeholder="UniprotKB Name | UniprotKB Acession"
      bind:value={identifier}
      required
    />
    <button
      type="submit"
      class="variant-filled-primary"
      disabled={input_type == UniprotACCType.UNKNOWN}
    >
      <iconify-icon icon="mdi:arrow-right" height="1.5em"></iconify-icon>
    </button>
  </div>
</form>
