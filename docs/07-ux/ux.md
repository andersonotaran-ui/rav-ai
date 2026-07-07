# 07 — UX · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Depende de:** 01-Visão §9 (princípios de experiência) · 02-PRD §§6–8 (jornadas, fluxos, RFs) · 05-RNs (estados, bloqueios)
**Stack de UI:** Next.js + Tailwind + shadcn/ui, PWA responsivo. Mobile-first no módulo Observar; desktop-first no Editor.

---

## 1. Princípios aplicados (contrato com a Visão §9)

Cada decisão de tela abaixo referencia: **P-30s** (registrar em ≤30s), **P-ZeroManual**, **P-ProfessorDecide**, **P-NadaSePerde**, **P-Calmo**, **P-LínguaDeProfessor**, **P-ProgressoVisível**.

## 2. Design System — "Caderno"

Nome interno do design system: **Caderno** — remete ao caderno de observações do professor, não a um sistema corporativo.

### 2.1 Fundações

| Token | Decisão | Racional |
|-------|---------|----------|
| Cor primária | Verde-escuro sóbrio (`#1E5E45` aprox.) | Educação/DF sem cair no azul-sistema genérico; transmite calma (P-Calmo) |
| Cor de apoio | Areia/off-white quente para superfícies; grafite para texto | Leitura longa confortável no editor |
| Semânticas | Sucesso verde · Aviso âmbar · Bloqueio vermelho-terroso · IA lilás discreto | IA tem cor própria: tudo que é sugestão de máquina é visualmente distinguível (P-ProfessorDecide) |
| Tipografia | Serif humanista para o texto do RAV no editor (ex.: Source Serif); sans (Inter) para UI | O texto do documento parece documento; a UI desaparece |
| Escala tipográfica | Corpo 16px mínimo; editor 18px | Professores +40 anos, fim do dia, telas pequenas |
| Espaçamento | Base 4px; densidade confortável, uma ação primária por tela | P-Calmo |
| Raio/elevação | Cantos suaves, sombras mínimas | Estética de papel, não de dashboard |
| Modo escuro | Fora do MVP | Corte consciente |

### 2.2 Regra de ouro da cor lilás (IA)

Todo conteúdo proposto por IA e ainda não aceito aparece em superfície lilás com selo "Sugestão". Após o aceite, torna-se texto normal (proveniência segue registrada — RN-IA-004). O usuário sempre sabe, de relance, o que é dele e o que é proposta.

## 3. Mapa de Navegação

### Mobile (bottom bar, 4 itens)

```
[ Início ]  [ + Observar ]  [ Turma ]  [ Ajustes ]
```

- **+ Observar** é o botão central, maior, sempre visível — a ação nº 1 do produto (P-30s).
- **Início:** progresso do bimestre + últimos registros + nudge (RF-071).
- **Turma:** lista de estudantes → perfil do estudante (linha do tempo, RAVs).
- **Ajustes:** conta, turma, bimestres, plano.

### Desktop (sidebar)

```
RAV AI
├── Painel            (progresso do bimestre, pendências)
├── Observações       (feed + registro rápido)
├── Estudantes        (lista → perfil → linha do tempo)
├── RAVs do bimestre  (tabela de status → editor)
├── Exportações
└── Ajustes (turma · bimestres · conta · plano)
```

Profundidade máxima: 3 níveis. Nenhuma função essencial a mais de 2 cliques do Painel.

## 4. Fluxos e Wireframes (telas-chave)

### 4.1 F-02 · Observação rápida (mobile) — a tela mais importante do produto

```
┌─────────────────────────────┐
│ Nova observação          ✕  │
│                             │
│ ┌─ Quem? ─────────────────┐ │
│ │ (recentes)  ○ Maria     │ │
│ │ ○ João  ○ Pedro  🔍     │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ "Hoje a Maria leu o     │ │
│ │ parágrafo sozinha e..." │ │
│ │                    🎤   │ │
│ └─────────────────────────┘ │
│                             │
│ Aprendizagem · Dificuldade  │
│ Intervenção · Resultado     │
│ Socioemocional🔒 · Outra    │
│                             │
│ [        Salvar         ]   │
└─────────────────────────────┘
```

- Abre já com teclado ativo e estudantes recentes no topo (P-30s: ≤3 toques).
- 🎤 = voz-para-texto (RF-021), botão grande, segura-e-fala.
- Tipo é opcional no salvamento (classificação sugerida por IA depois, confirmável) — não bloquear o hábito com burocracia.
- "Socioemocional" já nasce marcada como **interna 🔒** (RN-SEG-004), alterável com aviso claro do que significa exportável.
- Salvar mostra confirmação de 1s e volta ao contexto anterior. Zero telas intermediárias.
- Offline: salva local e sincroniza (P-NadaSePerde); indicador discreto "aguardando conexão".

### 4.2 F-03 · Editor do RAV (desktop) — layout de 3 zonas

```
┌──────────────┬──────────────────────────────┬─────────────────┐
│ EVIDÊNCIAS   │  CAMPO B — Maria · 2º bim.   │ QUALIDADE       │
│ (12)         │                              │                 │
│ ☑ 12/04 leu  │  Maria iniciou o bimestre    │ ✅ Diagnóstico   │
│   parágrafo… │  demonstrando… [●12/04]      │ ✅ Percurso      │
│ ☑ 03/05 difi-│                              │ ⚠ Falta ação    │
│   culdade…   │  Nas situações de leitura    │   p/ próximo    │
│ ☐ 20/05 🔒   │  coletiva… [●03/05][●17/05]  │   bimestre      │
│   (interna)  │                              │ ⛔ Rótulo:      │
│              │  ┌─ Sugestão IA ───────────┐ │   "preguiçosa"  │
│ [+ incluir   │  │ (lilás) Recomenda-se…   │ │   → reescrever  │
│  anotação]   │  │ Por quê? · Aceitar ✓ ✗  │ │                 │
│              │  └───────────────────────┘ │ [Validar tudo]  │
├──────────────┴──────────────────────────────┴─────────────────┤
│ ⟳ salvo às 14:32  ·  v4  ·  [Gerar seção ▾] [Melhorar escrita]│
└────────────────────────────────────────────────────────────┘
```

- **Zona 1 Evidências:** observações do bimestre com checkbox de inclusão (RF-030); internas 🔒 visíveis mas não incluíveis; clique em `[●data]` no texto destaca a evidência de origem (RF-031) — a rastreabilidade é bidirecional.
- **Zona 2 Texto:** serif 18px; estrutura guiada por marcadores de seção discretos (diagnóstico → percurso → resultados → próximos passos, RN-CNT-002); sugestões IA em lilás com "Por quê?" (RF-032) e aceite explícito (RF-033).
- **Zona 3 Qualidade:** checklist vivo (RF-040) — ✅/⚠/⛔ com clique levando ao trecho; sempre visível, atualiza enquanto escreve; é o "corretor ortográfico normativo".
- Rodapé: autosave com horário (P-NadaSePerde), versão atual, ações de IA.
- Mobile: mesmas zonas viram abas (Texto | Evidências | Qualidade) — editar no celular é possível, não é o otimizado (PRD, decisão de dispositivo).

### 4.3 F-04 · Pré-voo de validação (modal antes de exportar)

```
┌───────────────────────────────────────────┐
│ Antes de exportar — RAV de Maria          │
│                                           │
│ ⛔ 1 impedimento                           │
│   "…é preguiçosa…" — expressão que a      │
│   norma veda (juízo de valor).            │
│   [Ver no texto] [Reescrever com ajuda]   │
│   [Manter assim mesmo → justificar]       │
│                                           │
│ ⚠ 2 avisos                                │
│   · Sem ação para o próximo bimestre      │
│   · Só dificuldades, nenhum avanço citado │
│                                           │
│ [Voltar ao texto]        [Exportar mesmo  │
│                           com avisos]     │
└───────────────────────────────────────────┘
```

- Impedimentos (RN-CNT-003/004/006, RN-RES-*) exigem correção ou justificativa auditada (RF-041). Avisos nunca impedem (professor decide — P-ProfessorDecide).
- Cada item cita a regra em linguagem humana, nunca "RN-CNT-003" (P-LínguaDeProfessor).

### 4.4 F-05 · Painel da turma e exportação em lote

```
Painel · Turma 3ºA · 2º bimestre          18 de 28 prontos ▓▓▓▓▓▓░░
┌──────────────────────────────────────────────────────────┐
│ Estudante   Observações  Status                              │
│ Ana P.      7            ✅ Exportado — aguardando assinaturas│
│ Bruno M.    4            ✏️ Rascunho                          │
│ Carla S.    0 ⚠          ○ Não iniciado   [registrar agora]  │
│ …                                                            │
└──────────────────────────────────────────────────────────┘
[Exportar todos os validados (PDF)]      [Gerar os não iniciados]
```

Barra de progresso do bimestre é o elemento emocional central (P-ProgressoVisível).

### 4.5 F-01 · Onboarding (fazer, não assistir — P-ZeroManual)

Passos encadeados com progresso: **Conta → Sua turma → Seus estudantes (colar lista) → Primeira observação (guiada) → pronto.** Meta: ≤10 min até o estado "pronta para observar". Nenhum vídeo, nenhum tour de tooltips; o produto se explica fazendo. Dica única pós-onboarding: "No fim do bimestre, suas observações viram o RAV. Quanto mais você registrar, mais o texto fica com a sua cara."

## 5. Componentes (inventário shadcn/ui + próprios)

| Componente | Base | Estados |
|------------|------|---------|
| `ObservationComposer` | próprio | default · gravando voz · offline · salvo |
| `EvidenceChip` `[●12/04]` | próprio | normal · destacado · fonte-de-trecho-selecionado |
| `AISuggestionCard` (lilás) | Card | proposta · explicação aberta · aceita · recusada |
| `QualityChecklist` | próprio | ok · aviso · impedimento · executando |
| `RavStatusBadge` | Badge | Rascunho · Validado · Exportado · Assinado (RN-DOC-003) |
| `DiffViewer` | próprio | versão A/B, realçe de proveniência humano/IA |
| `ProgressBimestre` | Progress | 0–100% com contagem textual |
| `StudentQuickPick` | Command | recentes · busca · multi-seleção (RF-024) |
| Formulários, tabelas, modais, toasts | shadcn/ui | padrão |

## 6. Estados e mensagens

### 6.1 Máquina de estados do RAV (visível como badge em toda parte)

`Não iniciado → Rascunho → Validado → Exportado (pendente de assinaturas) → Assinado/Compartilhado` — transições conforme RN-IA-005, RN-DOC-003, RN-FLX-003. Correção pós-exportação: volta a Rascunho como nova versão (RN-DOC-005), nunca edita o exportado.

### 6.2 UX Writing — regras e exemplos

Regras: voz de colega experiente, não de sistema; verbos no imperativo suave; zero jargão técnico; a norma é citada como aliada, não como ameaça; erros nunca culpam o usuário.

| Situação | ❌ Não | ✅ Sim |
|----------|--------|--------|
| Autosave | "Dados persistidos" | "Salvo às 14:32" |
| Bloqueio anti-viés | "Violação da RN-CNT-003" | "Essa expressão pode expor a criança — a norma pede que a gente descreva o que ela faz, não o que ela 'é'. Quer ajuda para reescrever?" |
| Vazio de observações | "Nenhum registro encontrado" | "Carla ainda não tem observações neste bimestre. Registrar a primeira leva menos de 30 segundos." |
| IA indisponível | "Erro 503" | "O assistente está fora do ar. Seu texto está salvo e você pode continuar escrevendo normalmente." |
| Nudge (RF-071) | "Você tem 3 pendências" | "3 estudantes ainda sem observação neste bimestre — que tal registrar algo desta semana?" |
| Pós-geração | "Texto gerado com sucesso" | "Pronto — este é um rascunho baseado nas suas 7 observações. Leia com calma: a palavra final é sua." |

### 6.3 Estados vazios e de erro

Todo empty state ensina o próximo passo com 1 ação (nunca só ilustração). Erros de rede seguem P-NadaSePerde: mensagem + garantia explícita de que nada foi perdido.

## 7. Acessibilidade (RNF-003)

Contraste AA em todos os pares de token; navegação completa por teclado no editor; landmarks e labels em pt-BR; voz-para-texto beneficia também usuários com limitações motoras; alvo de toque ≥44px no mobile; foco visível padronizado; textos de erro associados aos campos (aria-describedby).

## 8. Débitos e decisões abertas de UX

1. Protótipo navegável (Figma ou código) para teste moderado com 5 professores — valida P-30s e o editor de 3 zonas antes do development kickoff (compromisso do PRD §12).
2. Comportamento do editor em telas ~13" (zona de evidências colapsável?) — decidir no protótipo.
3. Tom exato do nudge (frequência semanal vs. quinzenal) — teste no piloto M1.
4. Paleta final e nome público do produto — pendência de branding [PO].

**Documentos impactados:** 03-Arquitetura (PWA, offline, streaming), 08-IA (contratos de UI: spans de evidência, explicações, diffs), 09-Backlog (stories por tela), 10-Testes (testes de usabilidade moderados).
