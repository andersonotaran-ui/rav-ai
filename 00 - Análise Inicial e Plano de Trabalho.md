# RAV AI — Análise Inicial da Base de Conhecimento e Plano de Trabalho

**Status:** Aguardando validação do Product Owner (Anderson)
**Data:** 06/07/2026
**Autores:** Equipe multidisciplinar RAV AI

---

## 1. O que a base de conhecimento contém hoje

A base atual possui **um único documento**: `RAV Formação.pptx` (38 slides, formação de professores do CRAI Taguatinga / SEDF). Apesar de único, ele é valioso — dele extraímos fatos fundacionais que já orientam o produto:

### 1.1 Fatos extraídos (com origem)

| # | Fato | Origem (slide) |
|---|------|----------------|
| F01 | O RAV acompanha a história da construção da aprendizagem do estudante em um período, via observação, reflexão e intervenções pedagógicas | 4 |
| F02 | Existem dois formulários: **Formulário 1** (Descrição do Processo de Aprendizagem do Estudante, Anos Iniciais) e **Formulário 2** (Ata de Conselho de Classe) | 5 |
| F03 | O RAV dos Anos Iniciais tem **três partes obrigatórias**: (1) **Diagnose** — o que o estudante sabe e precisa saber; (2) **Intervenção** — o que foi realizado e o que mudou no período; (3) **Prescrição** — o que pode ser feito, com parecer final: *aprovado com êxito* ou *aprovado com necessidade de maior acompanhamento* | 11 |
| F04 | O registro deve evidenciar: diagnóstico (objetivos de aprendizagem), percurso, dificuldades, estratégias/intervenções, resultados das intervenções, outras informações de função formativa — articulados ao **Currículo em Movimento** e ao **PPP** | 7, 15 |
| F05 | O RAV **não deve conter**: características pessoais, rótulos, expressões constrangedoras, avaliação informal, julgamentos sobre família ou condições sociais, situações que não qualificam o processo de ensino-aprendizagem | 12–13 |
| F06 | Deve registrar contribuições de projetos/atendimentos: Educação com Movimento, SEAA, Educação Integral | 16 |
| F07 | Existe uma rubrica de análise de qualidade do RAV com 6 perguntas (objetivos claros? percurso evidente? reflexões do professor? intervenções evidenciadas? contribuições de projetos? orientação ao professor?) | 16 |
| F08 | A avaliação que só aponta fragilidades, sem progressos, é "perigosa e desencorajadora" (Hoffman, 2005) — o registro deve equilibrar avanços e necessidades | 17 |
| F09 | O Conselho de Classe é colegiado previsto na **Lei 4.751/2012 (DF)**; registro por bimestre, individualizado, com participação de docentes, gestão, especialistas, pais, apoio especializado | 25–27 |
| F10 | Norma de referência: **Diretrizes de Avaliação Educacional da SEDF** (SUBEB) | 38 |
| F11 | Periodicidade do registro: **bimestral** | 11, 27 |

### 1.2 Implicações diretas para o produto

- **F03 define o modelo de domínio do RAV**: Diagnose → Intervenção → Prescrição. Isso deve estruturar entidade, editor, prompts e validador.
- **F05 é a especificação nascente do motor de validação anti-viés** — provavelmente o diferencial mais defensável do produto: detectar rótulos, julgamentos e avaliação informal no texto.
- **F07 é a especificação nascente do validador de qualidade pedagógica** — as 6 perguntas viram checklist automatizado com evidências.
- **F08 vira regra de escrita**: todo RAV deve apontar progressos, não apenas dificuldades.
- **F04/F06 definem os tipos de observação** que o módulo de registro contínuo precisa suportar.

---

## 2. Lacunas de informação (bloqueadoras e não bloqueadoras)

### Bloqueadoras (impedem PRD/regras definitivas)

| ID | Lacuna | Impacto |
|----|--------|---------|
| L01 | **Diretrizes de Avaliação Educacional SEDF** (texto integral) | Fonte normativa primária; sem ela, regras ficam baseadas em material de formação de segunda mão |
| L02 | **Modelos oficiais dos Formulários 1 e 2** (campos exatos, estrutura, limites) | Define o schema de dados, o editor e o formato de exportação |
| L03 | **Exemplos corretos e incorretos de RAV** | Insumo essencial para few-shot prompting, calibração do validador e testes de IA |
| L04 | **Currículo em Movimento** (objetivos de aprendizagem por ano) | Base do RAG: a diagnose referencia objetivos de aprendizagem por ano/componente |
| L05 | Em qual sistema o RAV é entregue hoje (i-Educar/SIGE/papel?) e em que formato a SEDF aceita | Define exportação e integração futura |

### Não bloqueadoras (necessárias antes da arquitetura final)

| ID | Lacuna |
|----|--------|
| L06 | PPP de escola(s) de referência |
| L07 | Base do NotebookLM mencionada no briefing (ainda não enviada) |
| L08 | Escopo etário: só Anos Iniciais? Educação Infantil (RDIA) e Anos Finais entram? |
| L09 | Público: apenas rede pública do DF ou também privadas / outras redes (visão nacional)? |
| L10 | Modelo de negócio: quem paga (professor, escola, secretaria)? Impacta multi-tenancy e LGPD |
| L11 | Volumetria: nº de escolas/professores/estudantes-alvo; picos de fim de bimestre |
| L12 | Existe rubrica oficial de qualidade além do roteiro do slide 16? |

---

## 3. Dúvidas que impactam o produto

1. O professor redige o RAV por estudante, por bimestre — quantos estudantes por professor em média (25–35 × 4 bimestres)? Isso dimensiona o ganho de tempo prometido.
2. O texto final precisa seguir limite de tamanho/campo único ou seções separadas (Diagnose/Intervenção/Prescrição)?
3. A "decisão de aprovado com êxito / com necessidade de acompanhamento" ocorre só no fim do ano ou por bimestre?
4. Dados de estudantes (menores): a escola/secretaria será controladora e a plataforma operadora (LGPD)? Haverá termo com a rede?
5. É aceitável enviar dados pseudonimizados a LLMs externas (Claude/OpenAI), ou há exigência de dados em território nacional / modelo dedicado?
6. Professores usarão em qual dispositivo predominante (celular vs. computador da escola)? Impacta profundamente o UX do registro rápido de observações.
7. Haverá coordenador/gestor com papel de revisão do RAV antes da entrega oficial?
8. Existe calendário oficial (datas de conselho de classe/entrega) que o sistema deva conhecer?

---

## 4. Melhorias de escopo propostas

1. **Motor de validação anti-viés como produto de primeira classe** (não feature secundária): classificador que detecta as categorias proibidas do F05 com explicação e sugestão de reescrita. É o maior diferencial ético e pedagógico.
2. **Observações contínuas como coração do produto**: o RAV de qualidade nasce de registros ao longo do bimestre, não da véspera. O fluxo "micro-registro de 30 segundos → RAV gerado com evidências" é a proposta de valor central. A geração sem observações acumuladas deve existir, mas ser tratada como caminho degradado.
3. **Rastreabilidade evidência→texto**: cada trecho do RAV gerado deve apontar para as observações que o sustentam. Resolve auditoria, confiança do professor e a exigência "explique por que sugeriu".
4. **Equilíbrio formativo automático** (F08): o validador verifica se o texto aponta progressos além de dificuldades.
5. **Conselho de Classe (Formulário 2) fora do MVP**: domínio distinto (colegiado, ata, quantitativos da turma). Sugerimos Fase 2 para não diluir o MVP.
6. **Multi-tenant desde a modelagem** (rede → escola → turma), mesmo lançando só no DF — preparar crescimento nacional sem custo agora.
7. **Modo rascunho com salvamento agressivo**: professores escrevem em janelas curtas e conexões instáveis; perda de texto é o defeito que mata a confiança no produto.

---

## 5. Arquitetura da documentação proposta

Estrutura de pastas no workspace, seguindo o briefing (com dois acréscimos):

```
/docs
  00-contexto/            ← NOVO: base de conhecimento, fatos extraídos, glossário, decisões (ADRs)
  01-product-vision/
  02-prd/
  03-arquitetura/
  04-banco-de-dados/
  05-regras-de-negocio/
  06-apis/
  07-ux/
  08-inteligencia-artificial/
  09-desenvolvimento/
  10-testes/
  11-seguranca-lgpd/
/base-conhecimento        ← NOVO: documentos oficiais originais (PPTX, PDFs, exemplos)
```

Convenções: cada regra de negócio com ID (`RN-XXX`) e origem documental; cada requisito com ID (`RF-XXX`/`RNF-XXX`); referências cruzadas por ID; ADRs numerados para decisões arquiteturais.

---

## 6. Plano de trabalho em fases

**Fase 0 — Consolidação da base de conhecimento** *(bloqueadora, depende de você)*
Coleta dos documentos L01–L07; extração estruturada de fatos e regras com origem; glossário do domínio.

**Fase 1 — Discovery e Product Vision** *(doc 01)*
Problema, hipóteses, indicadores, stakeholders, personas, proposta de valor. Entrevistas/validação com 2–3 professores reais, se possível.

**Fase 2 — Regras de Negócio + PRD** *(docs 05 e 02)*
Regras extraídas primeiro (elas nascem dos documentos oficiais), depois PRD com escopo, MVP e roadmap. Regras antes do PRD evita requisitos inventados.

**Fase 3 — UX + Arquitetura de IA** *(docs 07 e 08)*
Jornadas, mapa de navegação, wireframes; em paralelo, fluxo dos agentes, estratégia RAG, prompts, validadores. UX e IA juntos porque o editor assistido é a interseção crítica.

**Fase 4 — Arquitetura de Solução + Dados + APIs** *(docs 03, 04 e 06)*
Clean Architecture, contextos DDD, modelo de dados multi-tenant, pgvector, contratos de API.

**Fase 5 — Plano de Desenvolvimento + Testes** *(docs 09 e 10)*
Épicos, user stories, critérios de aceite, plano de testes (incluindo testes de IA com os exemplos corretos/incorretos).

**Transversal — Segurança e LGPD** *(doc 11)*
Inicia na Fase 1 (mapeamento de dados pessoais de menores) e evolui em todas as fases. Não é fase final: é requisito de projeto.

**Ordem de construção:** 00 → 01 → 05 → 02 → 07 ∥ 08 → 03 → 04 → 06 → 09 → 10, com 11 transversal.

---

## 7. Riscos identificados

| Risco | Severidade | Mitigação |
|-------|-----------|-----------|
| Base normativa insuficiente → regras inventadas | Alta | Fase 0 bloqueadora; nenhuma regra sem origem documental |
| LGPD: dados sensíveis de menores em LLMs externas | Alta | Pseudonimização antes do envio; DPA com provedores; avaliar exigências da rede |
| IA gerar texto genérico que "todos os RAVs ficam iguais" | Alta | Geração ancorada em observações reais; rastreabilidade evidência→texto; variação estilística controlada |
| Professor aceitar sugestões sem revisão (automação irrefletida) | Média | Fricção intencional de revisão; diffs visíveis; parecer final sempre manual |
| Mudança de normas pela SEDF | Média | Regras versionadas e parametrizadas, não hard-coded |
| Conflito entre documentos (formação vs. diretrizes) | Média | Protocolo já definido: expor conflito antes de resolver |

---

*Próximo passo: validação deste plano e resposta às questões-chave. Nenhum documento da estrutura será produzido antes disso.*
