# 05 — Regras de Negócio · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Origens:** [O-2024] Orientações de preenchimento 2º Ciclo (2024) · [F1-2024] RAv Formulário 1 versão 2024 · [PPTX] formação CRAI (não normativo) · [PO] decisão do Product Owner · [LGPD] Lei 13.709/2018
**Convenções:** RN-DOC (documento oficial) · RN-CNT (conteúdo do RAV) · RN-RES (resultado final) · RN-FLX (fluxo/processo) · RN-IA (inteligência artificial) · RN-SEG (segurança/LGPD)
**Formato de cada regra:** Descrição · Origem · Objetivo · Exceções · Impacto · Validações

⚠️ **Princípio geral:** nenhuma regra nesta lista foi inventada; toda regra sem origem oficial está marcada [PO] (decisão de produto) e é revisável. Regras normativas são **parametrizadas por ano letivo** (ver RN-DOC-006).

---

## Bloco 1 — Documento oficial (RN-DOC)

### RN-DOC-001 — Fidelidade estrutural do formulário
- **Descrição:** O RAV exportado deve reproduzir fielmente a estrutura oficial do Formulário 1 versão vigente (campos A–G), sem inclusão, exclusão ou reordenação de campos.
- **Origem:** [O-2024]; [F1-2024] Campo G ("em nenhuma hipótese poderão ser excluídos").
- **Objetivo:** Preservar a fé pública do documento de escrituração escolar.
- **Exceções:** Nenhuma. Nem por solicitação do usuário.
- **Impacto:** Exportação (PDF/Word), templates, editor.
- **Validações:** Teste automatizado de conformidade do layout exportado contra o modelo oficial; checksum do template por ano letivo.

### RN-DOC-002 — Textos fixos invioláveis (Campos F e G)
- **Descrição:** Os textos institucionais dos campos F (orientações) e G (integridade) são imutáveis e sempre presentes na exportação.
- **Origem:** [O-2024]; [F1-2024].
- **Objetivo:** Garantir esclarecimento às instituições de destino do estudante.
- **Exceções:** Atualização somente quando a SEEDF publicar nova versão do formulário.
- **Impacto:** Templates de exportação; gestão de versões normativas.
- **Validações:** Diff automático do texto fixo contra a versão oficial cadastrada.

### RN-DOC-003 — Valor documental condicionado a assinaturas
- **Descrição:** O RAV só possui valor documental com assinatura dos professores, do coordenador pedagógico e do pai/mãe/responsável legal. A plataforma deve marcar o status do RAV como "Exportado — pendente de assinaturas" até confirmação manual.
- **Origem:** [O-2024] ("sem assinatura/ciência do responsável não tem valor documental"); [F1-2024] Campo D.
- **Objetivo:** Evitar que o professor trate o PDF exportado como documento concluído.
- **Exceções:** Nenhuma no MVP (assinatura em papel). Assinatura digital é hipótese futura sujeita a aceitação da SEEDF.
- **Impacto:** Máquina de estados do RAV; UX de status; comunicação com o usuário.
- **Validações:** Estado "Concluído" inacessível sem confirmação explícita de coleta de assinaturas.

### RN-DOC-004 — Elaboração coletiva, relatório único
- **Descrição:** Turmas com mais de um professor (Educação Integral, PECM, Sala de Recursos) produzem um único Formulário 1 por estudante, elaborado coletivamente; todos assinam.
- **Origem:** [O-2024]; [F1-2024] Campo D (múltiplas linhas de assinatura).
- **Objetivo:** Visão integrada das aprendizagens.
- **Exceções:** —
- **Impacto:** Modelo de dados (N professores por turma/RAV); MVP registra os nomes no Campo A; colaboração simultânea fica no roadmap.
- **Validações:** Campo A comporta professor regente + demais professores; exportação lista todos.

### RN-DOC-005 — Preenchimento sem emendas ou rasuras
- **Descrição:** O documento final não pode conter emendas/rasuras; correções geram nova versão do documento antes da impressão.
- **Origem:** [F1-2024] Observações Gerais (e).
- **Objetivo:** Integridade documental.
- **Exceções:** —
- **Impacto:** Reforça o versionamento interno (RN-FLX-005): toda correção é uma nova exportação íntegra.
- **Validações:** Reexportação sempre gera documento completo novo, nunca "errata".

### RN-DOC-006 — Versionamento normativo por ano letivo
- **Descrição:** Templates, textos fixos, regras de conteúdo e regras de resultado são versionados por ano letivo; cada RAV referencia a versão normativa sob a qual foi produzido.
- **Origem:** [PO], motivado pela evolução observada (formulário 2020 → 2024; Diretrizes 2014 → 9dez24).
- **Objetivo:** Absorver mudanças da SEEDF sem retrabalho e preservar validade histórica dos documentos antigos.
- **Exceções:** —
- **Impacto:** Arquitetura (regras como dados, não código); auditoria.
- **Validações:** RAV antigo reexportado usa a norma da época; teste de regressão por versão.

## Bloco 2 — Conteúdo do RAV (RN-CNT)

### RN-CNT-001 — Elementos obrigatórios do Campo B
- **Descrição:** O texto do Campo B deve evidenciar: (a) diagnóstico baseado nos objetivos de aprendizagem do ano (Currículo em Movimento / Org. Curricular SuperAção); (b) objetivos alcançados no bimestre; (c) acompanhamentos e adaptações realizadas; (d) dificuldades percebidas + intervenções/estratégias; (e) especificidades socioemocionais relevantes; (f) ações pedagógicas para o próximo bimestre.
- **Origem:** [O-2024] Campo B.
- **Objetivo:** Cumprir a função formativa do registro.
- **Exceções:** Item (e) apenas quando houver ocorrência, resguardado sigilo (RN-SEG-004). Avanço de estudos (art. 233) apenas quando aplicável.
- **Impacto:** Estrutura do editor; prompts de geração; validador de completude.
- **Validações:** Checklist automatizado por elemento com apontamento do trecho correspondente; alerta de elemento ausente antes da exportação.

### RN-CNT-002 — Sequência textual recomendada
- **Descrição:** O texto deve seguir a sequência: aprendizagens evidenciadas e dificuldades percebidas → estratégias/intervenções → resultados das intervenções e orientações.
- **Origem:** [F1-2024] Campo F, citando Diretrizes de Avaliação (2014, p. 49).
- **Objetivo:** Padronização pedagógica da narrativa.
- **Exceções:** Sequência é recomendação normativa, não vedação — o validador alerta, não bloqueia.
- **Impacto:** Prompts de geração; validador (nível "aviso").
- **Validações:** Classificação de parágrafos por função retórica; aviso de inversão.

### RN-CNT-003 — Proibição de características pessoais, rótulos e avaliação informal
- **Descrição:** É vedado conteúdo que incida sobre características pessoais (físicas/psicológicas), rótulos, juízo de valor, expressões constrangedoras ou pejorativas.
- **Origem:** [O-2024] (lista de vedações).
- **Objetivo:** Avaliação ética, não excludente, sem exposição do estudante.
- **Exceções:** Nenhuma.
- **Impacto:** Motor anti-viés (bloqueio); prompts (instrução negativa); formação in-app.
- **Validações:** Detector com categorias rotuladas; violação = **bloqueio** de exportação com explicação e sugestão de reescrita; falso-positivo contornável com justificativa registrada em auditoria [PO].

### RN-CNT-004 — Proibição de termos desabonadores sobre família e condição socioeconômica
- **Descrição:** É vedado registrar termos desabonadores sobre famílias, condições socioeconômicas ou situações que não colaborem com o processo de ensino-aprendizagem.
- **Origem:** [O-2024].
- **Objetivo:** Proteção da dignidade familiar; foco pedagógico.
- **Exceções:** Fatos objetivos com relevância pedagógica direta (ex.: infrequência e busca ativa) são registráveis na forma prevista pela norma.
- **Impacto:** Motor anti-viés; few-shot com exemplos de reescrita.
- **Validações:** Idem RN-CNT-003.

### RN-CNT-005 — Proibição de texto-padrão e fragmentado
- **Descrição:** É vedado texto fragmentado ou em "formato-padrão de redação" que não se aproxime do estudante. Corolário de produto: a geração por IA deve ser ancorada em evidências específicas do estudante.
- **Origem:** [O-2024]; corolário [PO].
- **Objetivo:** Individualização real do registro.
- **Exceções:** —
- **Impacto:** Arquitetura da geração (RN-IA-002); validador de similaridade.
- **Validações:** Índice de similaridade entre RAVs da mesma turma acima de limiar → aviso; RAV sem nenhuma evidência vinculada → aviso forte [PO].

### RN-CNT-006 — Proibição de classificação técnica descontextualizada
- **Descrição:** É vedado classificar o estudante em categorias técnicas (ex.: hipóteses de escrita da Psicogênese) desvinculadas das habilidades cognitivas, emocionais e sociais do percurso.
- **Origem:** [O-2024].
- **Objetivo:** Evitar redução da criança a um rótulo técnico.
- **Exceções:** Menção contextualizada dentro da narrativa do percurso é aceitável (a vedação é à classificação desvinculada).
- **Impacto:** Anti-viés (nível "aviso contextual"); prompts.
- **Validações:** Detecção de termos técnicos classificatórios + análise de contexto.

### RN-CNT-007 — Equilíbrio formativo
- **Descrição:** O registro deve apontar progressos e elementos positivos, não apenas fragilidades.
- **Origem:** [PPTX] (Hoffman, 2005) — material de formação; alinhado à concepção formativa das Diretrizes. Nível: recomendação [a promover a norma se confirmado nas Diretrizes 9dez24].
- **Objetivo:** Registro encorajador e fiel ao percurso.
- **Exceções:** —
- **Impacto:** Validador (aviso); prompts de geração.
- **Validações:** Análise de proporção avanços/dificuldades; aviso quando só houver fragilidades.

### RN-CNT-008 — Não transcrever conteúdos da turma
- **Descrição:** Não se deve transcrever Conteúdos e Ações Didático-Pedagógicas no RAV individual (são da turma).
- **Origem:** [O-2024]; [F1-2024] Campo F.
- **Objetivo:** Foco no estudante, não no plano de aula.
- **Exceções:** —
- **Impacto:** Prompts; validador (aviso).
- **Validações:** Heurística de detecção de listas curriculares/planos de aula no texto.

### RN-CNT-009 — Registros condicionais por perfil do estudante
- **Descrição:** Perfis específicos exigem conteúdo adicional: SuperAção (ênfase nas aprendizagens alcançadas conforme Caderno do Programa); atendimento em Sala de Recursos/Equipe de Apoio (registrar impactos); infrequência (registrar ações de busca ativa); avanço de estudos (art. 233); transição da Educação Infantil (apropriação do RDIC pelo professor do BIA).
- **Origem:** [O-2024].
- **Objetivo:** Cobertura das obrigações específicas que o professor mais esquece.
- **Exceções:** Aplicável somente quando o perfil/situação existir.
- **Impacto:** Flags do estudante no Campo A dirigem checklist dinâmico do validador e instruções de geração.
- **Validações:** Regras condicionais: flag ativa + elemento ausente no texto = alerta específico com orientação.

## Bloco 3 — Resultado final (RN-RES)

### RN-RES-001 — Preenchimento restrito ao 4º bimestre
- **Descrição:** O Campo E (Resultado Final) só pode ser preenchido no RAV do 4º bimestre.
- **Origem:** [F1-2024] Campo E.
- **Exceções:** Nenhuma.
- **Impacto:** Editor (campo desabilitado nos bimestres 1–3); validador de exportação.
- **Validações:** Bloqueio de exportação com Campo E preenchido fora do 4º bimestre.

### RN-RES-002 — Domínio fechado de resultados
- **Descrição:** Valores possíveis: Cursando · Progressão Continuada · Avanço das Aprendizagens–Correção de Fluxo · Aprovado · Reprovado · Abandono. Seleção única.
- **Origem:** [F1-2024] Campo E.
- **Impacto:** Modelo de dados (enum); exportação.
- **Validações:** Constraint de domínio.

### RN-RES-003 — Consistência resultado × ano/bloco/perfil
- **Descrição:** O sistema valida a coerência do resultado com o ano do estudante: **Progressão Continuada** para 1º→2º, 2º→3º (1º Bloco) e 4º→5º (2º Bloco), e SuperAção Grupo 2→5º ano; **Aprovado** apenas para 3º e 5º anos (fim de bloco) e SuperAção Grupos 1 e 3 com avanço de 1 ano; **Reprovado** apenas para 3º ano, 5º ano, SuperAção Grupos 1/3 sem êxito, ou qualquer ano por excesso de faltas; **Cursando** para Adequação Curricular na Temporalidade; **Avanço–Correção de Fluxo** para SuperAção com objetivos de 2 anos consolidados.
- **Origem:** [F1-2024] Observações Gerais (f).
- **Objetivo:** Impedir resultado juridicamente inválido em documento de fé pública.
- **Exceções:** Casos extraordinários deliberados pelo Conselho de Classe — permitir override com justificativa registrada [PO].
- **Impacto:** Motor de regras; UX (opções incoerentes desabilitadas com explicação).
- **Validações:** Matriz de testes ano×resultado×perfil completa.

### RN-RES-004 — Regra dos 25% de faltas
- **Descrição:** Estudante que exceder 25% de faltas permitidas tem resultado **Reprovado**, em qualquer ano do 2º Ciclo. O sistema calcula %faltas = total de faltas / total de dias letivos (Campo A) e alerta a partir de 20% [PO].
- **Origem:** [F1-2024] Observações Gerais (f.2–f.4); Regimento Escolar.
- **Exceções:** Faltas justificadas conforme Regimento — decisão final é do conselho/professor; o sistema **alerta**, não decide [PO, filosofia].
- **Impacto:** Campo A (dados de frequência); validador do Campo E.
- **Validações:** Alerta de inconsistência se resultado ≠ Reprovado com faltas >25% sem justificativa registrada.

### RN-RES-005 — Sinal de infrequência bimestral
- **Descrição:** Para o 2º Ciclo, considera-se infrequente o estudante com 2 faltas injustificadas por semana; infrequência dispara a exigência de registro de busca ativa (RN-CNT-009).
- **Origem:** [O-2024], Portaria nº 33/2020.
- **Exceções:** —
- **Impacto:** Observações de frequência; checklist condicional.
- **Validações:** Se flag de infrequência ativa e texto sem menção a busca ativa → alerta.

## Bloco 4 — Fluxo e processo (RN-FLX)

### RN-FLX-001 — Ciclo bimestral
- **Descrição:** O RAV é produzido por estudante a cada bimestre (4 por ano letivo); o Formulário 1 registra o bimestre corrente, total de dias letivos e faltas.
- **Origem:** [O-2024]; [F1-2024] Campo A.
- **Impacto:** Modelo de dados (RAV ⟵ estudante × bimestre × ano letivo, unicidade); dashboard de progresso.
- **Validações:** Unicidade estudante+bimestre+ano; não permitir dois RAVs ativos para o mesmo período.

### RN-FLX-002 — Construção contínua
- **Descrição:** O RAV deve ser construído sistematicamente ao longo do processo e sistematizado ao final do bimestre. Na plataforma: observações registráveis a qualquer momento; geração e finalização ao fim do bimestre.
- **Origem:** [O-2024] (destaque em caixa alta no original).
- **Impacto:** O módulo de observações é o coração do produto (Visão §8); nudges de registro contínuo.
- **Validações:** Métrica OBJ-3 (observações/estudante/bimestre).

### RN-FLX-003 — Compartilhamento com a família a cada bimestre
- **Descrição:** O RAV finalizado deve ser compartilhado com responsáveis e com o estudante ao final de cada bimestre; a plataforma registra essa etapa no ciclo de status.
- **Origem:** [F1-2024] Observações Gerais (c).
- **Exceções:** —
- **Impacto:** Máquina de estados (Rascunho → Validado → Exportado → Assinado/Compartilhado).
- **Validações:** Estado final exige confirmação da entrega/ciência.

### RN-FLX-004 — Transferência do estudante
- **Descrição:** Em transferência, o Formulário 1 original assinado acompanha o estudante; a plataforma deve permitir exportar o histórico completo de RAVs do estudante e marca o estudante como transferido sem apagar dados (RN-SEG-005).
- **Origem:** [O-2024].
- **Impacto:** Ciclo de vida do estudante; exportação em lote.
- **Validações:** Estudante transferido sai das listas ativas; histórico permanece acessível/auditável.

### RN-FLX-005 — Versionamento e auditoria integral
- **Descrição:** Toda alteração de RAV gera versão com autor, timestamp e origem (humano/IA); versões são comparáveis (diff) e o histórico é imutável.
- **Origem:** [PO — requisito do briefing: rastreabilidade e auditoria completa].
- **Impacto:** Arquitetura de dados (event log/versões); UX de linha do tempo.
- **Validações:** Nenhuma escrita sem trilha; teste de reconstrução de qualquer versão.

## Bloco 5 — Inteligência Artificial (RN-IA)

### RN-IA-001 — Revisão humana obrigatória
- **Descrição:** Nenhum texto gerado por IA entra no documento exportável sem aceite explícito do professor. Não existe "gerar e exportar" em um passo.
- **Origem:** [PO — Filosofia da IA do projeto].
- **Exceções:** Nenhuma.
- **Impacto:** Fluxo do editor; anti-métrica de aceite cego (Visão §5).
- **Validações:** Trilha de auditoria comprova interação de revisão antes de toda exportação.

### RN-IA-002 — Geração ancorada em evidências (grounding)
- **Descrição:** A geração usa exclusivamente: observações registradas do estudante, dados do Campo A, referências do Currículo em Movimento e insumos digitados pelo professor no momento. É vedado ao sistema afirmar fatos sobre o estudante sem origem registrada.
- **Origem:** [PO — resposta arquitetural a RN-CNT-005 e ao risco de alucinação em documento de fé pública].
- **Exceções:** Texto conectivo/estrutural sem conteúdo factual.
- **Impacto:** Arquitetura de prompts; rastreabilidade evidência→texto; UI de fontes por trecho.
- **Validações:** Teste de alucinação: geração com evidências controladas não pode conter fatos externos; toda frase factual mapeável a uma fonte.

### RN-IA-003 — Explicabilidade das sugestões
- **Descrição:** Toda sugestão de IA (geração, reescrita, correção, apontamento do validador) é acompanhada de justificativa pedagógica/normativa e, quando aplicável, da regra (RN-*) ou evidência de origem.
- **Origem:** [PO — briefing: "sempre explique por que determinada sugestão foi realizada"].
- **Impacto:** UX; prompts; valor formativo (persona P3).
- **Validações:** Nenhuma sugestão renderizada sem campo de justificativa.

### RN-IA-004 — Registro de proveniência
- **Descrição:** Cada trecho do RAV registra proveniência: digitado pelo professor, gerado por IA (com modelo e versão de prompt), ou gerado e editado. A proveniência é auditável, não exibida no documento oficial.
- **Origem:** [PO — briefing: origem das sugestões; auditoria].
- **Impacto:** Modelo de dados; auditoria; métricas de confiança (H-5).
- **Validações:** Exportação oficial não contém marcas de IA; auditoria interna reconstrói a proveniência integral.

### RN-IA-005 — Validação pré-exportação
- **Descrição:** Todo RAV passa pelo pipeline de validação (RN-CNT-001..009, RN-RES-*) antes da exportação. Violações de vedação bloqueiam (com override justificado onde previsto); demais itens geram avisos visíveis.
- **Origem:** [PO, operacionalizando O-2024].
- **Impacto:** Pipeline de qualidade; UX do "pré-voo".
- **Validações:** Corpus de teste com violações conhecidas (recall ≥ meta H-2); log de overrides.

## Bloco 6 — Segurança e LGPD (RN-SEG)

### RN-SEG-001 — Pseudonimização antes de LLM externa
- **Descrição:** Dados pessoais de estudantes (nome, identificadores) são substituídos por tokens antes de qualquer envio a provedores externos de IA; a reidentificação ocorre exclusivamente dentro da plataforma.
- **Origem:** [PO — decisão de 06/07/2026]; [LGPD] arts. 6º (minimização) e 13.
- **Exceções:** Nenhuma.
- **Impacto:** Camada de anonimização na arquitetura de IA; contratos (DPA) com provedores.
- **Validações:** Teste automatizado: payloads de saída não contêm PII do dicionário de identificadores; auditoria de logs de chamadas.

### RN-SEG-002 — Minimização e finalidade
- **Descrição:** Coleta-se somente o necessário ao RAV (dados do Campo A + observações pedagógicas). Dados sensíveis não requeridos pelo formulário não têm campos dedicados.
- **Origem:** [LGPD] art. 6º, II e III; [O-2024] (sigilo ECA/LDB/LGPD).
- **Impacto:** Modelo de dados; formulários de cadastro.
- **Validações:** Revisão de schema contra a lista de campos do F1-2024.

### RN-SEG-003 — Papéis e acesso por vínculo
- **Descrição:** O professor acessa apenas estudantes de suas turmas; dados de estudante pertencem ao contexto da escola/turma, não ao acervo pessoal do professor.
- **Origem:** [PO]; [LGPD] princípio da necessidade.
- **Exceções:** Perfil revisor (coordenação) — roadmap.
- **Impacto:** Autorização (RBAC + escopo por vínculo); multi-tenancy.
- **Validações:** Testes de autorização negativa em todas as rotas.

### RN-SEG-004 — Sigilo qualificado
- **Descrição:** Informações socioemocionais/psicossociais sob sigilo (ECA, Regimento, LDB, LGPD) exigem cautela: a plataforma orienta o professor sobre o que registrar no documento versus o que manter em observação interna não exportável.
- **Origem:** [O-2024] ("resguardando-se os casos nos quais o sigilo precisa ser mantido").
- **Impacto:** Tipos de observação (exportável × interna); UX writing das orientações.
- **Validações:** Observações marcadas como internas nunca aparecem em texto gerado/exportado.

### RN-SEG-005 — Retenção e imutabilidade documental
- **Descrição:** RAVs finalizados são imutáveis (correção = nova versão) e retidos conforme obrigação de escrituração escolar; exclusão de conta do professor não apaga documentos oficiais produzidos, apenas desvincula dados pessoais do professor conforme LGPD.
- **Origem:** [O-2024] (dossiê do estudante); [LGPD] art. 16 (conservação para cumprimento de obrigação legal).
- **Impacto:** Política de retenção; fluxo de exclusão de conta; DPO.
- **Validações:** Teste do fluxo de exclusão; parecer jurídico a obter na fase de implantação [lacuna registrada].

---

## Pendências e lacunas desta versão

1. **Diretrizes de Avaliação 9dez24** ainda não ingeridas na íntegra — podem promover RN-CNT-007 a norma e ajustar RN-CNT-002 (conflito C3 registrado em `00-contexto`).
2. Regras do **Formulário 2** (campos A–H do Conselho de Classe) já extraídas em `00-contexto`, mas não normatizadas aqui — fora do MVP.
3. Percentual de faltas justificadas vs injustificadas no cômputo dos 25%: confirmar no Regimento Escolar (documento a ingerir).
4. Parecer jurídico LGPD (base legal: legítimo interesse vs execução de política pública) — Fase de implantação.

**Documentos impactados:** 02-PRD (RFs derivam destas regras), 04-Dados (enums, unicidades, versões), 07-UX (estados, bloqueios, avisos), 08-IA (pipeline de validação e grounding), 10-Testes (matrizes de validação), 11-Segurança (bloco RN-SEG).
