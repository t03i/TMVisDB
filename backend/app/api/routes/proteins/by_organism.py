# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from fastapi import Path
from pydantic import PositiveInt


from app.models import ProteinResponse, ProteinFilter, ProteinRequest, ProteinCount
from app.api.deps import SessionDep
import app.crud as crud

router = APIRouter(prefix="/by-organism", tags=["proteins by organism"])


@router.get("/{organism_id}/", response_model=ProteinResponse)
def get_proteins_by_organism(
    session: SessionDep,  # type: ignore
    organism_id: Annotated[PositiveInt, Path(title="UniprotKB Organism ID")],
    filter: Annotated[ProteinRequest, Depends()],
):
    proteins: ProteinResponse | ProteinCount | None = crud.get_proteins_by_organism(
        session, organism_id, filter
    )
    if proteins is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return proteins


@router.get("/{organism_id}/count", response_model=ProteinCount)
def get_proteins_by_organism_count(
    session: SessionDep,  # type: ignore
    organism_id: Annotated[PositiveInt, Path(title="UniprotKB Organism ID")],
    filter: Annotated[ProteinFilter, Depends()],
):
    count = crud.get_proteins_by_organism(session, organism_id, filter, count_only=True)
    if count is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return count
