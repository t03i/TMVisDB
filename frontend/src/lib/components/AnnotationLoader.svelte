<!--
 Copyright 2024 Tobias Olenyi.
 SPDX-License-Identifier: Apache-2.0
-->
<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import type { PublicAnnotation } from "$lib/client/model";
  import { useUniprotFetchAnnotation } from "$lib/external/uniprot";
  import { useTmAlphaFoldFetchAnnotation } from "$lib/external/tmAlphaFold";
  import { createGetProteinAnnotations } from "$lib/client/tmvisdb";
  import {
    annotationsToReferences,
    type DBReferences,
    type SourceDB,
  } from "$lib/annotations";

  export let uniprotId: string;

  interface AnnotationSet {
    annotations: PublicAnnotation[];
    dbReferences: DBReferences;
  }

  interface CombinedAnnotations {
    [key: string]: PublicAnnotation[];
  }

  const uniprotQuery = useUniprotFetchAnnotation(uniprotId);
  const tmAlphaFoldQuery = useTmAlphaFoldFetchAnnotation(uniprotId);
  const tmvisdbQuery = createGetProteinAnnotations(uniprotId);

  export const combinedAnnotations = createQuery({
    queryKey: ["combinedAnnotations", uniprotId],
    queryFn: async (): Promise<AnnotationSet> => {
      const [uniprotData, tmAlphaFoldData, tmvisdbData] = await Promise.all([
        $uniprotQuery.data,
        $tmAlphaFoldQuery.data,
        $tmvisdbQuery.data?.data,
      ]);

      const allAnnotations: PublicAnnotation[] = [
        ...(uniprotData?.membrane_annotations.map((a) => ({
          ...a,
          source_db: "UniprotKB",
          source_db_url: `https://www.uniprot.org/uniprotkb/${uniprotId}`,
          date_added: new Date().toISOString().split("T")[0],
        })) || []),
        ...(tmAlphaFoldData?.map((a) => ({
          ...a,
          source_db: "TMAlphaFold",
          source_db_url: `https://tmalphafold.ttk.hu/entry/${uniprotId}`,
          date_added: new Date().toISOString().split("T")[0],
        })) || []),
        ...(tmvisdbData || []),
      ];

      if (allAnnotations.length === 0) {
        throw new Error("No annotations found in the database");
      }

      const dbReferences = annotationsToReferences(allAnnotations);

      return { annotations: allAnnotations, dbReferences };
    },
    enabled:
      $uniprotQuery.isSuccess &&
      $tmAlphaFoldQuery.isSuccess &&
      $tmvisdbQuery.isSuccess,
  });

  $: annotationsBySource = $combinedAnnotations.data
    ? $combinedAnnotations.data.annotations.reduce(
        (acc: CombinedAnnotations, annotation) => {
          const sourceDb = annotation.source_db as SourceDB;
          if (!acc[sourceDb]) {
            acc[sourceDb] = [];
          }
          acc[sourceDb].push(annotation);
          return acc;
        },
        {},
      )
    : {};

  $: dbReferences = $combinedAnnotations.data?.dbReferences || {};
</script>

<slot annotationQuery={combinedAnnotations} {annotationsBySource} {dbReferences}
></slot>
