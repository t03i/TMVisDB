import { writable } from 'svelte/store';
import type { RGB } from '$lib/utils';
import type { StructureSelectionQuery } from '$lib/components/StructureViewer';

interface HighlightState {
  residues: StructureSelectionQuery[];
  color: RGB | undefined | null;
  focus?: boolean;
  structureId?: string;
  structureNumber?: number;
}

interface SelectionState {
  residues: StructureSelectionQuery[];
  color: RGB | undefined | null;
  nonSelectedColor: RGB | undefined | null;
  structureId?: string;
  structureNumber?: number;
  keepColors?: boolean;
  keepRepresentations?: boolean;
}

// Highlight store for temporary/hover highlighting of individual regions
function createStructureHighlightStore() {
  const { subscribe, set } = writable<HighlightState | null>(null);

  return {
    subscribe,
    highlight: (
      residues: StructureSelectionQuery[],
      color?: RGB,
      focus?: boolean,
      structureId?: string,
      structureNumber?: number
    ) => {
      set({ residues, color, focus, structureId, structureNumber });
    },
    clear: () => set(null)
  };
}

// Selection store for applying overall coloring theme
function createStructureSelectionStore() {
  const { subscribe, set } = writable<SelectionState | null>(null);

  return {
    subscribe,
    select: (
      residues: StructureSelectionQuery[],
      color?: RGB,
      nonSelectedColor?: RGB,
      structureId?: string,
      structureNumber?: number,
      keepColors?: boolean,
      keepRepresentations?: boolean
    ) => {
      set({
        residues,
        color,
        nonSelectedColor,
        structureId,
        structureNumber,
        keepColors,
        keepRepresentations
      });
    },
    clear: () => set(null)
  };
}

export const structureHighlight = createStructureHighlightStore();
export const structureSelection = createStructureSelectionStore();
