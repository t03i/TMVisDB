// Copyright 2026 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import type { SourceDB } from "$lib/annotations";

/**
 * Label mapping to unified TMbed format (Format 4 style)
 * Maps database-specific labels to the unified format: B, H, S, i, o, .
 */
export const LABEL_MAPPINGS: Record<SourceDB, Record<string, string>> = {
  tmbed: {
    // Already in unified format - no mapping needed
    'H': 'H', 'h': 'h', 'B': 'B', 'b': 'b',
    'i': 'i', 'o': 'o', 'S': 'S', '.': '.'
  },
  topdb: {
    'X': 'S',  // Signal peptide
    'M': 'H',  // Membrane (assume alpha-helix, no strand info)
    'I': 'i',  // Inside
    'O': 'o',  // Outside
  },
  membranome: {
    'AH': 'H', // Alpha-helix (no directionality)
    'I': 'i',  // Inside
    'O': 'o',  // Outside
  },
  uniprot: {
    'AH': 'H', // Alpha-Helix
    'BS': 'B', // Beta-Sheet (assume Beta-strand)
  },
  tmalphafold: {
    'AH': 'H', // Alpha-Helix
    'BS': 'B', // Beta-Sheet
  }
};

/**
 * Maps a label from a source database to the unified TMbed format
 * @param sourceDb - The source database identifier
 * @param label - The original label from the source database
 * @returns The mapped label in unified format, or '.' if unknown
 */
export function mapLabelToUnified(sourceDb: SourceDB, label: string): string {
  const mapping = LABEL_MAPPINGS[sourceDb];
  return mapping?.[label] ?? '.';  // Default to '.' if unknown
}
