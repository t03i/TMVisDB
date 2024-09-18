# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Annotated

from fastapi import APIRouter, HTTPException, Path, Depends
from pydantic import PositiveInt

from ..deps import SessionDep
from app.definitions import Taxonomy
from app.models import ProteinResponse, ProteinInfo, ProteinFilter
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


@router.get("/by-lineage/{lineage}/", response_model=list[ProteinInfo])
def get_proteins_by_lineage(
    session: SessionDep,  # type: ignore
    lineage: Taxonomy,
    filter: Annotated[ProteinFilter, Depends()],
):
    proteins, count = crud.get_proteins_by_lineage(session, lineage, filter)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return ProteinResponse(items=proteins, total_count=count)
