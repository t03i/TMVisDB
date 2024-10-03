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
