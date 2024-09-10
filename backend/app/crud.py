# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Annotated, Optional
import random

from sqlalchemy import func, select, and_
from sqlmodel import Session
from pydantic import Field, BaseModel, PositiveInt

from . import utils
from .models import Sequence, Annotation, Organism, TMInfo, ProteinInfo, ProteinFilter
from .definitions import Topology, Taxonomy


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
            conditions.append(TMInfo.has_alpha_helix == True)
        elif filter.topology == Topology.BETA_STRAND:
            conditions.append(TMInfo.has_beta_strand == True)
        elif filter.topology == Topology.BOTH:
            conditions.append(
                and_(TMInfo.has_alpha_helix == True, TMInfo.has_beta_strand == True)
            )

    # Signal peptide filter
    if filter.has_signal_peptide is not None:
        conditions.append(TMInfo.has_signal == filter.has_signal_peptide)

    # Sequence length filter
    conditions.append(
        Sequence.seq_length.between(
            filter.sequence_length_min, filter.sequence_length_max
        )
    )

    # Apply all conditions
    if conditions:
        query = query.where(and_(*conditions))

    # Apply limit
    query = query.limit(filter.limit)

    return query


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


def get_random_proteins(db: Session, num_sequences: int):
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

    return _query_to_protein_info(result)


def get_proteins_by_organism(db: Session, organism_id: int, filter: ProteinFilter):
    query = filtered_query(filter)
    query = query.where(Organism.taxon_id == organism_id)
    result = db.execute(query)
    return _query_to_protein_info(result)


def get_proteins_by_lineage(db: Session, taxonomy: Taxonomy, filter: ProteinFilter):
    query = filtered_query(filter)
    super_kingdom, clade = utils.get_separated_taxonomy(taxonomy)
    print(super_kingdom, clade)
    query = query.where(Organism.super_kingdom == super_kingdom)
    if clade:
        query = query.where(Organism.clade == clade)
    result = db.execute(query)
    return _query_to_protein_info(result)
