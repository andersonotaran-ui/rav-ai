# RAV AI

Plataforma inteligente para elaboração de Registros de Avaliação Formativa (RAV) — SEDF. A IA atua como copiloto pedagógico; a decisão final é sempre do professor.

## Estrutura

```
docs/                   Fonte de verdade (visão, PRD, arquitetura, backlog…)
apps/api/               Backend FastAPI — monolito modular, Clean Architecture
apps/web/               Frontend Next.js (PWA) — scaffold pendente
automations/n8n/        Workflows n8n exportados (ADR-003)
infra/                  Documentação de infraestrutura (VPS Hostinger)
CLAUDE.md               Instruções para desenvolvimento com Claude Code
docker-compose.dev.yml  Postgres + Redis para desenvolvimento local
```

## Começando

Pré-requisitos: Docker, Python 3.12+ com [uv](https://docs.astral.sh/uv/), Node 20+.

```bash
# 1. Infra local
docker compose -f docker-compose.dev.yml up -d

# 2. Backend
cp .env.example apps/api/.env
cd apps/api && uv sync && uv run uvicorn src.main:app --reload
# → http://localhost:8000/api/v1/health

# 3. Frontend (primeira vez — scaffold via Claude Code, story ST do EP-01)
# npx create-next-app@latest apps/web --typescript --tailwind --app
```

## Desenvolvimento

O backlog está em `docs/09-desenvolvimento/backlog.md` (épicos EP-01..14). Ordem: EP-01 → EP-02/03/06 → EP-04/05 → EP-07 → EP-08/09 → EP-10/11 → EP-12/14.

Com Claude Code: abra o terminal na raiz do projeto, rode `claude` e peça uma story por vez (ex.: "Implemente a ST-05.01 conforme o backlog"). O `CLAUDE.md` dá o contexto automaticamente.
