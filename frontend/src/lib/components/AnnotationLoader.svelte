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
  import { uniprot_entry_url } from "$lib/external/uniprot";
  import { tmalphafold_entry_url } from "$lib/external/tmAlphaFold";

  export let proteinInfo: any;

  interface AnnotationSet {
    annotations: PublicAnnotation[];
    dbReferences: DBReferences;
  }

  interface CombinedAnnotations {
    [key: string]: PublicAnnotation[];
  }

  let uniprotQuery;
  let tmAlphaFoldQuery;
  let tmvisdbQuery;

  $: if (proteinInfo) {
    uniprotQuery = useUniprotFetchAnnotation(proteinInfo.uniprot_accession);
    tmAlphaFoldQuery = useTmAlphaFoldFetchAnnotation(proteinInfo.uniprot_id);
    tmvisdbQuery = createGetProteinAnnotations(proteinInfo.uniprot_accession);
  }

  const combinedAnnotations = createQuery({
    queryKey: ["combinedAnnotations", proteinInfo?.uniprot_accession],
    queryFn: async (): Promise<AnnotationSet> => {
      if (!proteinInfo) {
        throw new Error("Protein information not found");
      }
      const uniprotAccession = proteinInfo.uniprot_accession;
      const uniprotId = proteinInfo.uniprot_id;

      try {
        // Ensure all queries have completed
        await Promise.all([uniprotQuery, tmAlphaFoldQuery, tmvisdbQuery]);

        const uniprotData = $uniprotQuery.data;
        const tmAlphaFoldData = $tmAlphaFoldQuery.data;
        const tmvisdbData = $tmvisdbQuery.data;

        const allAnnotations: PublicAnnotation[] = [
          ...(uniprotData?.membrane_annotations?.map((a) => ({
            ...a,
            source_db: "UniprotKB",
            source_db_url: uniprot_entry_url(uniprotAccession),
            date_added: new Date().toISOString().split("T")[0],
          })) || []),
          ...(tmAlphaFoldData?.map((a) => ({
            ...a,
            source_db: "TMAlphaFold",
            source_db_url: tmalphafold_entry_url(uniprotId),
            date_added: new Date().toISOString().split("T")[0],
          })) || []),
          ...(tmvisdbData?.data || []),
        ];

        if (allAnnotations.length === 0) {
          throw new Error("No annotations found in the database");
        }

        const dbReferences = annotationsToReferences(allAnnotations);
        return { annotations: allAnnotations, dbReferences };
      } catch (error: any) {
        throw new Error(`Error fetching annotations: ${error.message}`);
      }
    },
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
