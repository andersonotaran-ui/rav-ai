"""RAV AI — ponto de entrada da API.

Monolito modular (ADR-001). Cada bounded context registra suas rotas aqui.
Convenções de API: docs/06-apis/apis.md.
"""

from fastapi import FastAPI

app = FastAPI(
    title="RAV AI API",
    version="0.1.0",
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/openapi.json",
)


@app.get("/api/v1/health", tags=["infra"])
async def health() -> dict[str, str]:
    return {"status": "ok"}


# Rotas por contexto (registrar conforme os épicos avançam):
# from src.contextos.identidade.api.rotas import router as identidade_router
# app.include_router(identidade_router, prefix="/api/v1")
