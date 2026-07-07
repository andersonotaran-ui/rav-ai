# Fontes Oficiais — Base de Conhecimento RAV AI

**Atualizado em:** 06/07/2026
**Status da Fase 0:** Fontes primárias localizadas em canais oficiais da SEEDF. Textos integrais dos dois documentos normativos do RAv já extraídos (ver `fatos-e-regras-extraidos.md`).

## 1. Documentos normativos do RAv (2º Ciclo — Anos Iniciais)

| Documento | Situação | Link oficial |
|-----------|----------|--------------|
| **Orientações para preenchimento dos Registros de Avaliação do 2º Ciclo** (versão 2024, Dief/Subeb) | ✅ Texto integral extraído | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/orientacoes-para-preenchimento-dos-registros-de-avaliacao-2024-pdf) |
| **RAv Formulário 1 — Descrição do Processo de Aprendizagem do Estudante** (versão 2024, modelo oficial) | ✅ Texto integral extraído | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/rav-formulario-1-2024-pdf) |
| **Ata do Conselho de Classe do 2º Ciclo** (Formulário 2, retificada em 11/02/2025) | 🔗 Localizado (fora do MVP) | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/ata-do-conselho-2o-ciclo-final-1-pdf) |
| **Diretrizes de Avaliação Educacional SEEDF** (versão publicada 9dez24) | 🔗 Localizado — ingestão integral pendente (PDF extenso; prioridade para o corpus RAG) | [educacao.df.gov.br](https://www.educacao.df.gov.br/wp-conteudo/uploads/2021/07/Diretrizes_avaliacao_Educacional_9dez24.pdf) |

## 2. Currículo em Movimento (corpus RAG)

| Documento | Situação | Link oficial |
|-----------|----------|--------------|
| Currículo em Movimento do DF — Ensino Fundamental (edição vigente, 2018) | 🔗 Localizado — ingestão pendente | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/curriculo_em_movimento_do_distrito_federal___ensino_fundamental__2018_-pdf-1) |
| Currículo em Movimento — Pressupostos Teóricos | 🔗 Localizado | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/curriculo_em_movimento_da_educacao_basica___pressupostos_teoricos) |
| Organização Curricular 2023 — 2º Ciclo | 🔗 Localizado | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/organizacao-curricular-2023-2o-ciclo-2-pdf) |
| Organização Curricular Programa SuperaÇão (2024) | 🔗 Localizado | [educacao.df.gov.br](https://www.educacao.df.gov.br/documents/d/seedf/programa-superacao-organizacao-curricular-pdf) |

Páginas-índice oficiais: [Formulários](https://www.educacao.df.gov.br/pedagogico-formularios/) · [Currículos](https://www.educacao.df.gov.br/pedagogico-curriculo-em-movimento/) · [Diretrizes e orientações](https://www.educacao.df.gov.br/pedagogico-diretrizes/)

## 3. Legislação citada nas fontes (referências normativas)

- **Lei nº 4.751/2012** (gestão democrática; art. 35 define o Conselho de Classe), alterada pela Lei 7.211/2022
- **Portaria nº 77, de 03/02/2009** — criou o RAv (substituiu o RDIA)
- **Regimento Escolar da Rede Pública do DF (2019)** — art. 233 (Avanço de Estudos); limite de 25% de faltas
- **Portaria nº 33/2020** — acompanhamento de frequência escolar (infrequência: 2 faltas injustificadas/semana no 2º Ciclo)
- **Portaria nº 133/2023 e Parecer nº 001/2023-CEDF** — Programa SuperaÇão (correção de fluxo)
- **Diretrizes Pedagógicas para Organização Escolar do 2º Ciclo** (p. 32 citada nas Orientações)
- ECA, LDB e **LGPD** — citadas nas Orientações 2024 quanto a sigilo de informações do estudante

## 4. Documentos internos do projeto

| Documento | Situação |
|-----------|----------|
| `RAV Formação.pptx` (formação CRAI Taguatinga) | ✅ Extraído — material de formação, **não normativo**; em caso de conflito, prevalecem as Orientações 2024 |
| Base do NotebookLM | ⏳ Aguardando envio pelo Anderson |
| PPP de escola de referência | ⏳ Aguardando envio |
| Exemplos reais de RAV (corretos/incorretos) | ⏳ Aguardando envio — **crítico para few-shot e testes de IA** |

## 5. Descobertas de escopo relevantes

- O RAv (Formulários 1 e 2) é exclusivo do **2º Ciclo (Anos Iniciais)**. Anos Finais (3º Ciclo) usam o **RFA — Registro Formativo de Avaliação**; Educação Infantil usa o **RDIC**; EJA 1º segmento usa variante do RAv. Confirma a decisão de MVP focado no Formulário 1 dos Anos Iniciais, com expansão natural para RFA/RDIC no roadmap.
- A SEEDF usa o sistema de gestão **i-Educar** (campo do Formulário 1 menciona estudante "setado" no i-Educar) — alvo prioritário de integração futura.
- O formulário oficial **não pode ter estrutura alterada** (fé pública) — a exportação deve reproduzir fielmente o modelo oficial 2024.
