<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { PublicAnnotation } from "$lib/client/model";
  import { createGetUniprotAnnotation } from "$lib/external/uniprot";
  import { CreateGetTMAlphaFoldAnnotation } from "$lib/external/tmAlphaFold";
  import { createGetProteinAnnotations } from "$lib/client/tmvisdb";
  import {
    annotationsToReferences,
    type DBReferences,
    type SourceDB,
    createCombinedAnnotationsQuery,
  } from "$lib/annotations";

  export let proteinInfo: any;

  interface AnnotationSet {
    annotations: PublicAnnotation[];
    dbReferences: DBReferences;
  }

  interface CombinedAnnotations {
    [key: string]: PublicAnnotation[];
  }

  $: uniprotQuery = proteinInfo
    ? createGetUniprotAnnotation(proteinInfo.uniprot_accession)
    : null;
  $: tmAlphaFoldQuery = proteinInfo
    ? CreateGetTMAlphaFoldAnnotation(proteinInfo.uniprot_id)
    : null;
  $: tmvisdbQuery = proteinInfo
    ? createGetProteinAnnotations(proteinInfo.uniprot_accession)
    : null;

  $: combinedAnnotations = createCombinedAnnotationsQuery($proteinInfo, [
    $uniprotQuery,
    $tmAlphaFoldQuery,
    $tmvisdbQuery,
  ]);
</script>

<slot annotationQuery={combinedAnnotations}></slot>
