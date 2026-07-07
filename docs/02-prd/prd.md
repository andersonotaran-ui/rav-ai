# 02 — PRD · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Depende de:** 01-Product Vision (objetivos, personas, princípios) · 05-Regras de Negócio (RN-*) · 00-contexto (fontes)
**Escopo deste PRD:** MVP + roadmap. Detalhamento de user stories no doc 09.

---

## 1. Visão Geral

Plataforma web SaaS que auxilia professores dos Anos Iniciais da rede pública do DF a elaborar o RAv — Formulário 1 (Descrição do Processo de Aprendizagem do Estudante) com apoio de IA generativa: registro contínuo de observações no celular, geração ancorada em evidências, validação normativa/anti-viés e exportação fiel ao formulário oficial 2024. A IA é copiloto; a decisão é sempre do professor (RN-IA-001).

**Modelo:** B2C freemium para o professor. **Contexto de uso:** celular para observar, desktop para redigir. **Norma de referência:** versão 2024 do RAv, parametrizada por ano letivo (RN-DOC-006).

## 2. Objetivos

Herdados da Visão (§3): OBJ-1 tempo −50% · OBJ-2 conformidade ≥95% · OBJ-3 hábito de observação (mediana ≥4/estudante/bimestre) · OBJ-4 1.000 professores ativos em 12 meses · OBJ-5 revisão consciente ≥80%. North Star: **RAVs finalizados e exportados por bimestre**.

## 3. Escopo do MVP

| Módulo | Incluído no MVP |
|--------|-----------------|
| Autenticação | Cadastro/login do professor (e-mail+senha e Google OAuth), perfil único "Professor", recuperação de senha |
| Estrutura escolar | Cadastro leve, feito pelo próprio professor: escola (nome/CRE), turma (bloco, ano, letra, turno), ano letivo com 4 bimestres |
| Estudantes | Cadastro individual e em lote (colar lista de nomes); flags do Campo A (TEA/deficiência, adequação curricular, temporalidade, Sala de Recursos, SuperAção + forma de atendimento); frequência (faltas por bimestre) |
| Observações | Registro rápido (texto e voz-para-texto) associado a estudante(s); tipos: aprendizagem, dificuldade, intervenção, resultado de intervenção, socioemocional, frequência/busca ativa, outra; marcação exportável × interna (RN-SEG-004); linha do tempo por estudante |
| Geração IA | Geração do Campo B a partir das observações do bimestre + flags + insumo adicional do professor; rastreabilidade evidência→texto; explicações (RN-IA-003); regeneração por seção |
| Editor | Editor do RAV com estrutura guiada (diagnóstico → percurso/intervenções → resultados → próximos passos), melhoria de escrita e correção de linguagem sob demanda, autosave contínuo |
| Validação | Pipeline pré-exportação: completude (RN-CNT-001), vedações (RN-CNT-003..006 — bloqueio), avisos (RN-CNT-002/007/008), condicionais por perfil (RN-CNT-009), resultado final (RN-RES-*) |
| Exportação | PDF fiel ao F1-2024 (RN-DOC-001/002) e DOCX; exportação em lote da turma |
| Histórico | Versões com diff, proveniência humano/IA (RN-IA-004), máquina de estados (Rascunho → Validado → Exportado → Assinado) |
| Dashboard | Progresso do bimestre ("18 de 28 prontos"), pendências de validação, atalho de observação rápida |

## 4. Fora do Escopo (MVP)

Formulário 2 / Conselho de Classe · perfis Coordenador/Gestor e colaboração multi-professor em tempo real (nomes dos demais professores entram como texto no Campo A) · RFA (Anos Finais), RDIC (Ed. Infantil), EJA · integração i-Educar e sistemas da SEDF · assinatura digital · app nativo (PWA responsivo atende) · anexos de arquivos em observações (roadmap) · multi-idioma · RAG completo do Currículo em Movimento (MVP usa objetivos de aprendizagem estruturados por ano; corpus completo na fase 2 — ver §10).

## 5. Personas

Ver Visão §7 (P1 Ana — regente, P2 Marcos — coordenador, P3 Júlia — iniciante). O MVP é desenhado inteiramente para P1, com P3 beneficiada pelas explicações (RN-IA-003).

## 6. Jornada do Usuário (P1, ciclo de um bimestre)

1. **Setup (1ª sessão, ~10 min):** cria conta → cria turma → cola lista de 28 nomes → marca flags dos estudantes que têm atendimentos específicos. Estado: pronta para observar.
2. **Rotina (semanas 1–8, celular):** situações notáveis → abre o app → toca no estudante → dita/digita 1–2 frases → escolhe tipo → salva (≤30s). Nudge semanal leve: "3 estudantes sem nenhuma observação neste bimestre".
3. **Véspera do conselho (desktop):** abre a turma → vê progresso → estudante a estudante: revisa linha do tempo → gera Campo B → lê com fontes destacadas por trecho → edita/regenera seções → aceita.
4. **Validação:** roda o pré-voo → resolve bloqueios (ex.: rótulo detectado, com sugestão de reescrita) e avisos (ex.: falta ação para próximo bimestre) → RAV validado.
5. **Exportação e assinaturas:** exporta PDF em lote → imprime → colhe assinaturas → marca como assinado/compartilhado com a família (RN-FLX-003).
6. **Bimestre seguinte:** o diagnóstico do novo RAV parte dos "próximos passos" do anterior — o ciclo se retroalimenta.

Jornada de recuperação (professor sem observações na véspera): fluxo "gerar por entrevista" — o sistema faz as perguntas do checklist RN-CNT-001 e monta o texto das respostas. Degradado, mas funcional; o produto incentiva a migração para o fluxo contínuo.

## 7. Fluxos principais

- **F-01 Onboarding:** conta → turma → estudantes → 1ª observação (tutorial = uso real).
- **F-02 Observação rápida (mobile):** home → estudante (busca/recentes) → texto/voz → tipo → salvar. Variante multi-estudante ("reagrupamento com A, B e C").
- **F-03 Geração do RAV:** selecionar estudante+bimestre → conferir evidências (incluir/excluir) → gerar → revisar com rastreabilidade → editar/regenerar → aceitar.
- **F-04 Validação pré-exportação:** rodar checklist → tratar bloqueios/avisos/overrides justificados (RN-CNT-003, RN-RES-003) → validado.
- **F-05 Exportação:** individual ou lote → PDF/DOCX → confirmação de assinaturas (RN-DOC-003).
- **F-06 Histórico:** linha do tempo de versões → diff entre versões → restaurar como nova versão (RN-DOC-005).
- **F-07 4º bimestre:** F-03 + Campo E com opções filtradas por ano/perfil (RN-RES-003) e alerta de faltas (RN-RES-004).

## 8. Requisitos Funcionais

Prioridade: **P0** = MVP inegociável · P1 = MVP desejável · P2 = pós-MVP.

### Autenticação e conta
- **RF-001 (P0)** Cadastro e login por e-mail/senha e Google OAuth; sessão JWT com refresh.
- **RF-002 (P0)** Recuperação de senha por e-mail.
- **RF-003 (P1)** Exclusão de conta conforme RN-SEG-005 (desvinculação, não destruição de documentos).

### Estrutura escolar e estudantes
- **RF-010 (P0)** CRUD de escola (nome, CRE) e turma (bloco, ano 1º–5º, letra, turno, ano letivo).
- **RF-011 (P0)** Configuração de bimestres do ano letivo (datas e dias letivos por bimestre).
- **RF-012 (P0)** CRUD de estudante com flags do Campo A (RN-CNT-009); validação bloco×ano.
- **RF-013 (P0)** Cadastro em lote de estudantes (colar lista de nomes).
- **RF-014 (P0)** Registro de faltas por estudante/bimestre (total simples, não diário) + cálculo de % (RN-RES-004).
- **RF-015 (P1)** Transferência de estudante (RN-FLX-004) e arquivamento de turma no fim do ano.

### Observações
- **RF-020 (P0)** Criar observação: texto livre, tipo, estudante(s), data (default hoje), flag exportável/interna; ≤3 toques até o campo no mobile.
- **RF-021 (P0)** Voz-para-texto no registro mobile.
- **RF-022 (P0)** Linha do tempo de observações por estudante, filtrável por bimestre e tipo.
- **RF-023 (P1)** Edição/exclusão de observação com trilha (RN-FLX-005).
- **RF-024 (P1)** Observação multi-estudante (fan-out com edição individual posterior).
- **RF-025 (P2)** Anexos (foto de produção do estudante) com OCR.

### Geração e edição com IA
- **RF-030 (P0)** Gerar Campo B a partir de: observações exportáveis do bimestre, flags, faltas, objetivos de aprendizagem do ano, "próximos passos" do bimestre anterior e insumo ad-hoc do professor (RN-IA-002).
- **RF-031 (P0)** Rastreabilidade: cada trecho gerado exibe as evidências de origem; trecho sem evidência é marcado como "conectivo".
- **RF-032 (P0)** Explicação pedagógica por sugestão (RN-IA-003).
- **RF-033 (P0)** Aceite explícito antes de compor o documento (RN-IA-001); edição livre pós-aceite com proveniência (RN-IA-004).
- **RF-034 (P0)** Regeneração por seção (diagnóstico/percurso/resultados/próximos passos) sem perder o restante.
- **RF-035 (P0)** Melhoria de escrita e correção gramatical sob demanda sobre texto selecionado, como sugestão com diff.
- **RF-036 (P1)** Modo entrevista (jornada de recuperação, §6).
- **RF-037 (P1)** Ajuste de extensão do texto (sintetizar/expandir) mantendo evidências.
- **RF-038 (P2)** Sugestão de intervenções/estratégias baseadas no Currículo em Movimento (exige RAG completo).

### Validação
- **RF-040 (P0)** Pipeline de validação executável a qualquer momento e obrigatório pré-exportação (RN-IA-005): completude RN-CNT-001, vedações RN-CNT-003/004/005/006 (bloqueio com sugestão de reescrita), avisos RN-CNT-002/007/008, condicionais RN-CNT-009, Campo E RN-RES-001/002/003/004.
- **RF-041 (P0)** Override de bloqueio com justificativa registrada em auditoria (exceções previstas nas RNs).
- **RF-042 (P1)** Detector de similaridade entre RAVs da turma (RN-CNT-005).

### Exportação
- **RF-050 (P0)** Exportar PDF fiel ao F1-2024, campos A–G, textos fixos F/G intocados (RN-DOC-001/002).
- **RF-051 (P0)** Exportar DOCX com a mesma fidelidade.
- **RF-052 (P0)** Exportação em lote da turma (ZIP ou PDF único multi-estudante).
- **RF-053 (P0)** Máquina de estados com confirmação de assinaturas (RN-DOC-003, RN-FLX-003).

### Histórico e auditoria
- **RF-060 (P0)** Versionamento automático de todo RAV com autor, timestamp, proveniência (RN-FLX-005, RN-IA-004).
- **RF-061 (P0)** Comparação visual entre versões (diff).
- **RF-062 (P1)** Linha do tempo do documento (criado, gerado, editado, validado, exportado, assinado).

### Dashboard
- **RF-070 (P0)** Painel da turma por bimestre: status de cada RAV, contagem de observações, pendências.
- **RF-071 (P1)** Nudges de observação (estudantes sem registro há N semanas) — tom leve, desativável.

## 9. Requisitos Não Funcionais

| ID | Categoria | Requisito |
|----|-----------|-----------|
| RNF-001 | Usabilidade | Observação em ≤30s e ≤3 toques (Visão §9.1); primeiro RAV gerado na primeira sessão sem treinamento |
| RNF-002 | Usabilidade | Mobile-first no módulo de observações; desktop-first no editor; responsivo integral (PWA) |
| RNF-003 | Acessibilidade | WCAG 2.1 AA nas telas do fluxo principal |
| RNF-004 | Desempenho | Ações CRUD p95 <500ms; geração IA com streaming e feedback <2s para início da resposta |
| RNF-005 | Resiliência | Autosave ≤5s após digitação; rascunho local (IndexedDB) sobrevive a queda de conexão (Visão §9.4) |
| RNF-006 | Disponibilidade | 99,5% mensal; degradação graciosa se o provedor de IA falhar (edição manual nunca bloqueia) |
| RNF-007 | Escala | Dimensionar para picos de fim de bimestre (calendário SEDF conhecido); metas iniciais: 5k usuários, 200k observações/bimestre |
| RNF-008 | Segurança | OWASP ASVS nível 2; criptografia em repouso e trânsito; RBAC por vínculo (RN-SEG-003) |
| RNF-009 | LGPD | Pseudonimização pré-LLM (RN-SEG-001) com teste automatizado de vazamento de PII; minimização (RN-SEG-002); DPA com provedores de IA |
| RNF-010 | Auditoria | 100% das escritas com trilha imutável (RN-FLX-005) |
| RNF-011 | Custo de IA | Custo médio de geração por RAV monitorado; teto por usuário free (limites do freemium) |
| RNF-012 | Observabilidade | Logs estruturados, métricas de produto (indicadores da Visão §5) e tracing das chamadas de IA com versão de prompt |
| RNF-013 | Manutenibilidade | Regras normativas como configuração versionada por ano letivo (RN-DOC-006), alteráveis sem deploy |

## 10. Critérios de Aceite do MVP (nível épico)

1. **Ciclo completo:** professora nova cria conta, turma e 28 estudantes, registra observações e exporta os 28 PDFs válidos — sem suporte humano.
2. **Fidelidade:** PDF exportado é aprovado em comparação campo a campo com o F1-2024 oficial (teste automatizado + validação visual por especialista).
3. **Grounding:** em corpus de teste, nenhuma frase factual gerada sem evidência de origem (teste de alucinação RN-IA-002).
4. **Anti-viés:** validador detecta ≥90% das violações plantadas em corpus de teste das categorias RN-CNT-003/004/006 (meta H-2).
5. **Regra dos 30s:** usuária de teste registra observação por voz em ≤30s no celular, medido em teste moderado.
6. **Resiliência:** derrubar a conexão durante a edição não perde texto (RNF-005).
7. **Auditoria:** qualquer RAV exportado tem cadeia íntegra: versões, proveniência, validações executadas, overrides justificados.
8. **LGPD:** inspeção de payloads reais para LLM não revela PII (RNF-009).

## 11. Roadmap

| Fase | Conteúdo | Gate de saída |
|------|----------|---------------|
| **M0 — Fundação** (docs 03/04/06/07/08 + setup) | Arquitetura, dados, design system, pipeline IA v0 | Protótipo navegável + prova de grounding |
| **M1 — MVP fechado** | Escopo §3 completo, piloto com 10–20 professores (1 bimestre real) | Critérios §10 + H-1/H-2/H-3 medidas |
| **M2 — Lançamento público DF** | Freemium ativo, onboarding self-service, telemetria completa | OBJ-4 em trajetória; conversão H-6 medida |
| **M3 — Qualidade pedagógica+** | RAG completo do Currículo em Movimento, sugestão de intervenções (RF-038), modo entrevista refinado, anexos | Score de rubrica ≥ meta |
| **M4 — Escola** | Perfil coordenador (revisão), colaboração multi-professor, painel da escola, Formulário 2 | 1ª escola B2B paga |
| **M5 — Expansão** | RFA (Anos Finais), RDIC (Ed. Infantil), integração i-Educar/SEDF, assinatura digital | Acordo institucional ou 3 redes atendidas |

## 12. Dependências e riscos de execução

- **Exemplos reais de RAV** (pendência do PO) são pré-requisito do corpus de teste dos critérios 3 e 4 — sem eles, calibração do validador fica em risco. **Ação: prioridade máxima.**
- Ingestão das **Diretrizes 9dez24** antes do congelamento das RN-CNT (conflito C3).
- Discovery com 5+ professores valida H-V1/H-V2/H-1 antes do development kickoff (compromisso da Visão §4).
- Voz-para-texto no navegador mobile (RF-021): validar qualidade da Web Speech API vs. transcrição server-side (decisão técnica no doc 03).

## 13. Rastreabilidade

Cada RF referencia suas RNs; RNFs referenciam princípios da Visão §9 e bloco RN-SEG. Alterações neste PRD exigem revisão de: 05 (novas regras), 07-UX (fluxos §7), 08-IA (RF-030..038), 09-Backlog (derivação de stories), 10-Testes (critérios §10).
