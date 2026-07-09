# RAV AI — Ambiente Hostinger

> Provisionado em 06/07/2026 via API Hostinger (MCP). Atualize este documento a cada mudança de infra.

## VPS

| Item | Valor |
|---|---|
| ID | 1539681 |
| Plano | KVM 2 (2 vCPU, 8 GB RAM, 100 GB disco) |
| SO | Ubuntu 24.04 LTS |
| Hostname | srv1539681.hstgr.cloud |
| IPv4 | 187.127.2.94 |
| IPv6 | 2a02:4780:6e:24e::1 |
| Assinatura | expira em 29/03/2027 (auto-renovação DESATIVADA) |

## Firewall (rav-ai-firewall, ID 324034)

Política padrão: bloquear tudo. Regras de entrada:

| Porta | Protocolo | Origem |
|---|---|---|
| 22 | SSH | any |
| 80 | HTTP | any |
| 443 | HTTPS | any |

PostgreSQL (5432) **não** é exposto externamente — acessível apenas pela rede interna Docker (`rav-network`).

## Stack Docker (projeto `rav-ai`)

| Serviço | Imagem | Função |
|---|---|---|
| postgres | pgvector/pgvector:pg16 | Banco principal + embeddings (extensões `vector` e `uuid-ossp` já criadas) |
| caddy | caddy:2 | Proxy reverso com HTTPS automático (Let's Encrypt) |
| n8n | docker.n8n.io/n8nio/n8n:latest | Automações periféricas (nunca acessa o Postgres da aplicação diretamente — regra do projeto) |

- Rede compartilhada: `rav-network` — backend (FastAPI) e frontend (Next.js) devem entrar nessa rede quando forem implantados.
- Volumes persistentes: `pgdata`, `caddy_data`, `caddy_config`, `n8n_data` (storage próprio do n8n, isolado do banco da aplicação).
- URL pública atual: https://srv1539681.hstgr.cloud (placeholder até o deploy do backend/frontend).
- n8n: https://srv1539681.hstgr.cloud/n8n/ (rota `handle_path /n8n/*` no Caddyfile), protegido por Basic Auth (usuário `admin`, senha em `N8N_BASIC_AUTH_PASSWORD` na env do projeto Docker) + conta owner própria do n8n. `N8N_ENCRYPTION_KEY` também definida na env do projeto — não perder, criptografa credenciais salvas nos workflows.

### Como editar o compose deste projeto

A API da Hostinger **não tem endpoint para editar o compose existente** — `VPS_updateProjectV1` apenas re-faz `pull`/recria com o compose já salvo, ignorando novo conteúdo. Para mudar o compose é preciso usar `VPS_createNewProjectV1` com o mesmo `project_name` (`rav-ai`): ele substitui o projeto mas **preserva os volumes** (dados do Postgres e do n8n não se perdem).

## CI/CD e imagens da aplicação (backend/frontend)

Repositório: `github.com/andersonotaran-ui/rav-ai` (privado).

| App | Diretório | Dockerfile | Imagem publicada |
|---|---|---|---|
| Backend (FastAPI) | `apps/api` | `apps/api/Dockerfile` (multi-stage com `uv`, non-root, healthcheck em `/api/v1/health`) | `ghcr.io/andersonotaran-ui/rav-ai-api` |
| Frontend (Next.js) | `apps/web` | `apps/web/Dockerfile` (multi-stage, build `standalone`, non-root, healthcheck em `/api/health`) | `ghcr.io/andersonotaran-ui/rav-ai-web` |

Workflow `.github/workflows/docker-publish.yml`: builda e publica (tags `latest` + sha curto) em push na `main` que toque em `apps/api/**` ou `apps/web/**`.

**Pendência bloqueante para o deploy dessas duas imagens na VPS:** a Hostinger não oferece acesso SSH/terminal — o deploy só faz `pull` das imagens do compose, sem suporte a login em registry privado. Como o repo é privado, os pacotes GHCR nascem privados. Solução adotada: tornar os pacotes `rav-ai-api` e `rav-ai-web` **públicos** (Settings do pacote no GitHub → Change visibility) — expõe só a imagem compilada, não o código-fonte. Até isso ser confirmado, os serviços `api`/`web` ainda não foram adicionados ao compose da VPS.

Estado em 07/07/2026: scaffold do Next.js, os dois Dockerfiles e o workflow já estão no repo (commit `4c399c6`). Falta confirmar (1) que o workflow rodou com sucesso e (2) visibilidade pública dos pacotes, para então atualizar o compose da VPS com os serviços `api` e `web` roteados no Caddy (`/api/*` → FastAPI, `/` → Next.js).

## Banco de dados

| Item | Valor |
|---|---|
| Host (interno) | `postgres` (dentro da rede rav-network) |
| Porta | 5432 |
| Database | ravai |
| Usuário | ravai |
| Senha | definida como variável de ambiente `POSTGRES_PASSWORD` do projeto Docker (visível no hPanel > VPS > Docker Manager > rav-ai) |

Connection string (para o backend, dentro da rede Docker):

```
postgresql://ravai:<POSTGRES_PASSWORD>@postgres:5432/ravai
```

## Próximos passos

1. Confirmar sucesso do workflow `docker-publish.yml` e tornar públicos os pacotes `rav-ai-api`/`rav-ai-web` no GHCR (ver seção CI/CD acima).
2. Deploy do backend FastAPI: adicionar serviço `api` ao compose da VPS (rede `rav-network`, imagem `ghcr.io/andersonotaran-ui/rav-ai-api:latest`) e rota `/api/*` no Caddyfile.
3. Deploy do frontend Next.js: idem, serviço `web` com imagem `ghcr.io/andersonotaran-ui/rav-ai-web:latest`, rota raiz no Caddyfile.
4. Domínio definitivo: a conta tem 1 registro de domínio grátis pendente; ao escolher o nome, apontar DNS A → 187.127.2.94 e atualizar o Caddyfile.
5. Backups: configurar rotina de `pg_dump` (cron) além dos snapshots semanais da Hostinger.
6. Segurança: criar chave SSH e desativar login por senha; considerar restringir a regra SSH ao IP fixo da equipe.
7. Renovação: assinatura do VPS está com auto-renovação desativada — reativar ou agendar lembrete antes de 29/03/2027.

## LGPD (atenção)

O datacenter do VPS deve ser verificado quanto à região; dados de estudantes exigem pseudonimização conforme decisão de produto do MVP (ver memória do projeto). Nenhum dado real deve ser carregado neste ambiente até o plano de segurança estar aprovado.
