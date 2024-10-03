<script lang="ts">
  import type { CreateQueryResult } from "@tanstack/svelte-query";
  import type { ProteinInfo } from "$lib/client/model";
  import { createGetUniprotAnnotation } from "$lib/external/uniprot";
  import { createGetTMAlphaFoldAnnotation } from "$lib/external/tmAlphaFold";
  import { createGetProteinAnnotations } from "$lib/client/tmvisdb";
  import {
    type AnnotationSet,
    createCombinedAnnotationsQuery,
  } from "$lib/annotations";

  export let proteinInfo: ProteinInfo;

  let annotationsQuery: CreateQueryResult<AnnotationSet, Error>;

  $: uniprotQuery = proteinInfo
    ? createGetUniprotAnnotation(proteinInfo.uniprot_accession)
    : null;
  $: tmAlphaFoldQuery = proteinInfo
    ? createGetTMAlphaFoldAnnotation(proteinInfo.uniprot_id)
    : null;
  $: tmvisdbQuery = proteinInfo
    ? createGetProteinAnnotations(proteinInfo.uniprot_accession)
    : null;

  $: if (proteinInfo && uniprotQuery && tmAlphaFoldQuery && tmvisdbQuery) {
    annotationsQuery = createCombinedAnnotationsQuery(proteinInfo, [
      uniprotQuery,
      tmAlphaFoldQuery,
      tmvisdbQuery,
    ]);
  }
</script>

<slot {annotationsQuery}></slot>
