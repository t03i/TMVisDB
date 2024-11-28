# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from pydantic import ValidationError


from app.models import (
    ProteinResponse,
    ProteinFilter,
    ProteinRequest,
    ProteinCount,
    TaxonomyFilter,
)
from app.api.deps import SessionDep
import app.crud as crud
from app.taxonomy_enums import SuperKingdom, Clade, SK_CLADE_MAPPING


router = APIRouter(prefix="/by-lineage", tags=["proteins by lineage"])


def _get_taxonomy_filter(super_kingdom: SuperKingdom, clade: Clade | None = None):
    # Validate super_kingdom first
    if super_kingdom not in SuperKingdom:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid super_kingdom. Must be one of: {', '.join(SuperKingdom)}",
        )

    # Then validate clade if provided
    if clade and clade not in SK_CLADE_MAPPING.get(super_kingdom, []):
        raise HTTPException(
            status_code=422,
            detail=f"Invalid clade for {super_kingdom}. Must be one of: {', '.join(SK_CLADE_MAPPING.get(super_kingdom, []))}",
        )

    try:
        taxonomy_filter = TaxonomyFilter(super_kingdom=super_kingdom, clade=clade)
    except ValidationError as e:
        error_messages = []
        error_locs = set(error["loc"][0] for error in e.errors())
        if "super_kingdom" in error_locs:
            error_messages.append(
                f"Invalid super_kingdom. Must be one of: {', '.join(SuperKingdom)}"
            )
        if "clade" in error_locs:
            error_messages.append(
                f"Invalid clade. Must be one of: {', '.join(SK_CLADE_MAPPING.get(super_kingdom, []))}"
            )
        raise HTTPException(status_code=422, detail=" ".join(error_messages))
    return taxonomy_filter


def _get_proteins_by_lineage(
    session: SessionDep,
    super_kingdom: SuperKingdom,
    clade: Clade | None,
    filter: ProteinRequest | ProteinFilter,
    count_only: bool = False,
):
    taxonomy_filter = _get_taxonomy_filter(super_kingdom, clade)
    result = crud.get_proteins_by_lineage(
        session, taxonomy_filter, filter, count_only=count_only
    )
    if result is None:
        raise HTTPException(status_code=404, detail="No proteins found")
    return result


@router.get("/{super_kingdom}/", response_model=ProteinResponse)
def get_proteins_by_super_kingdom(
    session: SessionDep,  # type: ignore
    super_kingdom: SuperKingdom,
    filter: Annotated[ProteinRequest, Depends()],
):
    return _get_proteins_by_lineage(session, super_kingdom, None, filter)


@router.get("/{super_kingdom}/count", response_model=ProteinCount)
def get_proteins_by_super_kingdom_count(
    session: SessionDep,  # type: ignore
    super_kingdom: SuperKingdom,
    filter: Annotated[ProteinFilter, Depends()],
):
    return _get_proteins_by_lineage(
        session, super_kingdom, None, filter, count_only=True
    )


@router.get("/{super_kingdom}/{clade}/", response_model=ProteinResponse)
def get_proteins_by_clade(
    session: SessionDep,  # type: ignore
    super_kingdom: SuperKingdom,
    clade: Clade,
    filter: Annotated[ProteinRequest, Depends()],
):
    return _get_proteins_by_lineage(session, super_kingdom, clade, filter)


@router.get("/{super_kingdom}/{clade}/count", response_model=ProteinCount)
def get_proteins_by_clade_count(
    session: SessionDep,  # type: ignore
    super_kingdom: SuperKingdom,
    clade: Clade,
    filter: Annotated[ProteinFilter, Depends()],
):
    return _get_proteins_by_lineage(
        session, super_kingdom, clade, filter, count_only=True
    )
