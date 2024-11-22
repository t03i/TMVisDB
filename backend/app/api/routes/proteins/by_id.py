# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from fastapi import APIRouter, HTTPException

from app.models import ProteinInfo, ProteinExistence
from app.api.deps import SessionDep
import app.crud as crud

router = APIRouter(tags=["protein lookup"])


@router.get("/{uniprot_accession}", response_model=ProteinInfo)
def get_protein_by_id(session: SessionDep, uniprot_accession: str):
    protein = crud.get_protein_by_id(session, uniprot_accession)
    if protein is None:
        raise HTTPException(status_code=404, detail="Protein not found")
    return protein


@router.get("/exists/{uniprot_accession}", response_model=ProteinExistence)
def check_protein_exists(session: SessionDep, uniprot_accession: str):
    exists = crud.check_protein_exists(session, uniprot_accession)
    return ProteinExistence(exists=exists)
