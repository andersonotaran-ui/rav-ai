# 09 — Desenvolvimento · Backlog · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Depende de:** 02-PRD (RFs, roadmap) · 03/04/06 (arquitetura) · 07-UX (telas) · 08-IA (pipeline)
**Convenções:** Épico `EP-nn` → Story `ST-nn.nn`. Estimativa em tamanho relativo (P/M/G). Toda story referencia RF/RN. DoD global no §4. Stories P2 do PRD ficam no §3 (pós-MVP), fora do plano M0–M1.

---

## 1. Épicos (MVP = M0 + M1)

| Épico | Nome | Objetivo | RFs |
|-------|------|----------|-----|
| EP-01 | Fundação técnica | Monorepo, CI/CD, esqueleto Clean Architecture, ambientes | — |
| EP-02 | Identidade e conta | Registro, login, sessão, recuperação | RF-001/002 |
| EP-03 | Estrutura escolar | Escola, ano letivo, bimestres, turma | RF-010/011 |
| EP-04 | Estudantes | CRUD, lote, flags, frequência | RF-012/013/014 |
| EP-05 | Observações | Composer mobile, voz, linha do tempo | RF-020..024 |
| EP-06 | Normas como dados | Registro 2024, regras parametrizadas, objetivos de aprendizagem | RNF-013 |
| EP-07 | Pipeline de IA | 8 etapas, pseudonimização, streaming | RF-030..037 |
| EP-08 | Editor 3 zonas | Texto, evidências, qualidade, autosave | RF-031..035, RNF-005 |
| EP-09 | Validação normativa | 3 camadas, pré-voo, overrides | RF-040/041/042 |
| EP-10 | Exportação e estados | PDF/DOCX fiéis, lote, máquina de estados | RF-050..053 |
| EP-11 | Histórico e auditoria | Versões, diff, trilha | RF-060/061/062 |
| EP-12 | Painel e nudges | Progresso, pendências, nudge n8n | RF-070/071 |
| EP-13 | Evals e qualidade de IA | Corpora, suite, gates de CI | 08-IA §8 |
| EP-14 | Onboarding e PWA | Fluxo F-01, offline, instalável | RNF-001/002/005 |

**Ordem de execução (dependências):** EP-01 → EP-02/03/06 → EP-04/05 → EP-07 (depende de 06) → EP-08/09 (dependem de 07) → EP-10/11 → EP-12/14 · EP-13 corre em paralelo a partir de EP-07. **Caminho crítico: EP-06 → EP-07 → EP-08/09 → EP-10.**

## 2. Stories detalhadas (amostra normativa por épico — padrão para derivar as demais)

### EP-05 · Observações

**ST-05.01 — Registro rápido mobile (M)** · RF-020, P-30s
*Como* professora, *quero* registrar uma observação em segundos no celular, *para* não interromper minha aula.
Critérios de aceite:
1. Do Início, toco "+ Observar" → estudante (recentes no topo) → campo de texto com teclado ativo: **≤3 toques**.
2. Salvar sem tipo é permitido; tipo pode ser sugerido depois (ST-05.04).
3. Confirmação de 1s e retorno ao contexto; observação aparece na linha do tempo imediatamente.
4. Teste cronometrado em dispositivo real: fluxo completo ≤30s com texto ditado.

**ST-05.02 — Voz-para-texto (M)** · RF-021
CA: botão segurar-e-falar; transcrição editável antes de salvar; fallback digitação se API indisponível; funciona em Chrome/Safari mobile. Spike prévio: Web Speech API vs transcrição server-side (PRD §12) — decisão registrada como ADR.

**ST-05.03 — Observação interna/sigilosa (P)** · RN-SEG-004
CA: tipo socioemocional nasce 🔒 interna; alternar para exportável exige confirmação com explicação do efeito; internas nunca aparecem em `/gerar` (teste automatizado I-10); armazenada cifrada (04-Dados).

**ST-05.04 — Classificação assíncrona de tipo (P)** · UX §4.1
CA: sugestão de tipo com 1 toque para confirmar/trocar; sem alterar dado sem confirmação (P-ProfessorDecide).

**ST-05.05 — Observação multi-estudante (M)** · RF-024
CA: seleção múltipla; fan-out cria observações individuais editáveis; `grupo_id` liga o conjunto.

### EP-07 · Pipeline de IA

**ST-07.01 — Coletor + Pseudonimizador (M)** · RN-IA-002, RN-SEG-001
CA: pacote de evidências montado conforme 08-IA §2; dicionário determinístico + NER; **teste de vazamento em CI**: nenhum payload de saída contém nomes do dicionário (asserção sobre corpus de teste); dicionário com TTL.

**ST-07.02 — Planner (P)** · RN-CNT-001
CA: saída JSON estruturada mapeando evidências→seções; lacunas listadas por elemento obrigatório; latência <1,5s p95.

**ST-07.03 — Redator com claims + streaming (G)** · RF-030/031, ADR-002
CA: saída em claims (JSON schema validado); cada claim factual com ≥1 `evidence_id`; SSE emite claims incrementalmente, início <2s; falha de provedor → fallback OpenAI transparente; execução registrada em `pipeline_execucao` com custo e versões.

**ST-07.04 — Juiz de grounding (M)** · RN-IA-002
CA: prompt independente do Redator; claims `não sustentado` removidos; `extrapolação` rebaixada a pergunta ao professor; eval de alucinação passa com 0 críticas (gate).

**ST-07.05 — Melhoria de escrita como diff (M)** · RF-035
CA: seleção de trecho → sugestão em diff; aceitar/recusar explícito; proveniência `ia_editada` registrada.

**ST-07.06 — Modo entrevista (M)** · RF-036
CA: perguntas geradas das lacunas RN-CNT-001; respostas viram observações `origem=entrevista`; geração subsequente as utiliza.

### EP-08 · Editor 3 zonas

**ST-08.01 — Editor com zonas Evidências/Texto/Qualidade (G)** · UX §4.2
CA: layout desktop 3 zonas; clique em chip `[●data]` destaca trecho e vice-versa (bidirecional); sugestões IA em lilás com "Por quê?" e aceite explícito (RN-IA-001/003); mobile em abas.

**ST-08.02 — Autosave resiliente (M)** · RNF-005, P-NadaSePerde
CA: persistência ≤5s após digitação; queda de rede durante edição não perde texto (teste automatizado com rede cortada); indicador "salvo às hh:mm"; rascunho local IndexedDB sincroniza ao reconectar.

**ST-08.03 — Aceite de claims e nova versão (M)** · RN-IA-001/004, I-06
CA: aceite/edição gera `rav_versao` nova, nunca UPDATE; proveniência por claim correta nos 3 casos (professor/ia/ia_editada).

### EP-09 · Validação

**ST-09.01 — Camada determinística (M)** · RN-RES-001..004, I-02/I-08
CA: matriz completa ano×resultado×perfil coberta por testes de tabela (10-Testes); mensagens com `regra` + `mensagem_humana` (06-APIs §3).

**ST-09.02 — Classificador de vedações (G)** · RN-CNT-003/004/006
CA: categorias com trecho, severidade e sugestão de reescrita; recall ≥90%/precisão ≥80% no corpus (gate H-2); léxico curado (camada 1) roda antes e é configurável via `norma_regra` sem deploy.

**ST-09.03 — Pré-voo (M)** · RF-040, UX §4.3
CA: impedimentos bloqueiam exportação; override com justificativa persistida (`validacao_override`) e visível na auditoria; avisos não bloqueiam.

**ST-09.04 — Similaridade da turma (P)** · RF-042
CA: embedding por versão; aviso acima do limiar configurável; sem falso bloqueio.

### EP-10 · Exportação

**ST-10.01 — PDF fiel ao F1-2024 (G)** · RF-050, RN-DOC-001/002, ADR-005
CA: comparação automatizada com o modelo oficial (estrutura A–G, textos fixos byte a byte); teste visual de regressão por render; validação final por especialista (critério PRD §10.2); sha256 registrado.

**ST-10.02 — Lote da turma (M)** · RF-052
CA: job assíncrono com progresso; apenas validados; ZIP + PDF único; falha parcial reportada por estudante.

**ST-10.03 — Máquina de estados e assinaturas (P)** · RF-053, RN-DOC-003, I-07
CA: transições válidas exclusivamente; badge consistente em todas as telas; correção pós-exportação → rascunho em nova versão.

### EP-13 · Evals (paralelo, bloqueia releases)

**ST-13.01 — Corpus de alucinação (M)** e **ST-13.02 — Corpus anti-viés (M)**: construção a partir dos **exemplos reais [pendência PO]** + sintéticos revisados; **ST-13.03 — Suite no CI (M)**: evals 08-IA §8 como gate de merge para mudanças de prompt/modelo/regra; **ST-13.04 — Painel de qualidade (P)**: métricas de aceite, edição pós-geração, overrides por regra.

## 3. Pós-MVP (registrado, não planejado)

Anexos com OCR (RF-025) · sugestão de intervenções com RAG completo (RF-038, M3) · perfil coordenador e colaboração (M4) · Formulário 2 (M4) · RFA/RDIC/i-Educar/assinatura digital (M5) · memória de estilo do professor (08-IA §7.2).

## 4. Definition of Done (global)

Código revisado (PR) · testes unitários e de contrato verdes · lint de arquitetura (dependências entre camadas) verde · autorização negativa testada em rotas novas · sem PII em logs (verificação automatizada) · migração com rollback testado · evals verdes quando tocar prompt/modelo/regra · UX writing revisado contra 07-UX §6.2 · documentação de API atualizada (OpenAPI) · rastreabilidade RF/RN citada no PR.

## 5. Riscos de execução do backlog

| Risco | Sinal | Resposta |
|-------|-------|----------|
| Caminho crítico EP-07 atrasar | ST-07.03 >2 sprints | Cortar ST-07.06 (entrevista) do M1; manter grounding intocável |
| Corpus de evals sem exemplos reais | ST-13.01/02 bloqueadas | Escalar pendência ao PO; iniciar com sintéticos marcados como provisórios |
| Voz-para-texto web insuficiente | Spike ST-05.02 negativo | Transcrição server-side (custo↑) ou degradar para digitação no M1 |
| Fidelidade PDF consumir sprints | ST-10.01 iterando | Congelar template cedo; especialista valida na primeira semana do épico |
