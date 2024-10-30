// Copyright 2024 Tobias Olenyi.
// SPDX-License-Identifier: Apache-2.0

import type { RGB } from "$lib/utils"

export { default as StructureColorSwitcher } from "./StructureColorSwitcher.svelte";
export { default as StructureViewer } from "./StructureViewer.svelte";
export { default as StructureViewerError } from "./StructureViewerError.svelte";
export { default as StructureViewerLoading } from "./StructureViewerLoading.svelte";

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
    color?: RGB;
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
