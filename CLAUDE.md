# RAV AI — Instruções para o Claude Code

Plataforma de apoio à elaboração de Registros de Avaliação Formativa (RAV) da SEDF. A IA é copiloto do professor: **nunca decide por ele**.

## Fonte de verdade

A documentação em `docs/` é a fonte de verdade. **Nunca invente regras.** Antes de implementar qualquer story, leia os docs relevantes:

| Doc | Conteúdo |
|---|---|
| `docs/00-contexto/` | Fatos e regras oficiais extraídos (SEDF, F1-2024) |
| `docs/02-prd/prd.md` | Requisitos funcionais (RF-nnn) e não funcionais (RNF-nnn) |
| `docs/03-arquitetura/arquitetura-solucao.md` | ADRs 001–007, bounded contexts, estilo arquitetural |
| `docs/04-banco-de-dados/modelo-de-dados.md` | Schema PostgreSQL |
| `docs/05-regras-de-negocio/regras-de-negocio.md` | Regras RN-* (RES, CNT, DOC, SEG, IA, FLX) |
| `docs/06-apis/apis.md` | Convenções REST, erros RFC 9457, SSE, idempotência |
| `docs/07-ux/ux.md` | Telas, editor 3 zonas, UX writing |
| `docs/08-inteligencia-artificial/arquitetura-ia.md` | Pipeline de 8 etapas, zonas, pseudonimização, evals |
| `docs/09-desenvolvimento/backlog.md` | Épicos EP-01..14, stories ST-nn.nn, DoD global |
| `docs/10-testes/plano-de-testes.md` | Estratégia de testes |
| `docs/11-seguranca/seguranca-lgpd.md` | LGPD (dados de crianças), inventário, pendência P-JUR-01 |

Conflito entre documentos → apresente o conflito antes de propor solução.

## Stack

- **Backend:** Python 3.12+, FastAPI, SQLAlchemy 2 (async), Alembic, arq (worker) + Redis, Pydantic v2 — em `apps/api/`
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind, shadcn/ui, PWA com IndexedDB para rascunhos offline — em `apps/web/`
- **Banco:** PostgreSQL 16 + pgvector (extensões `vector` e `uuid-ossp`)
- **IA:** Claude (primário) e OpenAI (fallback) via abstração de provider — nunca acople a um provedor
- **Automações periféricas:** n8n (workflows exportados em `automations/n8n/`), nunca acessa o banco diretamente
- **Dev local:** `docker-compose.dev.yml` (Postgres + Redis)

## Arquitetura (inegociável)

Monolito modular (ADR-001) com Clean Architecture por bounded context em `apps/api/src/contextos/`: `identidade`, `estrutura_escolar`, `estudantes`, `observacoes`, `rav` (núcleo), `ia`, `normas`, `auditoria` + `compartilhado/` (kernel).

Cada contexto: `domain/` (entidades, regras — não importa nada externo) → `application/` (casos de uso via ports/interfaces) → `infrastructure/` (adapters: repositórios, LLM, PDF) → `api/` (rotas FastAPI). Comunicação entre contextos por eventos de domínio, nunca import direto de outro contexto (exceto `compartilhado`).

Convenções de API: REST JSON sob `/api/v1`; JWT 15min + refresh httpOnly; **escopo por vínculo aplicado no repositório** (ADR-006) — 404, não 403, para recursos fora do vínculo; erros RFC 9457 com `regra` + `mensagem_humana`; paginação por cursor; `Idempotency-Key` em POST de geração/exportação; SSE para streaming de geração (ADR-002).

## Segurança e LGPD (bloqueante)

Dados de **crianças** (LGPD art. 14) em documento de fé pública. Regras invioláveis:

1. **Nenhum dado identificado de estudante sai para LLM externa.** Todo payload passa pelo módulo `ia/pseudonimizacao` (dicionário determinístico + NER). Teste de vazamento no CI é obrigatório.
2. Observações socioemocionais nascem internas (🔒), cifradas, e nunca entram em geração.
3. Trilha de auditoria é append-only — nenhum UPDATE/DELETE.
4. Versões de RAV nunca sobrescrevem — sempre nova `rav_versao`.
5. Sem PII em logs (verificação automatizada).
6. Toda sugestão de IA tem proveniência registrada (`professor` / `ia` / `ia_editada`) e exige aceite explícito do professor.

## Fluxo de trabalho

1. Trabalhe **uma story por vez**, na ordem do backlog (EP-01 → EP-02/03/06 → EP-04/05 → EP-07 → EP-08/09 → EP-10/11 → EP-12/14; EP-13 em paralelo).
2. Todo PR/commit cita RF/RN/ST que implementa.
3. TDD onde fizer sentido; testes unitários + contrato sempre. DoD global em `docs/09-desenvolvimento/backlog.md` §4.
4. Migração de banco sempre com rollback testado.
5. Mudou prompt/modelo/regra de IA → evals precisam passar (gate).
6. Commits pequenos e frequentes; mensagens em português, imperativas.
7. UX writing em pt-BR, tom respeitoso com o professor (docs/07-ux §6.2).

## Comandos (após scaffold)

```bash
docker compose -f docker-compose.dev.yml up -d   # Postgres + Redis locais
cd apps/api && uv sync && uv run uvicorn src.main:app --reload
cd apps/web && npm install && npm run dev
```

## Ambiente de produção

VPS Hostinger com stack Docker `rav-ai` (Postgres+pgvector, Caddy) — detalhes em `infra/AMBIENTE-HOSTINGER.md`. Deploy de app ainda não configurado.
