<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
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
</script>

<form>
  <div
    class="input-group grid-cols-[auto_1fr_auto] shadow-lg bg-transparent"
    class:border-error-500-400-token={input_type == UniprotACCType.UNKNOWN}
    class:border-success-400-500-token={input_type != UniprotACCType.UNKNOWN}
    title={input_type == UniprotACCType.UNKNOWN
      ? "Invalid UniprotKB Identifier"
      : input_type == UniprotACCType.UNIPROT_ACCESSION
        ? "Search UniprotKB Accession"
        : "Search UniprotKB Name"}
  >
    <div class=" input-group-shim bg-transparent">
      <iconify-icon icon="mdi:search" height="1em" class="text-surface-300"
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
