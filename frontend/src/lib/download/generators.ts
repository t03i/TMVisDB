// Copyright 2026 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import legendData from "$lib/assets/shared/legend.json";
import type { PublicAnnotation } from "$lib/client/model";
import type { ProteinInfo } from "$lib/client/model";
import type { SourceDB } from "$lib/annotations";

/**
 * Groups annotations by their source database
 */
function groupAnnotationsBySource(
  annotations: PublicAnnotation[],
): Record<SourceDB, PublicAnnotation[]> {
  const grouped: Partial<Record<SourceDB, PublicAnnotation[]>> = {};

  for (const annotation of annotations) {
    const sourceDB = annotation.source_db.toLowerCase() as SourceDB;
    if (!grouped[sourceDB]) {
      grouped[sourceDB] = [];
    }
    grouped[sourceDB]!.push(annotation);
  }

  return grouped as Record<SourceDB, PublicAnnotation[]>;
}

/**
 * Escapes a CSV field value
 */
function escapeCSVField(value: string | number): string {
  const stringValue = String(value);
  // If the value contains comma, quote, or newline, wrap it in quotes and escape quotes
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

/**
 * Gets the description for a label from a source database
 */
function getLabelDescription(sourceDB: SourceDB, label: string): string {
  const sourceLabels = legendData[sourceDB]?.labels;
  if (sourceLabels && label in sourceLabels) {
    return sourceLabels[label as keyof typeof sourceLabels].description || label;
  }
  return label;
}

/**
 * Generates CSV content with annotation regions
 * @param proteinInfo - Protein information including UniProt ID
 * @param annotations - Array of annotations from all sources
 * @returns CSV string with columns: uniprot_id, source, label, start, end, description, length
 */
export function generateCSV(
  proteinInfo: ProteinInfo,
  annotations: PublicAnnotation[],
): string {
  if (!annotations || annotations.length === 0) {
    // Return header only if no annotations
    return "uniprot_id,source,label,start,end,description,length\n";
  }

  const csvRows: string[] = [];
  // Add header
  csvRows.push("uniprot_id,source,label,start,end,description,length");

  const uniprotId = proteinInfo.uniprot_accession;

  for (const annotation of annotations) {
    const source = annotation.source_db.toLowerCase();
    const label = annotation.label;
    const start = annotation.start;
    const end = annotation.end;
    const length = end - start + 1;
    const description = getLabelDescription(source as SourceDB, label);

    csvRows.push(
      [
        escapeCSVField(uniprotId),
        escapeCSVField(source),
        escapeCSVField(label),
        escapeCSVField(start),
        escapeCSVField(end),
        escapeCSVField(description),
        escapeCSVField(length),
      ].join(","),
    );
  }

  return csvRows.join("\n");
}

/**
 * Generates .3lines format content (TMbed Format 4 style)
 * Creates separate entries for each annotation source
 * @param proteinInfo - Protein information including sequence and UniProt ID
 * @param annotations - Array of annotations from all sources
 * @returns .3lines format string with multiple entries (one per source)
 */
export function generate3Lines(
  proteinInfo: ProteinInfo,
  annotations: PublicAnnotation[],
): string {
  if (!proteinInfo.sequence) {
    throw new Error("Protein sequence is required for .3lines format");
  }

  const sequence = proteinInfo.sequence;
  const sequenceLength = sequence.length;
  const uniprotAccession = proteinInfo.uniprot_accession;
  const uniprotId = proteinInfo.uniprot_id;

  // Group annotations by source
  const annotationsBySource = groupAnnotationsBySource(annotations);
  const entries: string[] = [];

  // Get source display names from legend
  const getSourceDisplayName = (sourceDB: SourceDB): string => {
    return legendData[sourceDB]?.name || sourceDB;
  };

  // Process each source separately
  for (const [sourceDB, sourceAnnotations] of Object.entries(annotationsBySource)) {
    if (sourceAnnotations.length === 0) continue;

    // Initialize per-residue array with default label 'i' (inside)
    const topologyLabels: string[] = new Array(sequenceLength).fill("i");

    // Apply annotations for this source
    for (const annotation of sourceAnnotations) {
      const start = Math.max(0, annotation.start - 1); // Convert to 0-indexed
      const end = Math.min(sequenceLength - 1, annotation.end - 1); // Convert to 0-indexed, inclusive

      // Validate bounds
      if (start >= 0 && end < sequenceLength && start <= end) {
        const label = annotation.label;
        // Set labels for the annotation range
        for (let i = start; i <= end; i++) {
          topologyLabels[i] = label;
        }
      }
    }

    // Create the three lines for this source
    const sourceDisplayName = getSourceDisplayName(sourceDB as SourceDB);
    const header = `>${uniprotAccession}|${uniprotId} - ${sourceDisplayName}`;
    const topologyLine = topologyLabels.join("");

    entries.push(header);
    entries.push(sequence);
    entries.push(topologyLine);
  }

  // Join entries with blank lines between sources
  return entries.join("\n");
}
