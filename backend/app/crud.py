# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
import random

from sqlalchemy import func, select, and_
from sqlmodel import Session

from .models import (
    Sequence,
    Annotation,
    Organism,
    TMInfo,
    ProteinInfo,
    ProteinFilter,
    TaxonomyFilter,
)
from .core.config import settings
from .definitions import Topology


def _query_to_protein_info(query_result):
    protein_infos = []
    for row in query_result:
        # Create a combined dictionary from all three Pydantic models
        combined_dict = {
            **row.Sequence.model_dump(),
            **row.TMInfo.model_dump(),
            **row.Organism.model_dump(),
        }

        # Construct ProteinInfo from the combined dictionary
        protein_info = ProteinInfo.model_validate(combined_dict)
        protein_infos.append(protein_info)

    return protein_infos


def filtered_query(filter: ProteinFilter):
    query = select(Sequence, TMInfo, Organism).join(TMInfo).join(Organism)

    conditions = []

    # Topology filter
    if filter.topology:
        if filter.topology == Topology.ALPHA_HELIX:
            conditions.append(TMInfo.has_alpha_helix == True)  # noqa: E712
        elif filter.topology == Topology.BETA_STRAND:
            conditions.append(TMInfo.has_beta_strand == True)  # noqa: E712
        elif filter.topology == Topology.BOTH:
            conditions.append(
                and_(TMInfo.has_alpha_helix == True, TMInfo.has_beta_strand == True)  # noqa: E712
            )

    # Signal peptide filter
    if filter.has_signal_peptide is not None:
        conditions.append(TMInfo.has_signal == filter.has_signal_peptide)

    # Sequence length filter
    if filter.sequence_length_min is not None or filter.sequence_length_max is not None:
        conditions.append(
            Sequence.seq_length.between(
                filter.sequence_length_min
                if filter.sequence_length_min is not None
                else settings.MIN_PROTEIN_LENGTH,
                filter.sequence_length_max
                if filter.sequence_length_max is not None
                else settings.MAX_PROTEIN_LENGTH,
            )
        )

    # Apply all conditions
    if conditions:
        query = query.where(and_(*conditions))

    return query


def get_paginated_proteins_with_count(
    db: Session, base_query, page_size: int, page: int | None
):
    # count_query = select(func.count()).select_from(base_query.subquery())
    # total_count = db.execute(count_query).scalar()
    total_count = page_size

    query = base_query.limit(page_size)

    if page is not None:
        offset = page_size * page
        query = query.offset(offset)

    result = db.execute(query)
    proteins = _query_to_protein_info(result)
    return proteins, total_count


def get_membrane_annotation_for_id(db: Session, selected_id: str) -> list[Annotation]:
    sequence = (
        db.query(Sequence).filter(Sequence.uniprot_accession == selected_id).first()
    )
    if not sequence:
        return None

    annotations = (
        db.query(Annotation).filter(Annotation.sequence_id == sequence.id).all()
    )
    return annotations


def get_random_proteins(
    db: Session, num_sequences: int
) -> tuple[list[ProteinInfo], int]:
    max_id = db.query(func.max(Sequence.id)).scalar()

    # Generate a list of random IDs
    random_ids = random.sample(range(1, max_id + 1), min(num_sequences * 2, max_id))

    # Query the database for these random sequences
    query = (
        select(Sequence, TMInfo, Organism)
        .join(TMInfo)
        .join(Organism)
        .filter(Sequence.id.in_(random_ids))
        .limit(num_sequences)
    )

    result = db.execute(query)
    proteins = _query_to_protein_info(result)

    return proteins, len(proteins)


def get_proteins_by_organism(
    db: Session, organism_id: int, filter: ProteinFilter
) -> tuple[list[ProteinInfo], int]:
    query = filtered_query(filter)
    query = query.where(Organism.taxon_id == organism_id)

    return get_paginated_proteins_with_count(db, query, filter.page_size, filter.page)


def get_proteins_by_lineage(
    db: Session, taxonomy: TaxonomyFilter, filter: ProteinFilter
) -> tuple[list[ProteinInfo], int]:
    query = filtered_query(filter)
    query = query.where(Organism.super_kingdom == taxonomy.super_kingdom)
    if taxonomy.clade:
        query = query.where(Organism.clade == taxonomy.clade)

    return get_paginated_proteins_with_count(db, query, filter.page_size, filter.page)


def get_protein_by_id(db: Session, uniprot_accession: str) -> ProteinInfo:
    query = (
        select(Sequence, TMInfo, Organism)
        .join(TMInfo)
        .join(Organism)
        .where(Sequence.uniprot_accession == uniprot_accession)
    )

    result = db.execute(query).first()

    if result is None:
        return None

    # Create a combined dictionary from all three Pydantic models
    combined_dict = {
        **result.Sequence.model_dump(),
        **result.TMInfo.model_dump(),
        **result.Organism.model_dump(),
    }

    # Construct ProteinInfo from the combined dictionary
    protein_info = ProteinInfo.model_validate(combined_dict)

    return protein_info


def check_protein_exists(db: Session, uniprot_accession: str) -> bool:
    query = select(Sequence.id).where(Sequence.uniprot_accession == uniprot_accession)
    result = db.execute(query).first()
    return result is not None
