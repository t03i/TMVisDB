// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0
import { createQuery, type  DefinedCreateQueryResult } from "@tanstack/svelte-query";
import type { PublicAnnotation } from "$lib/client/model";
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
  console.log(references, annotations);
  return references;
}

type AnnotationQuery = DefinedCreateQueryResult<PublicAnnotation[] | null, AxiosError>;

export function createCombinedAnnotationsQuery(proteinInfo: any, queries: AnnotationQuery[]) {
  return createQuery({
    queryKey: ["combinedAnnotations", proteinInfo?.uniprot_accession],
    queryFn: async (): Promise<AnnotationSet> => {
      if (!proteinInfo) {
        throw new Error("Protein information not found");
      }

      try {
        // Ensure all queries have completed
        await Promise.all(queries);

        const allAnnotations: PublicAnnotation[] = queries.flatMap(query =>
          query.data ? query.data.filter((annotation): annotation is PublicAnnotation => annotation !== null) : []
        );

        if (allAnnotations.length === 0) {
          throw new Error("No annotations found in the database");
        }

        const dbReferences = annotationsToReferences(allAnnotations);
        return { annotations: allAnnotations, dbReferences };
      } catch (error: any) {
        throw new Error(`Error fetching annotations: ${error.message}`);
      }
    },
    enabled: !!proteinInfo,
  });
}
