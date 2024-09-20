# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Annotated, Literal

from fastapi import APIRouter, HTTPException, Path, Depends
from pydantic import PositiveInt, ValidationError

from ..deps import SessionDep
from app.definitions import SUPER_KINGDOM, CLADES, SK_CLADE_MAPPING
from app.models import ProteinResponse, ProteinInfo, ProteinFilter, TaxonomyFilter
from app.core.config import settings
import app.crud as crud

router = APIRouter()


@router.get("/random/{num_sequences}/", response_model=ProteinResponse)
def get_random_proteins(
    session: SessionDep,  # type: ignore
    num_sequences: Annotated[
        int,
        Path(
            title="Number of random proteins to select",
            gt=0,
            le=settings.MAX_RESULTS_LIMIT,
        ),
    ],
):
    proteins, count = crud.get_random_proteins(session, num_sequences)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return ProteinResponse(items=proteins, total_count=count)


@router.get("/{uniprot_accession}", response_model=ProteinInfo)
def get_protein_by_id(session: SessionDep, uniprot_accession: str):  # type: ignore
    protein = crud.get_protein_by_id(session, uniprot_accession)
    if protein is None:
        raise HTTPException(status_code=404, detail="Protein not found")
    return protein


@router.get("/by-organism/{organism_id}/", response_model=ProteinResponse)
def get_proteins_by_organism(
    session: SessionDep,  # type: ignore
    organism_id: Annotated[PositiveInt, Path(title="Organism ID")],
    filter: Annotated[ProteinFilter, Depends()],
):
    proteins, count = crud.get_proteins_by_organism(session, organism_id, filter)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return ProteinResponse(items=proteins, total_count=count)


@router.get("/by-lineage/{super_kingdom}/", response_model=ProteinResponse)
def get_proteins_by_super_kingdom(
    session: SessionDep,  # type: ignore
    super_kingdom: Literal[*SUPER_KINGDOM],
    filter: Annotated[ProteinFilter, Depends()],
):
    try:
        taxonomy_filter = TaxonomyFilter(super_kingdom=super_kingdom)
    except ValidationError:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid super_kingdom. Must be one of: {', '.join(SUPER_KINGDOM)}",
        )
    proteins, count = crud.get_proteins_by_lineage(session, taxonomy_filter, filter)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return ProteinResponse(items=proteins, total_count=count)


@router.get("/by-lineage/{super_kingdom}/{clade}/", response_model=ProteinResponse)
def get_proteins_by_clade(
    session: SessionDep,  # type: ignore
    super_kingdom: Literal[*SUPER_KINGDOM],
    clade: Literal[*CLADES],
    filter: Annotated[ProteinFilter, Depends()],
):
    try:
        taxonomy_filter = TaxonomyFilter(super_kingdom=super_kingdom, clade=clade)
    except ValidationError as e:
        error_messages = []
        error_locs = set(error["loc"][0] for error in e.errors())
        if "super_kingdom" in error_locs:
            error_messages.append(
                f"Invalid super_kingdom. Must be one of: {', '.join(SUPER_KINGDOM)}"
            )
        if "clade" in error_locs:
            error_messages.append(
                f"Invalid clade. Must be one of: {', '.join(SK_CLADE_MAPPING.get(super_kingdom, []))}"
            )

        raise HTTPException(status_code=422, detail=" ".join(error_messages))
    proteins, count = crud.get_proteins_by_lineage(session, taxonomy_filter, filter)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return ProteinResponse(items=proteins, total_count=count)
