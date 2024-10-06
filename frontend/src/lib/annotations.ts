import type { PublicAnnotation } from "$lib/client/model";
import type { Feature, Shapes } from "@nightingale-elements/nightingale-track";

export const SOURCE_DATABASES = [
  "UniprotKB",
  "TMAlphaFold",
  "TopDB",
  "Membranome",
  "TMbed"
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

export type TrackData = Record<SourceDB, Feature[]>;

function toDBString(db: SourceDB): string {
  return db.toLowerCase();
}

export function annotationsToReferences(annotations: PublicAnnotation[]): DBReferences {
  if (!annotations) return {};
  const references: DBReferences = {};
  for (const dbName of SOURCE_DATABASES) {
    const db_entry = annotations.find(
      (a) => a.source_db.toLowerCase() === dbName.toLowerCase()
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

function annotationsToDBMap(annotations: PublicAnnotation[]): Record<SourceDB, PublicAnnotation[]> {

    // Create a reverse mapping for quick lookups
    const dbMapping: Record<string, SourceDB> = Object.fromEntries(
      SOURCE_DATABASES.map(db => [toDBString(db), db])
    );

    const tracks: Partial<Record<SourceDB, PublicAnnotation[]>> = {};

    for (const annotation of annotations) {
      const sourceDB = dbMapping[annotation.source_db.toLowerCase()];
      if (sourceDB) {
        if (!tracks[sourceDB]) {
          tracks[sourceDB] = [];
        }
        tracks[sourceDB]!.push(annotation);
      }
    }

      return tracks as Record<SourceDB, PublicAnnotation[]>;
}


function annotationToNightingaleFeature(annotation: PublicAnnotation): Feature {
  return {
    accession: annotation.source_db_ref || annotation.source_db,
    type: annotation.label,
    color: getColorForAnnotation(annotation),
    shape: getShapeForAnnotation(annotation),
    locations: [
      {
        fragments: [
          {
            start: annotation.start,
            end: annotation.end
          }
        ]
      }
    ],
    tooltipContent: `${annotation.label}`,
  };
}

// These functions need to be implemented based on your color and shape mapping logic
function getColorForAnnotation(annotation: PublicAnnotation): string {
  // Implement color logic here
  return 'gray'; // Default color
}

function getShapeForAnnotation(annotation: PublicAnnotation): Shapes {
  // Implement shape logic here
  return 'rectangle'; // Default shape
}

export function annotationsToTracks(annotations: PublicAnnotation[]): TrackData {
  if (!annotations || annotations.length === 0) {
    return {} as TrackData;
  }

  const annotationsByDB = annotationsToDBMap(annotations);
  const tracks: TrackData = {} as TrackData;

  for (const [sourceDB, dbAnnotations] of Object.entries(annotationsByDB)) {
    tracks[sourceDB as SourceDB] = dbAnnotations.map(annotationToNightingaleFeature);
  }

  return tracks;
}
