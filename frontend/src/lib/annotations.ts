// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import type { PublicAnnotation } from "$lib/client/model";
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
