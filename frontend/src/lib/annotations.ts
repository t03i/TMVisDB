import legendData from "$lib/assets/shared/legend.json";
import type { PublicAnnotation } from "$lib/client/model";
import type { Feature } from "@nightingale-elements/nightingale-track";

import { convertToRGB, type RGB } from "./utils";
import type { StructureSelectionQuery } from "$lib/components/StructureViewer";

export const SOURCE_DATABASES = Object.keys(
  legendData,
) as (keyof typeof legendData)[];
export type SourceDB = (typeof SOURCE_DATABASES)[number];

export type DBReference = {
  db_key: SourceDB;
  url: string;
  reference: string;
};

export type DBReferences = Partial<Record<SourceDB, DBReference>>;

export interface AnnotationSet {
  annotations: PublicAnnotation[];
  dbReferences: DBReferences;
}

export type TrackData = Record<SourceDB, Feature[]>;

// Pre-compute the mapping of legend keys to display names
export const KEY_TO_DISPLAY_NAME: Record<string, string> = Object.fromEntries(
  SOURCE_DATABASES.map((key) => [key, legendData[key].name || key]),
);

// Create a Set of valid database keys for faster lookups
const VALID_DB_KEYS = new Set(SOURCE_DATABASES);

export function annotationsToReferences(
  annotations: PublicAnnotation[],
): DBReferences {
  if (!annotations) return {};

  const references: DBReferences = {};

  for (const annotation of annotations) {
    const sourceDB = annotation.source_db as SourceDB;

    if (VALID_DB_KEYS.has(sourceDB)) {
      if (!references[sourceDB]) {
        references[sourceDB] = {
          db_key: sourceDB,
          url: annotation.source_db_url || "",
          reference: annotation.source_db_ref || "",
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

export function getDBReferenceViewItems(
  dbReferences: DBReferences,
): DBReferenceViewItem[] {
  return Object.entries(KEY_TO_DISPLAY_NAME).map(([key, displayName]) => {
    const reference = dbReferences[key as SourceDB] ?? null;
    return {
      displayName,
      url: reference?.url,
      isPresent: !!reference,
    };
  });
}

export function getEmptyDBReferenceViewItems(): DBReferenceViewItem[] {
  return Object.values(KEY_TO_DISPLAY_NAME).map((displayName) => ({
    displayName,
    isPresent: false,
  }));
}

function annotationsToDBMap(
  annotations: PublicAnnotation[],
): Record<SourceDB, PublicAnnotation[]> {
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

function dbLabelToCSSVar(sourceDB: SourceDB, labelType: string): string {
  let label = labelType
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9-]/g, "");
  return `--annotation-${sourceDB}-${label}`;
}

function annotationToNightingaleFeature(
  annotation: PublicAnnotation,
): Feature | null {
  const sourceDB = annotation.source_db.toLowerCase() as SourceDB;
  const label = annotation.label;
  const labelDescription =
    legendData[sourceDB]?.labels[label]?.description || "Unknown";

  return {
    accession: `${sourceDB}-${label}-${annotation.start}-${annotation.end}`,
    type: annotation.label,
    color: `var(${dbLabelToCSSVar(sourceDB, label)}, rgba(0, 0, 0, 0))`,
    shape: "rectangle",
    locations: [
      {
        fragments: [
          {
            start: annotation.start,
            end: annotation.end,
          },
        ],
      },
    ],
    tooltipContent: `${labelDescription}`,
    sourceDB: annotation.source_db,
  };
}

export function annotationsToTracks(
  annotations: PublicAnnotation[],
): TrackData {
  if (!annotations || annotations.length === 0) {
    return {} as TrackData;
  }

  const annotationsByDB = annotationsToDBMap(annotations);
  const tracks: TrackData = {} as TrackData;

  for (const [sourceDB, dbAnnotations] of Object.entries(annotationsByDB)) {
    tracks[sourceDB as SourceDB] = dbAnnotations
      .map(annotationToNightingaleFeature)
      .filter((feature): feature is Feature => feature !== null);
  }
  return tracks;
}

export type StructureSelectionData = Record<
  SourceDB,
  {
    label: string;
    query: StructureSelectionQuery;
  }[]
>;

export function annotationToStructureSelection(
  annotations: PublicAnnotation[],
): StructureSelectionData {
  if (!annotations || annotations.length === 0) {
    return {} as StructureSelectionData;
  }

  const annotationsByDB = annotationsToDBMap(annotations);
  const queryMap: Partial<StructureSelectionData> = {};

  for (const [sourceDB, dbAnnotations] of Object.entries(annotationsByDB)) {
    if (!SOURCE_DATABASES.includes(sourceDB as SourceDB)) continue;

    const dbQueries: { label: string; query: StructureSelectionQuery }[] = [];

    for (const annotation of dbAnnotations) {
      const label = annotation.label;
      const labelInfo = legendData[sourceDB]?.labels[label];
      if (!labelInfo) continue;

      dbQueries.push({
        label,
        query: {
          start_residue_number: annotation.start,
          end_residue_number: annotation.end,
          focus: false,
          tooltip: labelInfo.description,
        }
      });
    }

    if (dbQueries.length > 0) {
      queryMap[sourceDB as SourceDB] = dbQueries;
    }
  }
  return queryMap as StructureSelectionData;
}

export class AnnotationStyleManager {
  private styles: Map<string, string> = new Map();
  private theme: "light" | "dark" = "light";
  private element: HTMLElement;

  constructor(element: HTMLElement, theme?: "light" | "dark") {
    this.element = element;
    this.theme = theme || "light";
    this.generateCSSVars();
    this.refresh();
  }

  private generateCSSVars() {
    for (const sourceDB of SOURCE_DATABASES) {
      const labels = legendData[sourceDB].labels;
      for (const label of Object.keys(labels)) {
        this.styles.set(
          `${dbLabelToCSSVar(sourceDB, label)}-dark`,
          labels[label].color_dark,
        );
        this.styles.set(
          `${dbLabelToCSSVar(sourceDB, label)}-light`,
          labels[label].color_light,
        );
      }
    }
    this.updatePointers();
  }

  private updatePointers() {
    for (const sourceDB of SOURCE_DATABASES) {
      const labels = legendData[sourceDB].labels;
      for (const label of Object.keys(labels)) {
        this.styles.set(
          `${dbLabelToCSSVar(sourceDB, label)}`,
          `var(${dbLabelToCSSVar(sourceDB, label)}-${this.theme})`,
        );
      }
    }
  }

  private refresh() {
    let values = [];
    for (let [key, value] of this.styles) {
      values.push(`${key}:${value}`);
    }
    this.element.style.cssText = values.join(";");
  }

  public setTheme(theme: "light" | "dark") {
    this.theme = theme;
    this.updatePointers();
    this.refresh();
  }

  public getColorForLabel(sourceDB: SourceDB, label: string): RGB {
    let cssVarName = dbLabelToCSSVar(sourceDB, label);
    return this.getColorForVar(cssVarName);
  }

  public getColorForVar(cssVarName: string): RGB {
    const color = getComputedStyle(this.element)
      .getPropertyValue(cssVarName)
      .trim();
    return convertToRGB(color);
  }
}
