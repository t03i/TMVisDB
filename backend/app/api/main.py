from fastapi import APIRouter

from .routes import annotations, proteins
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(proteins.router, prefix="/proteins", tags=["proteins"])
api_router.include_router(
    annotations.router, prefix="/annotations", tags=["annotations"]
)


@api_router.get("/", tags=["root"], include_in_schema=False)
async def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}! Find the API docs at /docs."
    }
