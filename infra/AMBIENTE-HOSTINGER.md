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

- Rede compartilhada: `rav-network` — backend (FastAPI) e frontend (Next.js) devem entrar nessa rede.
- Volumes persistentes: `pgdata`, `caddy_data`, `caddy_config`.
- URL pública atual: https://srv1539681.hstgr.cloud (placeholder até o deploy da aplicação).

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

1. Deploy do backend FastAPI: adicionar serviço ao compose (rede `rav-network`) e rota no Caddyfile (`api.` ou `/api`).
2. Deploy do frontend Next.js: idem, rota raiz no Caddyfile.
3. Domínio definitivo: a conta tem 1 registro de domínio grátis pendente; ao escolher o nome, apontar DNS A → 187.127.2.94 e atualizar o Caddyfile.
4. Backups: configurar rotina de `pg_dump` (cron) além dos snapshots semanais da Hostinger.
5. Segurança: criar chave SSH e desativar login por senha; considerar restringir a regra SSH ao IP fixo da equipe.
6. Renovação: assinatura do VPS está com auto-renovação desativada — reativar ou agendar lembrete antes de 29/03/2027.

## LGPD (atenção)

O datacenter do VPS deve ser verificado quanto à região; dados de estudantes exigem pseudonimização conforme decisão de produto do MVP (ver memória do projeto). Nenhum dado real deve ser carregado neste ambiente até o plano de segurança estar aprovado.
