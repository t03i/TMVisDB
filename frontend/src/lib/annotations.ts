import type { PublicAnnotation } from "$lib/client/model";
import type { Feature, Shapes } from "@nightingale-elements/nightingale-track";
import legendData from '$lib/assets/shared/legend.json';

export const SOURCE_DATABASES = Object.keys(legendData) as (keyof typeof legendData)[];
export type SourceDB = typeof SOURCE_DATABASES[number];

export type DBReference = {
  db_key: SourceDB;
  url: string;
  reference: string;
}

export type DBReferences = Partial<Record<SourceDB, DBReference>>;

export interface AnnotationSet {
  annotations: PublicAnnotation[];
  dbReferences: DBReferences;
}

export type TrackData = Record<SourceDB, Feature[]>;

// Pre-compute the mapping of legend keys to display names
export const KEY_TO_DISPLAY_NAME: Record<string, string> = Object.fromEntries(
  SOURCE_DATABASES.map(key => [key, legendData[key].name || key])
);

// Create a Set of valid database keys for faster lookups
const VALID_DB_KEYS = new Set(SOURCE_DATABASES);

export function annotationsToReferences(annotations: PublicAnnotation[]): DBReferences {
  if (!annotations) return {};

  const references: DBReferences = {};

  for (const annotation of annotations) {
    const sourceDB = annotation.source_db as SourceDB;

    if (VALID_DB_KEYS.has(sourceDB)) {

      if (!references[sourceDB]) {
        references[sourceDB] = {
          db_key: sourceDB,
          url: annotation.source_db_url || '',
          reference: annotation.source_db_ref || ''
        };
      }
    }
  }

  return references;
}

export type DBReferenceViewItem = {
  displayName: string;
  url?: string;
  isPresent: boolean;
};

export function getDBReferenceViewItems(dbReferences: DBReferences): DBReferenceViewItem[] {
  return Object.entries(KEY_TO_DISPLAY_NAME).map(([key, displayName]) => {
    const reference = dbReferences[key as SourceDB] ?? null;
    return {
      displayName,
      url: reference?.url,
      isPresent: !!reference
    };
  });
}

export function getEmptyDBReferenceViewItems(): DBReferenceViewItem[] {
  return Object.values(KEY_TO_DISPLAY_NAME).map(displayName => ({
    displayName,
    isPresent: false
  }));
}


function annotationsToDBMap(annotations: PublicAnnotation[]): Record<SourceDB, PublicAnnotation[]> {


    const tracks: Partial<Record<SourceDB, PublicAnnotation[]>> = {};

    for (const annotation of annotations) {
      const sourceDB = annotation.source_db.toLowerCase() as SourceDB;
      if (SOURCE_DATABASES.includes(sourceDB)) {
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
    tooltipContent: `${annotation.source_db} - ${annotation.label}`,
    sourceDB: annotation.source_db
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
