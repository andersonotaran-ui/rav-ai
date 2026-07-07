# 01 — Product Vision · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Base documental:** `docs/00-contexto/fontes-oficiais.md` e `docs/00-contexto/fatos-e-regras-extraidos.md`
**Decisões que fundamentam este documento:** MVP = Formulário 1 do RAv · Público inicial = rede pública DF, Anos Iniciais (2º Ciclo) · Modelo B2C freemium para o professor · Uso híbrido: celular para observar, desktop para redigir · Pseudonimização antes de envio a LLMs externas

---

## 1. Declaração de Visão

> **Para** professores dos Anos Iniciais da rede pública do DF, **que** precisam elaborar a cada bimestre dezenas de Registros de Avaliação individualizados, normativamente corretos e com fé pública, **o RAV AI é** um copiloto pedagógico **que** transforma observações rápidas do dia a dia em RAVs de alta qualidade — individualizados, conformes às normas da SEEDF e livres de vieses — em uma fração do tempo. **Diferentemente de** escrever do zero no editor de texto ou reciclar textos-padrão (prática vedada pela norma), **o RAV AI** ancora cada frase em evidências reais do estudante, valida o texto contra as regras oficiais e mantém o professor no controle de cada palavra.

Em uma frase: **devolver tempo ao professor sem tirar dele a autoria pedagógica.**

## 2. Definição do Problema

### 2.1 O problema

O professor regente dos Anos Iniciais elabora, a cada bimestre, um RAV por estudante — texto descritivo, individualizado e reflexivo que deve articular diagnóstico, aprendizagens evidenciadas, dificuldades, intervenções, resultados e ações futuras, em conformidade com o Currículo em Movimento, o PPP e as Diretrizes de Avaliação [O-2024]. O documento tem fé pública, compõe o dossiê do estudante, acompanha transferências e é compartilhado com a família [O-2024].

As dores estruturais:

1. **Volume e prazo comprimidos.** Uma turma típica tem 25–35 estudantes; são 4 bimestres. A norma exige construção contínua "ao longo do processo", mas na prática a escrita concentra-se na semana que antecede o conselho de classe. *(Volumetria e tempo médio por RAV: hipóteses H-V1/H-V2, a validar em discovery.)*
2. **Exigência de individualização sob pressão.** A norma **proíbe** textos fragmentados ou em formato-padrão [O-2024 §4]. Individualizar dezenas de textos sob prazo é exatamente o que gera cópia-e-cola — o professor é empurrado para a infração que a norma quer evitar.
3. **Risco normativo e ético invisível.** Rótulos, juízo de valor, termos desabonadores sobre a família e classificações técnicas descontextualizadas são vedados [O-2024 §4], mas não há nenhum mecanismo de verificação antes da assinatura — o erro só aparece quando o documento já circulou.
4. **Memória pedagógica dispersa.** As evidências que sustentam o RAV (observações, portfólios, diários, intervenções) vivem em cadernos, planilhas e na memória do professor. No fim do bimestre, reconstruir o percurso de cada criança é um exercício de arqueologia.
5. **Ausência de ferramenta dedicada.** O fluxo real hoje é editor de texto genérico + formulário oficial em PDF/Word + impressão para assinaturas. Nenhuma etapa conhece as regras do RAV.

### 2.2 Por que agora

- A norma 2024 reforçou exigências (SuperAção, busca ativa, socioemocional) — o RAV ficou mais complexo, não menos.
- LLMs atingiram qualidade suficiente para escrita pedagógica assistida **com** validação de conformidade — mas o uso improvisado (ChatGPT genérico) produz exatamente o texto-padrão vedado e expõe dados de menores sem proteção.
- Professores já usam IA por conta própria; a alternativa ao RAV AI não é "sem IA", é "IA sem conformidade, sem LGPD e sem pedagogia".

### 2.3 O que o problema NÃO é

Não é automatizar a avaliação. A reflexão pedagógica é do professor e o valor do RAV está nela [Filosofia do projeto; O-2024]. O problema é o **custo mecânico** de transformar essa reflexão em texto conforme — é isso que o produto ataca.

## 3. Objetivos

### 3.1 Objetivos de produto (horizonte 12–18 meses)

| ID | Objetivo | Ligação |
|----|----------|---------|
| OBJ-1 | Reduzir em ≥50% o tempo de elaboração do RAV, mantendo ou elevando a qualidade | H-1 |
| OBJ-2 | Elevar a conformidade normativa: ≥95% dos RAVs exportados sem violações das regras de conteúdo proibido | H-2 |
| OBJ-3 | Tornar o registro contínuo de observações um hábito: mediana ≥4 observações/estudante/bimestre | H-3 |
| OBJ-4 | Alcançar adoção orgânica B2C: 1.000 professores ativos no DF em 12 meses pós-lançamento | H-4 |
| OBJ-5 | Sustentar confiança: ≥80% das sugestões de IA revisadas/aceitas conscientemente (não aceite cego), medido por interação com diffs e explicações | H-5 |

### 3.2 Objetivos de negócio

Validar disposição a pagar do professor (plano individual) até o 2º bimestre pós-lançamento; converter tração B2C em credencial para conversas B2B (escolas particulares com instrumentos próprios) e B2G (SEDF) no médio prazo.

### 3.3 Não-objetivos (por ora)

Formulário 2 (Conselho de Classe); Anos Finais (RFA) e Educação Infantil (RDIC); integração com i-Educar (dependência externa — roadmap); assinatura digital com validade legal; substituir o diário de classe oficial.

## 4. Hipóteses

Formato: *Acreditamos que… Saberemos que é verdade quando…*

| ID | Hipótese | Critério de validação | Risco se falsa |
|----|----------|----------------------|----------------|
| H-1 | O gargalo do professor é a redação, não a reflexão; geração ancorada em evidências reduz o tempo por RAV em ≥50% | Teste com 5–10 professores: tempo medido antes/depois | Pivotar para foco em organização de evidências |
| H-2 | O validador (conteúdo proibido + rubrica de qualidade) detecta violações com precisão suficiente para o professor confiar | ≥90% de concordância entre validador e avaliação de especialista (CRAI/coordenação) em corpus de teste | Reposicionar validador como "sugestão", investir em exemplos reais |
| H-3 | Professores registram observações continuamente **se** o registro custar <30s no celular | Coorte piloto: % de professores com ≥1 observação/semana após 4 semanas | Reforçar o fluxo "gerar a partir de pouco insumo" + importação de anotações existentes |
| H-4 | O professor adota individualmente (sem mandato da escola) uma ferramenta gratuita que resolve o RAV | CAC orgânico ~0; crescimento por indicação entre colegas ≥30% dos signups | Mudar go-to-market para coordenações/escolas |
| H-5 | Rastreabilidade evidência→texto e explicações aumentam aceitação das sugestões | Comparação A/B: taxa de aceitação e confiança declarada com/sem explicações | Simplificar UI removendo camada de explicação |
| H-6 | Existe disposição a pagar individual (referência: R$ 15–30/mês) por tempo economizado | ≥5% de conversão free→pago na coorte piloto | Monetizar via escolas (B2B) mantendo professor grátis |
| H-V1 | Volumetria: 25–35 estudantes/turma; professor com 1 turma (regência) | Confirmar em discovery com professores | Recalibrar OBJ-3 e pricing |
| H-V2 | Tempo atual por RAV: 30–60 min (redação) + tempo de reconstrução de memória | Medir em discovery | Recalibrar OBJ-1 |

**Compromisso de discovery:** H-V1, H-V2 e H-1 devem ser confrontadas com 5+ professores reais dos Anos Iniciais antes do congelamento do PRD.

## 5. Indicadores

**North Star Metric: RAVs finalizados e exportados com apoio da plataforma por bimestre.** Captura valor entregue (documento pronto), recorrência (bimestral) e profundidade de uso.

| Dimensão | Indicador | Meta inicial |
|----------|-----------|--------------|
| Ativação | % de novos usuários que exportam 1º RAV em ≤14 dias | ≥40% |
| Valor | Tempo mediano de elaboração por RAV (medido in-app) | ≤50% da baseline de discovery |
| Qualidade | % de RAVs exportados sem violações do validador | ≥95% |
| Qualidade | Score médio na rubrica de qualidade (6 critérios [PPTX §5]) | ≥4/6 critérios atendidos com evidência |
| Hábito | Observações por estudante por bimestre (mediana) | ≥4 |
| Retenção | % de professores ativos no bimestre seguinte | ≥60% |
| Confiança | Taxa de edição pós-geração (proxy de autoria; nem 0% nem 100%) | 20–80% dos RAVs com edição humana |
| Negócio | Conversão free→pago | ≥5% |
| Recomendação | NPS professor | ≥50 |

Anti-métrica vigiada: **% de RAVs aceitos sem nenhuma revisão humana** — se crescer, o produto está induzindo automação irrefletida e o fluxo de revisão precisa de mais fricção intencional.

## 6. Stakeholders

| Stakeholder | Papel | Interesse | Influência | Estratégia |
|-------------|-------|-----------|-----------|------------|
| Professor(a) regente | Usuário primário e cliente (B2C) | Tempo, segurança normativa, autoria | Alta | Centro de todas as decisões de UX |
| Coordenador(a) pedagógico(a) | Revisor; assina o Formulário 1 | Qualidade e consistência dos RAVs da escola | Alta | Persona secundária; potencial canal de adoção |
| Demais professores da turma (PECM, Integral, Sala de Recursos) | Coautores do RAV [O-2024] | Contribuir sem retrabalho | Média | Colaboração multi-professor no roadmap pós-MVP |
| Gestão escolar | Responsável pela escrituração | Conformidade, prazos, dossiês | Média | Beneficiário indireto; futura porta B2B |
| Família/responsável | Assina e recebe o RAV | Compreender o desenvolvimento da criança | Média | Legibilidade do texto como critério de qualidade |
| Estudante | Titular dos dados; sujeito do registro | Registro justo, sem rótulos | Baixa (direta) / Central (ética) | Anti-viés e LGPD como pilares |
| SEDF / CRE / Dief-Subeb | Regulador; define o formulário | Fé pública, aderência ao modelo oficial | Alta (indireta) | Fidelidade absoluta ao formato oficial; relação institucional futura |
| CRAI / formadores | Formam professores no RAV | Qualidade da escrita na rede | Média | Aliados potenciais para validação da rubrica (H-2) |
| ANPD / LGPD | Marco legal | Proteção de dados de menores | Alta | Pseudonimização, minimização, transparência desde o design |

## 7. Personas

### P1 — Professora Regente (primária): "Ana, 38, 3º ano do BIA"

Efetiva da SEDF há 12 anos, regente de uma turma de 28 crianças em Ceilândia. Usa o celular o dia todo (WhatsApp é sua ferramenta de trabalho informal), computador em casa à noite. Anota percepções sobre os alunos em um caderno e na memória.

- **Dores:** a semana do RAV é "a pior do bimestre"; medo de escrever algo indevido sobre uma criança; sensação de que os textos ficam parecidos apesar do esforço; alunos do SuperAção e com adequação curricular exigem registros extras que ela nunca tem certeza de estar fazendo certo.
- **Ganhos esperados:** terminar os RAVs em dias, não semanas; segurança de conformidade; reencontrar nas observações registradas o percurso real de cada criança.
- **Relação com IA:** curiosa, já testou ChatGPT para o RAV e não confiou no resultado ("genérico e inventava coisas"). Precisa ver **de onde** veio cada informação.
- **Critério de sucesso dela:** "parece que fui eu que escrevi — eu no meu melhor dia."

### P2 — Coordenador Pedagógico (secundária): "Marcos, 45"

Revisa e assina dezenas de RAVs por bimestre. Devolve textos com rótulos ou sem evidência de intervenção — e vira "o chato" da escola.

- **Dores:** revisão manual repetitiva; orientar a reescrita sem ferramenta; heterogeneidade enorme entre professores.
- **Ganhos:** RAVs que chegam pré-validados; painel de pendências da escola (visão futura B2B).
- **Papel no produto:** hoje beneficiário indireto; no roadmap, perfil revisor.

### P3 — Professor em início de carreira / contrato temporário (secundária): "Júlia, 26"

Primeiro ano de regência, pouco repertório da escrita do RAV, alta ansiedade normativa. Aprende o gênero textual **usando** a ferramenta (os porquês das sugestões funcionam como formação em serviço).

- **Insight de produto:** a explicação pedagógica de cada sugestão não é custo — é o produto ensinando a escrever RAV, valor que nenhum atalho de IA genérica entrega.

## 8. Proposta de Valor

**Para o professor:** *"Registre em 30 segundos. Receba um RAV que parece seu. Assine com segurança."*

| Dor | Alívio | Como |
|-----|--------|------|
| Semanas de escrita no fim do bimestre | Horas, não semanas | Geração ancorada nas observações acumuladas |
| Medo de infringir a norma | Validação antes da assinatura | Motor anti-viés + checklist normativo (regras [O-2024 §3–4] parametrizadas) |
| Textos que ficam iguais | Individualização real | Rastreabilidade evidência→texto: cada frase aponta sua origem; sem observação, sem afirmação |
| Memória pedagógica dispersa | Linha do tempo por estudante | Observações rápidas no celular, organizadas automaticamente |
| Formulário oficial rígido | Exportação fiel ao modelo 2024 | Saída idêntica ao F1-2024, campos A–G, pronta para imprimir e assinar |
| Registros extras (SuperAção, TEA, busca ativa) | Guias contextuais | O sistema sabe o que a norma exige para cada perfil de estudante |

**Diferenciais defensáveis** frente a IA genérica: (1) conformidade normativa SEDF embutida e versionada; (2) anti-viés pedagógico como validador de primeira classe; (3) rastreabilidade evidência→texto — a IA não inventa porque só escreve sobre o que foi observado; (4) LGPD by design com pseudonimização; (5) exportação com fidelidade de fé pública.

## 9. Princípios de Experiência

Diretriz do Product Owner: *simples, bonito, intuitivo, com usabilidade avançada — e que entregue valor.* Traduzido em princípios verificáveis, que vincularão o doc 07-UX:

1. **Regra dos 30 segundos.** Registrar uma observação no celular: ≤30s, ≤3 toques até o campo de texto, com voz-para-texto. Se o registro custa mais que isso, o hábito (H-3) morre.
2. **Zero manual.** Um professor sem treinamento gera seu primeiro RAV na primeira sessão. Onboarding é fazer, não assistir: o fluxo guiado (turma → estudantes → observar → gerar) é a própria interface.
3. **O professor decide — visivelmente.** Toda sugestão de IA chega como proposta editável com o porquê e a evidência de origem. Aceitar exige gesto explícito. Nenhum texto vai ao documento final sem passar pelos olhos do professor.
4. **Nada se perde, nunca.** Autosave contínuo, rascunhos resilientes a queda de conexão, histórico de versões. A confiança de que "está salvo" é pré-condição para usar em janelas curtas de tempo.
5. **Calmo e bonito.** Interface sóbria, tipografia generosa, uma ação primária por tela, sem gamificação ruidosa. O professor chega cansado; a estética deve baixar a carga cognitiva, não competir por atenção. (Stack shadcn/ui + Tailwind com design system próprio — doc 07.)
6. **Linguagem de professor, não de sistema.** UX writing no vocabulário do domínio (bimestre, turma, observação, intervenção, conselho) — nunca "registro processado com sucesso".
7. **Progresso visível.** "18 de 28 RAVs prontos" — o professor vê o bimestre andando. Senso de avanço é o motor emocional do produto.

## 10. Riscos específicos da visão

| Risco | Mitigação na visão |
|-------|--------------------|
| Produto percebido como "máquina de burlar o RAV" por gestores/formadores | Posicionamento público: ferramenta de qualificação (rubrica, explicações, anti-viés); buscar aliados no CRAI cedo |
| SEDF alterar o formulário 2025/2026 | Regras e template versionados por ano letivo desde o MVP |
| B2C com professor de baixa renda discricionária | Freemium generoso no valor central; pago em conveniências (voz ilimitada, histórico multi-ano, exportações) |
| IA "alucinar" progresso não observado — risco máximo: documento com fé pública | Rastreabilidade evidência→texto como restrição arquitetural (a geração só usa observações registradas), não como feature |

## 11. Rastreabilidade

Este documento deriva de: fatos F01–F11 e regras extraídas em `00-contexto/fatos-e-regras-extraidos.md`; decisões do PO registradas em 06/07/2026; lacunas remanescentes (exemplos reais de RAV, NotebookLM, PPP) seguem em `00-contexto/fontes-oficiais.md §4`. Documentos impactados a seguir: **02-PRD** (herda objetivos, personas, não-objetivos), **05-Regras de Negócio** (herda §§3–4 dos fatos extraídos), **07-UX** (herda §9), **08-IA** (herda H-2, H-5, risco de alucinação).
