# Copyright 2024 Tobias Olenyi.
# SPDX-License-Identifier: Apache-2.0
from typing import Optional

from fastapi import APIRouter, HTTPException

from app import utils
from app.models import AnnotationLegend
from app.definitions import DatabaseType

router = APIRouter()

@router.get("/legends/", response_model=dict[str,AnnotationLegend])
def get_db_annotations_legends():
    legends = {}
    for db_name in DatabaseType:
        legends[db_name] = utils.get_database_legend(db_name)

    return legends


@router.get("/legend/{db_name}", response_model=AnnotationLegend)
def get_annotation_legend_for_db(db_name: DatabaseType):
    legend = utils.get_database_legend(db_name)
    if legend is None:
        raise HTTPException(status_code=404, detail="No legend found")
    return legend

@router.get('/taxonomies/', response_model=dict[str,Optional[list[str]]])
def get_taxonomies():
    return utils.get_all_taxonomies()
