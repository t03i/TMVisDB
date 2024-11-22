# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0

from fastapi import APIRouter
from .random import router as random_router
from .by_id import router as id_router
from .by_organism import router as organism_router
from .by_lineage import router as lineage_router

router = APIRouter(prefix="/proteins")

router.include_router(random_router)
router.include_router(id_router)
router.include_router(organism_router)
router.include_router(lineage_router)
