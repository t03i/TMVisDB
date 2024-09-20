/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * TMVis
 * OpenAPI spec version: 0.1.0
 */
import type { ProteinInfoClade } from './proteinInfoClade';

export interface ProteinInfo {
  clade: ProteinInfoClade;
  has_alpha_helix: boolean;
  has_beta_strand: boolean;
  has_signal: boolean;
  name: string;
  seq_length: number;
  sequence: string;
  signal_count: number;
  signal_percent: number;
  super_kingdom: string;
  taxon_id: string;
  tm_helix_count: number;
  tm_helix_percent: number;
  tm_strand_count: number;
  tm_strand_percent: number;
  uniprot_accession: string;
  uniprot_id: string;
}
