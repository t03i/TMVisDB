import { writable, get, type Writable, type Readable, derived} from 'svelte/store';
import type { RGB } from '$lib/utils';
import type { AnnotationStyleManager, SourceDB } from '$lib/annotations';

export interface HighlightState {
  residues: StructureSelectionQuery[];
  color: RGB | undefined | null;
  focus?: boolean;
  structureId?: string;
  structureNumber?: number;
}

export interface SelectionState {
  residues: LabeledSelectionQuery[];
  color?: RGB | undefined | null;
  nonSelectedColor?: RGB | undefined | null;
  structureId?: string;
  structureNumber?: number;
  keepColors?: boolean;
  keepRepresentations?: boolean;
}

export interface StructureSelectionQuery {
  auth_seq_id?: number;
  entity_id?: string;
  auth_asym_id?: string;
  struct_asym_id?: string;
  residue_number?: number;
  start_residue_number?: number;
  end_residue_number?: number;
  auth_residue_number?: number;
  auth_ins_code_id?: string;
  start_auth_residue_number?: number;
  start_auth_ins_code_id?: string;
  end_auth_residue_number?: number;
  end_auth_ins_code_id?: string;
  atoms?: string[];
  label_comp_id?: string;
  color?: RGB | undefined | null;
  sideChain?: boolean;
  representation?: string;
  representationColor?: any;
  focus?: boolean;
  tooltip?: string;
  start?: number;
  end?: number;
  atom_id?: number[];
  uniprot_accession?: string;
  uniprot_residue_number?: number;
  start_uniprot_residue_number?: number;
  end_uniprot_residue_number?: number;
}

export interface LabeledSelectionQuery extends StructureSelectionQuery {
  label: string;
}


export class StructureViewerState {
  private highlight: Writable<HighlightState | null>;
  private selection: Writable<SelectionState | null>;
  private activeSelectionSource: Writable<SourceDB | null>;
  private annotationStyle: AnnotationStyleManager;

   public readonly highlightStore: Readable<HighlightState | null>;
   public readonly selectionStore: Readable<SelectionState | null>;

  constructor(annotationStyle: AnnotationStyleManager) {
    this.highlight = writable(null);
    this.selection = writable(null);
    this.activeSelectionSource = writable(null);
    this.annotationStyle = annotationStyle;
    this.highlightStore = derived(this.highlight, $highlight => $highlight);
    this.selectionStore = derived(this.selection, $selection => $selection);

  }

  public setHighlight(residues: StructureSelectionQuery[],  focus?: boolean) {
    this.highlight.set({ residues, color: this.annotationStyle.getSelectionColor(), focus, structureId: undefined, structureNumber: undefined });
  }

  public clearHighlight() {
    this.highlight.set(null);
  }

  private colorAnnotations(residues: LabeledSelectionQuery[], sourceDB: SourceDB) {
    return residues.map((annotation) => (
      {
        ...annotation,
        color: this.annotationStyle.getColorForLabel(sourceDB, annotation.label)
      }
    ));
  }

  public setSelection(residues: LabeledSelectionQuery[], sourceDB: SourceDB, keepColors?: boolean, keepRepresentations?: boolean) {
    const selection: SelectionState = { residues: residues, color: undefined, nonSelectedColor: undefined, structureId: undefined, structureNumber: undefined, keepColors, keepRepresentations };
    this.activeSelectionSource.set(sourceDB);
    this.setSelectionWithColors(selection);
  }

  public updateColors() {
    const currentSelection = get(this.selection);
    this.setSelectionWithColors(currentSelection);
  }

  private setSelectionWithColors(sel: SelectionState | null) {
    const sourceDB = get(this.activeSelectionSource);
    if (sel && sourceDB) {
      const coloredAnnotations = this.colorAnnotations(sel.residues, sourceDB);
      const neutralColor = this.annotationStyle.getNeutralColor();
      this.selection.set({ residues: coloredAnnotations, color: sel.color, nonSelectedColor: neutralColor, structureId: sel.structureId, structureNumber: sel.structureNumber, keepColors: sel.keepColors, keepRepresentations: sel.keepRepresentations });
    }
  }

  public clearSelection() {
    this.selection.set(null);
  }


}
