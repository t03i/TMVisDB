import { createQuery, type CreateQueryResult, type QueryFunction } from "@tanstack/svelte-query";
import type { PublicAnnotation, AnnotationData, HTTPValidationError } from "$lib/client/model";
import type { AxiosError } from "axios";

export const SOURCE_DATABASES = [
  "UniprotKB",
  "TMAlphaFold",
  "TopDB",
  "Membranome"
] as const;

export type SourceDB = typeof SOURCE_DATABASES[number];

export type DBReference = {
  url: string;
  reference: string;
}

export type DBReferences = Partial<Record<SourceDB, DBReference>>;

export interface AnnotationSet {
  annotations: PublicAnnotation[];
  dbReferences: DBReferences;
}

export function annotationsToReferences(annotations: PublicAnnotation[]): DBReferences {
  if (!annotations) return {};
  const references: DBReferences = {};
  for (const dbName of SOURCE_DATABASES) {
    const db_entry = annotations.find(
      (a) => a.source_db.toLowerCase() === dbName.toLowerCase() && a.source_db_url
    );
    if (db_entry) {
      references[dbName] = {
        url: db_entry.source_db_url || '',
        reference: db_entry.source_db_ref || ''
      };
    }
  }
  return references;
}

type AnnotationQuery = CreateQueryResult<AnnotationData | null, AxiosError | Error| HTTPValidationError>;

export const createCombinedAnnotationsQuery = (
  proteinInfo: { uniprot_accession: string } | null,
  queries: AnnotationQuery[]
): CreateQueryResult<AnnotationSet, Error> => {
  const queryFn: QueryFunction<AnnotationSet> = async () => {
    if (!proteinInfo) {
      throw new Error("Protein information not found");
    }
    try {
      // Wait for all queries to complete
      await Promise.all(queries);

      const allAnnotations: PublicAnnotation[] = queries.flatMap(query =>
        query.data?.annotations ?? []
      );

      if (allAnnotations.length === 0) {
        throw new Error("No annotations found in the database");
      }

      const dbReferences = annotationsToReferences(allAnnotations);
      return { annotations: allAnnotations, dbReferences };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Error fetching annotations: ${errorMessage}`);
    }
  };

  return createQuery<AnnotationSet, Error>({
    queryKey: ["combinedAnnotations", proteinInfo?.uniprot_accession],
    queryFn,
    enabled: !!proteinInfo,
  });
};
