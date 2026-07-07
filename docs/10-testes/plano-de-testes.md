# 10 — Plano de Testes · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Depende de:** 02-PRD §10 (critérios de aceite) · 05-RNs · 08-IA §8 (evals) · 09-Backlog (DoD)
**Princípio:** a pirâmide clássica vale para o software; a IA tem trilha própria de avaliação (evals) com gates de release. Documento de fé pública ⇒ tolerância zero a erro silencioso.

---

## 1. Estratégia por camada

| Camada | Escopo | Ferramentas | Gate |
|--------|--------|-------------|------|
| Unitários | Domínio: máquina de estados, matriz RN-RES-003, regras de bloco/ano, pseudonimizador | pytest | PR |
| Contrato/API | Endpoints 06-APIs: schemas, erros RFC 9457, paginação, idempotência | pytest + schemathesis (fuzzing sobre OpenAPI) | PR |
| Integração | Repositórios, triggers de imutabilidade (I-06), auditoria append-only, fila/worker | pytest + Postgres/Redis em containers | PR |
| E2E | Fluxos F-01..F-07 do PRD | Playwright (desktop + viewport mobile) | pré-release |
| Evals de IA | 08-IA §8 | suite própria + corpora versionados | mudança de prompt/modelo/regra |
| Não funcionais | carga, resiliência, acessibilidade, segurança | k6, axe-core, OWASP ZAP | pré-release / contínuo |
| Usabilidade | testes moderados com professores | protótipo M0, piloto M1 | gates de fase |

## 2. Matrizes funcionais críticas

### 2.1 Resultado Final (RN-RES-003) — teste de tabela exaustivo

Dimensões: ano_escolar (1..5) × resultado (6) × perfil (regular, SuperaÇão G1/G2/G3, temporalidade) × faltas (≤25%, >25%). ~180 combinações geradas parametricamente; cada célula espera `aceito`, `rejeitado(regra)` ou `alerta`. Casos-sentinela:

| Caso | Esperado |
|------|----------|
| 2º ano + Aprovado | 422 RN-RES-003 (progressão continuada é o correto) |
| 5º ano + faltas 26% + Aprovado | alerta RN-RES-004; exige justificativa ou correção |
| Temporalidade + qualquer bimestre 4 | Cursando aceito; demais opções alertam |
| SuperaÇão G2 + Avanço–Correção de Fluxo | aceito somente com flag e org. curricular sim/parcialmente |
| Resultado preenchido no 2º bimestre | bloqueio RN-RES-001 (I-02) |

### 2.2 Máquina de estados do RAV

Todas as transições válidas e **todas as inválidas** (ex.: exportar sem validar; assinar sem exportação — I-07); correção pós-exportação gera nova versão e regride estado; badge refletido via API em ≤1 requisição.

### 2.3 Imutabilidade e auditoria

UPDATE/DELETE em `rav_versao`/`claim`/`auditoria_evento` pela role da aplicação → erro de banco (teste de trigger); toda escrita de negócio gera evento de auditoria (teste por amostragem de rotas: executar ação → evento presente com autor/payload); reconstrução de qualquer versão N a partir do histórico.

### 2.4 Autorização negativa (RN-SEG-003)

Para **cada** rota autenticada: acesso a recurso de outro professor → 404; token expirado → 401; suite gerada automaticamente da OpenAPI para não esquecer rota nova (DoD).

### 2.5 Sigilo (RN-SEG-004 / I-10)

Observação interna: não aparece em `/gerar` (pacote de evidências), em claims, em exportação, nem em logs; alternância interna→exportável exige confirmação e registra auditoria.

## 3. Evals de IA (trilha própria — resumo operacional de 08-IA §8)

| Eval | Corpus | Gate | Frequência |
|------|--------|------|-----------|
| Alucinação | evidências controladas (exemplos reais [pendência PO] + sintéticos) | 0 afirmações factuais sem evidência | toda mudança de prompt/modelo + semanal em prod (amostra) |
| Anti-viés recall/precisão | violações plantadas por categoria RN-CNT-003/004/006 | ≥90% / ≥80% | idem |
| Completude | RAVs de referência com elementos removidos | ≥90% detecção | idem |
| Individualização | turma sintética de 28 | distribuição abaixo do limiar | release |
| Rubrica pedagógica | amostra cega avaliada por especialista (CRAI/coordenador) | IA ≥ média humana | por fase (M1, M2) |
| Vazamento de PII | payloads reais de staging + produção (amostra) | 0 ocorrências | CI + monitor contínuo |
| Regressão integrada | tudo acima | sem queda >2pp | mudança de prompt/modelo/regra |

**Monitoração em produção (LLM-drift):** amostragem diária de gerações reais re-julgadas pelo juiz + revisão humana semanal de 10 gerações; alerta se taxa de remoção de claims subir.

## 4. Testes não funcionais

| Tipo | Cenário | Critério |
|------|---------|----------|
| Carga (k6) | pico de fim de bimestre: 500 usuários simultâneos, 50 gerações/min em fila | CRUD p95 <500ms (RNF-004); fila estável, sem perda; SSE inicia <2s p95 |
| Resiliência | derrubar provedor LLM primário | fallback automático; editor segue 100% funcional (RNF-006) |
| Resiliência | cortar rede durante edição/observação | zero perda (RNF-005); sincronização ao reconectar (teste Playwright com rede offline) |
| Backup/DR | restauração PITR em staging | mensal; RPO ≤24h comprovado |
| Acessibilidade | axe-core nas telas dos fluxos F-01..F-05 + navegação por teclado no editor | 0 violações AA (RNF-003) |
| Segurança | OWASP ZAP baseline + testes de ASVS L2 prioritários (auth, IDOR, injeção) | 0 achados altos; médios triados |
| Fidelidade PDF | render vs modelo oficial: estrutura A–G, textos fixos, regressão visual por pixel-diff | 100% (RN-DOC-001/002); validação humana por especialista no M1 |

## 5. Testes de usabilidade (gates de fase)

| Momento | Método | Métrica de aprovação |
|---------|--------|----------------------|
| M0 (protótipo) | teste moderado, 5 professores, tarefas: registrar observação, gerar e revisar RAV | P-30s comprovado; SUS ≥75; compreensão do lilás/aceite sem explicação |
| M1 (piloto, 1 bimestre real) | diário de uso + entrevistas + telemetria | H-1 (tempo −50%), H-3 (hábito), taxa de conclusão do ciclo sem suporte (critério PRD §10.1) |

## 6. Dados de teste

Escola sintética completa ("EC Sintética 01"): 2 turmas × 28 estudantes com distribuição realista de flags (2 TEA, 3 Sala de Recursos, 2 SuperaÇão de formas distintas, 1 temporalidade, 2 infrequentes), observações de 1 bimestre gerado. **Nunca** usar dados reais de estudantes em dev/staging (RN-SEG). Seeds versionadas; corpora de evals em repositório com controle de acesso.

## 7. Critérios de saída do MVP (espelho executável do PRD §10)

Checklist final antes do lançamento M2, cada item ligado à sua suite: ciclo completo sem suporte (E2E + piloto) · fidelidade PDF (suite 4 + especialista) · grounding 0 críticas (eval) · anti-viés ≥90% (eval) · 30s comprovado (usabilidade) · resiliência sem perda (suite 4) · cadeia de auditoria íntegra (suite 2.3) · 0 vazamento PII (eval + monitor).

**Documentos impactados:** 09 (DoD referencia suites), 11 (testes de segurança), 08-IA (evals são fonte compartilhada).
