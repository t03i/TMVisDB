from fastapi import APIRouter

from .routes import annotations, proteins

api_router = APIRouter()
api_router.include_router(proteins.router, prefix="/proteins", tags=["proteins"])
api_router.include_router(
    annotations.router, prefix="/annotations", tags=["annotations"]
)
