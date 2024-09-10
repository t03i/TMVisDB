# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

import random

from sqlalchemy import func, select, Session

from .models import Sequence, Annotation, Organism, TMInfo

SEQUENCE_INFO = [
    Sequence.uniprot_id,
    Sequence.uniprot_accession,
    Sequence.seq_length,
    Organism.name,
    Organism.taxon_id,
    Organism.super_kingdom,
    Organism.clade,
    TMInfo.has_alpha_helix,
    TMInfo.has_beta_strand,
    TMInfo.has_signal,
    TMInfo.tm_helix_count,
    TMInfo.tm_strand_count,
    TMInfo.signal_count,
]


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
        select(*SEQUENCE_INFO)
        .join(TMInfo)
        .join(Organism)
        .filter(Sequence.id.in_(random_ids))
        .limit(num_sequences)
    )

    result = db.execute(query)
    return result.fetchall()
