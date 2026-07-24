# 11 — Segurança e LGPD · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Depende de:** 05-RNs (bloco RN-SEG) · 03-Arquitetura §4 · 04-Dados §6 · 06-APIs §4 · 10-Testes §2.4/2.5
**Contexto agravante:** dados pessoais de **crianças** (titulares com proteção reforçada — LGPD art. 14) em **documento público de escrituração escolar**. Segurança aqui não é requisito não funcional: é o produto.

---

## 1. LGPD

### 1.1 Papéis e base legal

| Cenário | Controlador | Operador | Base legal provável |
|---------|-------------|----------|---------------------|
| MVP B2C (professor assina individualmente) | **Cenário juridicamente delicado:** o professor trata dados de estudantes sob atribuição da escola/rede | RAV AI (plataforma) | Execução de política pública/obrigação legal da escrituração (arts. 7º/23) via atuação do professor + legítimo interesse — **exige parecer jurídico antes do lançamento público (pendência P-JUR-01, bloqueadora do M2)** |
| B2B/B2G futuro | Escola/Secretaria | RAV AI | Contrato + DPA — cenário limpo |

Posição de projeto: desenhar **desde já** como se fôssemos operador de um controlador institucional (padrão mais exigente), e tratar o M1 (piloto fechado) com termo de consentimento/compromisso explícito dos professores participantes e comunicação às escolas envolvidas.

### 1.2 Inventário de dados pessoais

| Titular | Dados | Sensível? | Minimização aplicada |
|---------|-------|-----------|----------------------|
| Estudante (criança) | nome completo (cifrado em repouso — RN-SEG-006), código de referência (iniciais + sufixo, exposto na UI no lugar do nome), turma, flags de atendimento (TEA/deficiência, Sala de Recursos, SuperAção, temporalidade), faltas, observações pedagógicas, texto do RAV | Flags de saúde/deficiência: **sim** (art. 5º II); observações socioemocionais: potencialmente | Só campos exigidos pelo F1-2024 (RN-SEG-002); sem CPF, sem endereço, sem foto no MVP; nome completo cifrado e substituído por código de referência na interface cotidiana (RN-SEG-006) — só decifrado sob vínculo válido ou na exportação oficial; socioemocional cifrada e interna por padrão (RN-SEG-004) |
| Responsável | nenhum dado cadastrado no MVP (assinatura ocorre no papel) | — | ausência deliberada |
| Professor | nome, e-mail, matrícula (opcional p/ assinatura) | não | — |

### 1.3 Direitos dos titulares e retenção

Canal de atendimento (e-mail DPO) desde o M2; acesso/correção: o RAV é documento oficial — correção gera nova versão, nunca reescrita do histórico (RN-DOC-005); eliminação: limitada pela obrigação de escrituração (art. 16 — RN-SEG-005); portabilidade: exportação completa por estudante já é feature (RN-FLX-004). Retenção: RAVs e auditoria pelo prazo de guarda escolar (confirmar prazo exato no parecer P-JUR-01); observações não incorporadas a RAV: expurgo após N anos letivos (propor 2, confirmar no parecer).

### 1.4 IA e dados (interseção com 08-IA)

Pseudonimização pré-LLM (RN-SEG-001) com teste de vazamento em CI e monitor contínuo (10-Testes §3) — mecanismo independente do código de referência de UI (RN-SEG-006), que não é forte o suficiente para uso como token de pseudonimização; DPAs assinados com Anthropic/OpenAI, com opt-out de treinamento; **nenhum dado de estudante usado para treinar modelos** — compromisso público; transparência: página "Como a IA funciona" em linguagem simples, incluindo instruções ao professor sobre o que não digitar em observações (dados de saúde detalhados, relatos de terceiros).

### 1.5 RIPD e governança

Relatório de Impacto (RIPD) elaborado antes do M2 (template ANPD) — pendência P-JUR-02; DPO nomeado (pode ser o próprio PO no início, formalizado); registro de operações de tratamento mantido junto a este documento.

## 2. Perfis e permissões

### 2.1 Matriz (MVP + preparação M4)

| Ação | Professor (MVP) | Coordenador (M4) | Serviço n8n | Admin interno |
|------|:---:|:---:|:---:|:---:|
| CRUD turma/estudantes próprios | ✅ | 👁 (escola) | — | 👁 |
| Observações (criar/ler) | ✅ próprias turmas | 👁 exportáveis | — | — |
| Observações internas 🔒 | ✅ autor | ❌ | ❌ | ❌ |
| Gerar/editar/exportar RAV | ✅ | 👁 + comentar | — | — |
| Confirmar assinaturas | ✅ | ✅ | — | — |
| Agregados sem PII (nudges) | — | — | ✅ | ✅ |
| Normas (editar regras/templates) | — | — | — | ✅ com 4-olhos |
| Auditoria (consulta) | 👁 próprios eventos | 👁 escola | — | ✅ |

Princípios: escopo por vínculo aplicado no repositório (ADR-006 — impossível esquecer por rota); token do n8n com escopo mínimo e **sem acesso a PII de estudante** (ADR-003); edição de normas exige segunda aprovação (documento de fé pública).

### 2.2 Autenticação

Senha: argon2id, política de comprimento (≥10), verificação contra vazamentos conhecidos; OAuth Google; sessão: JWT 15min + refresh httpOnly SameSite=Strict com rotação; bloqueio progressivo por tentativas; MFA: opcional no M2, obrigatório para admin interno desde o M1.

## 3. Auditoria, logs e rastreabilidade

### 3.1 Três trilhas distintas (não misturar)

| Trilha | Conteúdo | PII? | Retenção |
|--------|----------|------|----------|
| **Auditoria de negócio** (`auditoria_evento`, append-only) | quem fez o quê em qual entidade: versões, aceites de IA, overrides de validação, mudanças de estado, exportações (com sha256), alternância de sigilo | referencia IDs; payload minimizado | prazo de guarda escolar |
| **Logs técnicos** (aplicação) | requisições, erros, latências | **proibido nome de estudante** — IDs apenas; verificação automatizada no DoD | 90 dias |
| **Tracing de IA** (`pipeline_execucao` + logs da zona LLM) | etapas, tokens, custo, versões de prompt/modelo, conteúdo **pseudonimizado** | não (tokens `{{EST_n}}`) | 12 meses |

### 3.2 Cadeia de rastreabilidade de um RAV (o que a auditoria responde)

Para qualquer RAV exportado: quais observações o alimentaram (claim_evidencia) → qual pipeline/prompt/modelo gerou cada claim → o que o professor editou (proveniência + diffs de versões) → quais validações rodaram e o que apontaram → quais overrides foram justificados e por quem → qual template/norma regeu a exportação → hash do arquivo entregue. **Teste de reconstrução integral é critério de aceite (PRD §10.7).**

### 3.3 Resposta a incidentes

Plano mínimo M1: classificação (vazamento de PII de criança = severidade máxima), responsável, prazo de comunicação à ANPD e aos afetados conforme art. 48, post-mortem obrigatório; contato de segurança público (`security.txt`); gatilhos automáticos: alerta de vazamento do monitor de PII (10-Testes §3), pico anômalo de exportações, falha repetida de autorização.

## 4. Segurança de aplicação e infraestrutura (consolidação)

Checklist OWASP ASVS L2 mantido como anexo vivo; destaques já decididos: TLS 1.3, criptografia em repouso + cifragem aplicacional das observações internas e do nome completo do estudante (04-Dados; RN-SEG-006), segredos em vault, dependabot/SCA no CI, imagens Docker mínimas e não-root, backups PITR com teste mensal de restauração (10-Testes §4), URLs de exportação temporárias assinadas (06-APIs §4), rate limiting por usuário e por IP, cabeçalhos de segurança (CSP estrita — sem scripts de terceiros no app), ZAP baseline por release.

## 5. Pendências desta versão (bloqueadoras marcadas)

| ID | Pendência | Bloqueia |
|----|-----------|----------|
| P-JUR-01 | Parecer jurídico: base legal do cenário B2C + prazo de guarda escolar | **M2 (lançamento público)** |
| P-JUR-02 | RIPD completo | M2 |
| P-SEC-01 | DPAs formais com provedores de IA | M1 (piloto com dados reais) |
| P-SEC-02 | Termo de participação do piloto (professores) + comunicação às escolas | M1 |
| P-SEC-03 | Pentest externo | M2 |

**Documentos impactados:** 02-PRD (P-JUR-01 entra como dependência do roadmap M2) · 09-Backlog (stories de MFA admin, security.txt, monitor de PII) · 10-Testes (suites §2.4/2.5 e monitor contínuo).
