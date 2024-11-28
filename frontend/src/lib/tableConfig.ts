// src/lib/config/tableConfig.ts

import type { ProteinInfo } from "$lib/client/model";
import type { TableHeader } from "$lib/components/Table";
import { uniprot_taxonomy_url } from "$lib/external/uniprot";

export const proteinTableHeaders: TableHeader<ProteinInfo>[] = [
  {
    key: "uniprot_id",
    title: "UniprotKB ID",
    sortable: true,
    filterable: true,
    format: (row) => `<span class='font-semibold'>${row.uniprot_id}</span>`,
  },
  {
    key: "seq_length",
    title: "Sequence Length",
    sortable: true,
    filterable: true,
    format: (row) => row.seq_length.toString(),
  },
  {
    key: "super_kingdom",
    title: "Domain",
    sortable: true,
    filterable: true,
    format: (row) => row.super_kingdom,
  },
  {
    key: "clade",
    title: "Kingdom",
    sortable: true,
    filterable: true,
    format: (row) => row.clade || "",
  },
  {
    key: "name",
    title: "Organism",
    sortable: true,
    filterable: true,
    format: (row) =>
      `<a class="anchor" href="${uniprot_taxonomy_url(row.taxon_id)}">${row.name}</a>`,
  },
  {
    key: "has_alpha_helix",
    title: "Alpha",
    sortable: true,
    filterable: true,
    filterType: "boolean",
    format: (row) => (row.has_alpha_helix ? "Yes" : "No"),
  },
  {
    key: "has_beta_strand",
    title: "Beta",
    sortable: true,
    filterable: true,
    filterType: "boolean",
    format: (row) => (row.has_beta_strand ? "Yes" : "No"),
  },
  {
    key: "has_signal",
    title: "Signal",
    sortable: true,
    filterable: true,
    filterType: "boolean",
    format: (row) => (row.has_signal ? "Yes" : "No"),
  },
  {
    key: "tm_helix_count",
    title: "#Alpha Residues",
    sortable: true,
    filterable: true,
    format: (row) => row.tm_helix_count.toString(),
  },
  {
    key: "tm_strand_count",
    title: "#Beta Residues",
    sortable: true,
    filterable: true,
    format: (row) => row.tm_strand_count.toString(),
  },
  {
    key: "signal_count",
    title: "#Signal Residues",
    sortable: true,
    filterable: true,
    format: (row) => row.signal_count.toString(),
  },
];
