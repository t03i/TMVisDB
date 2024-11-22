# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
import random

from sqlalchemy import Select, func, select, and_
from sqlmodel import Session

from .models import (
    ProteinCount,
    Sequence,
    Annotation,
    Organism,
    TMInfo,
    ProteinInfo,
    ProteinFilter,
    TaxonomyFilter,
    ProteinResponse,
)
from .core.config import settings
from .definitions import Topology


def _query_to_protein_info(query_result) -> list[ProteinInfo]:
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


def _query_filter(filter: ProteinFilter):
    conditions = []

    # Topology filter
    if filter.topology:
        if filter.topology == Topology.ALPHA_HELIX:
            conditions.append(TMInfo.has_alpha_helix == True)  # noqa: E712
        elif filter.topology == Topology.BETA_STRAND:
            conditions.append(TMInfo.has_beta_strand == True)  # noqa: E712
        elif filter.topology == Topology.BOTH:
            conditions.append(
                and_(TMInfo.has_alpha_helix == True, TMInfo.has_beta_strand == True)  # type: ignore noqa: E712  # noqa: E712
            )

    # Signal peptide filter
    if filter.has_signal_peptide is not None:
        conditions.append(TMInfo.has_signal == filter.has_signal_peptide)

    # Sequence length filter
    if filter.sequence_length_min is not None or filter.sequence_length_max is not None:
        conditions.append(
            Sequence.seq_length.between(  # type: ignore
                filter.sequence_length_min
                if filter.sequence_length_min is not None
                else settings.MIN_PROTEIN_LENGTH,
                filter.sequence_length_max
                if filter.sequence_length_max is not None
                else settings.MAX_PROTEIN_LENGTH,
            )
        )

    return conditions


def build_base_query(filter: ProteinFilter, for_count: bool = False) -> Select:
    """Build the base query with required joins.

    Args:
        filter: The filter to apply
        for_count: If True, builds an optimized count query joining only IDs
    """
    conditions = _query_filter(filter)

    if for_count:
        query = (
            select(func.count())
            .select_from(Sequence)
            .join(TMInfo, Sequence.id == TMInfo.sequence_id)
            .join(Organism, Sequence.organism_id == Organism.id)
        )
    else:
        query = (
            select(Sequence, TMInfo, Organism)
            .join(TMInfo, Sequence.id == TMInfo.sequence_id)
            .join(Organism, Sequence.organism_id == Organism.id)
        )
    if conditions:
        query = query.where(and_(*conditions))
    return query


def execute_query(
    db: Session,
    query: Select,
    page_size: int | None = None,
    page: int | None = None,
) -> ProteinResponse | None:
    """Execute the query with optional pagination and return ProteinInfo objects."""
    if page is not None and page_size is not None:
        query = query.offset(page_size * page)
    if page_size is not None:
        query = query.limit(page_size)

    result = db.exec(query)
    protein_info = _query_to_protein_info(result)
    return ProteinResponse(items=protein_info) if protein_info else None


def execute_count_query(db: Session, query: Select) -> ProteinCount | None:
    """Execute a count query based on the filter."""
    count: int | None = db.exec(query).scalar()

    return ProteinCount(count=count) if count else None


def get_proteins_by_organism(
    db: Session, organism_id: int, filter: ProteinFilter, count_only: bool = False
) -> ProteinResponse | ProteinCount | None:
    query = build_base_query(filter, for_count=count_only)
    query = query.where(Organism.taxon_id == organism_id)
    return (
        execute_count_query(db, query)
        if count_only
        else execute_query(db, query, filter.page_size, filter.page)
    )


def get_proteins_by_lineage(
    db: Session,
    taxonomy: TaxonomyFilter,
    filter: ProteinFilter,
    count_only: bool = False,
) -> ProteinResponse | ProteinCount | None:
    query = build_base_query(filter, for_count=count_only)
    query = query.where(Organism.super_kingdom == taxonomy.super_kingdom)
    if taxonomy.clade:
        query = query.where(Organism.clade == taxonomy.clade)
    return (
        execute_count_query(db, query)
        if count_only
        else execute_query(db, query, filter.page_size, filter.page)
    )


def get_membrane_annotation_for_id(db: Session, selected_id: str) -> list[Annotation]:
    sequence = (
        db.exec(
            select(Sequence).where(Sequence.uniprot_accession == selected_id)
        ).first()  # type: ignore
    )
    if not sequence:
        return []

    annotations = db.exec(
        select(Annotation).where(Annotation.sequence_id == sequence.id)
    ).all()
    return annotations


def get_random_proteins(db: Session, num_sequences: int) -> ProteinResponse | None:
    max_id = db.exec(select(func.max(Sequence.id))).scalar()

    # Generate a list of random IDs
    random_ids = random.sample(range(1, max_id + 1), min(num_sequences * 2, max_id))

    # Query the database for these random sequences
    query = (
        select(Sequence, TMInfo, Organism)
        .join(TMInfo)
        .join(Organism)
        .filter(Sequence.id.in_(random_ids))  # type: ignore
        .limit(num_sequences)
    )

    result = db.exec(query)
    proteins = _query_to_protein_info(result)

    return ProteinResponse(items=proteins) if proteins else None


def get_protein_by_id(db: Session, uniprot_accession: str) -> ProteinInfo:
    query = (
        select(Sequence, TMInfo, Organism)
        .join(TMInfo)
        .join(Organism)
        .where(Sequence.uniprot_accession == uniprot_accession)  # type: ignore
    )

    result = db.exec(query).first()
    if result is None:
        raise ValueError(f"No protein found with uniprot_accession {uniprot_accession}")

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
    query = select(Sequence.id).where(Sequence.uniprot_accession == uniprot_accession)  # type: ignore
    result = db.exec(query).first()
    return result is not None
