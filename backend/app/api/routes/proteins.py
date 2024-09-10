# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Annotated, Optional

from fastapi import APIRouter, HTTPException, Path, Depends
from pydantic import PositiveInt

from ..deps import SessionDep
from app.models import ProteinInfo
import app.crud as crud
from app.core.config import settings
from app.definitions import Kingdom, Domain
from app.utils import ProteinFilter

router = APIRouter()


@router.get("/random/{num_sequences}/", response_model=list[ProteinInfo])
def get_random_proteins(
    session: SessionDep,
    num_sequences: Annotated[
        int,
        Path(
            title="Number of random proteins to select",
            gt=0,
            le=settings.MAX_RESULTS_LIMIT,
        ),
    ],
):
    proteins = crud.get_random_proteins(session, num_sequences)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return proteins


@router.get("/{uniprot_accession}", response_model=ProteinInfo)
def get_protein_by_id(session: SessionDep, uniprot_accession: str):
    protein = crud.get_protein_by_id(session, uniprot_accession)
    if protein is None:
        raise HTTPException(status_code=404, detail="Protein not found")
    return protein


@router.get("/by-organism/{organism_id}/", response_model=list[ProteinInfo])
def get_proteins_by_organism(
    session: SessionDep,
    organism_id: Annotated[PositiveInt, Path(title="Organism ID")],
    filter: ProteinFilter,
):
    proteins = crud.get_proteins_by_organism(session, organism_id, filter)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return proteins


@router.get("/by-lineage/{domain}/{kingdom}/", response_model=list[ProteinInfo])
def get_proteins_by_lineage(
    session: SessionDep,
    domain: Annotated[Domain, Path(..., title="Domain")],
    kingdom: Annotated[Optional[Kingdom], Path(..., title="Kingdom")],
    filter: ProteinFilter,
):
    proteins = crud.get_proteins_by_lineage(session, domain, kingdom, filter)
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return proteins
