/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * TMVis
 * OpenAPI spec version: 0.1.0
 */
import type { Topology } from './topology';

export type GetProteinsByOrganismParams = {
topology?: Topology | null;
has_signal_peptide?: boolean | null;
sequence_length_min?: number | null;
sequence_length_max?: number | null;
page?: number | null;
page_size?: number;
};
