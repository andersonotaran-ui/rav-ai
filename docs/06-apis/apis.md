# 06 — APIs · RAV AI

**Versão:** 1.0 · 06/07/2026 · Aguardando validação
**Depende de:** 03-Arquitetura (ADR-002/006) · 04-Dados (schema) · 08-IA (pipeline)
**Estilo:** REST JSON sob `/api/v1`; SSE para streaming de geração; OpenAPI gerada pelo FastAPI como contrato-fonte (este doc define convenções e os contratos de negócio; a spec completa é código).

---

## 1. Convenções

| Tema | Padrão |
|------|--------|
| Autenticação | `Authorization: Bearer <JWT>` (15min) + refresh token httpOnly; login/refresh/logout em `/auth/*` |
| Autorização | Escopo por vínculo aplicado no repositório (ADR-006); 404 (não 403) para recursos fora do vínculo — não vazar existência |
| Erros | RFC 9457 Problem Details: `{type, title, status, detail, instance, errors[]}`; erros de validação de domínio citam `regra` (ex. `"regra": "RN-RES-001"`) e `mensagem_humana` (UX writing) |
| Paginação | cursor-based: `?cursor=&limit=` → `{data[], next_cursor}` |
| Idempotência | `Idempotency-Key` obrigatório em POST de geração/exportação (retry seguro na fila) |
| Versionamento | path `/v1`; breaking change ⇒ `/v2` com convivência ≥1 ano letivo |
| Rate limit | por usuário+rota; gerações limitadas por plano (freemium) → `429` com `retry_after` e cota em headers |
| Datas | ISO-8601 UTC; datas escolares como `date` local |

## 2. Endpoints por contexto

### Auth & Conta
```
POST /auth/registrar        {nome, email, senha}
POST /auth/login            {email, senha} → {access_token, usuario}
POST /auth/google           {id_token}
POST /auth/refresh          (cookie) → {access_token}
POST /auth/recuperar-senha  {email}
GET  /me                    → perfil + plano + cotas
DELETE /me                  (RN-SEG-005 — fluxo de anonimização)
```

### Estrutura escolar
```
GET/POST        /escolas
GET/POST        /escolas/{id}/anos-letivos          {ano, bimestres[]: {numero, inicio, fim, dias_letivos}}
PATCH           /bimestres/{id}
GET/POST        /turmas                              {escola_id, ano_letivo_id, bloco, ano_escolar, letra, turno}
PATCH           /turmas/{id}   · POST /turmas/{id}/arquivar
```

### Estudantes
```
GET/POST  /turmas/{id}/estudantes
POST      /turmas/{id}/estudantes/lote               {nomes: ["...", ...]} → criados[]  (RF-013)
PATCH     /estudantes/{id}                           (flags Campo A — RN-CNT-009)
POST      /estudantes/{id}/transferir                (RN-FLX-004)
PUT       /estudantes/{id}/frequencia/{bimestre_id}  {total_faltas, justificadas}
GET       /estudantes/{id}/linha-do-tempo?bimestre=&tipo=   (observações + eventos de RAV)
```

### Observações
```
POST  /observacoes
      {estudante_ids[], texto, tipo?, exportavel?, data_ocorrencia?, origem}
      → 201 [{id, estudante_id, ...}]        (fan-out RF-024; tipo opcional — classificação assíncrona)
GET   /observacoes?estudante_id=&bimestre_id=&tipo=&cursor=
PATCH /observacoes/{id}      · DELETE (com trilha)
POST  /observacoes/{id}/classificar-tipo   → sugestão IA {tipo_sugerido, confianca}
```

### RAV — núcleo
```
GET   /turmas/{id}/ravs?bimestre_id=            → painel: [{estudante, estado, n_observacoes, pendencias}]
GET   /ravs/{id}                                 → documento + versão atual + claims com evidencias[]
POST  /ravs                                      {estudante_id, bimestre_id} → 201 (ou 409 se existe — RN-FLX-001)

POST  /ravs/{id}/gerar                           (RF-030; Idempotency-Key)
      {evidencia_ids[]?, insumo_adicional?, tamanho_alvo?}
      → 202 {execucao_id, stream_url}
GET   /ravs/{id}/gerar/{execucao_id}/stream      SSE (ADR-002):
      event: claim        data: {ordem, texto, secao, tipo, evidence_ids[], rationale}
      event: progresso    data: {etapa, pct}
      event: concluido    data: {versao_id, relatorio_validacao_parcial}
      event: erro         data: {problem_details}

POST  /ravs/{id}/versoes                         (edição manual/aceite → nova versão; body: claims[])
GET   /ravs/{id}/versoes                         · GET /ravs/{id}/versoes/{a}/diff/{b}   (RF-061)
POST  /ravs/{id}/claims/{claim_id}/aceitar|recusar          (RN-IA-001)
POST  /ravs/{id}/melhorar-escrita                {trecho, instrucao?} → diff proposto (RF-035)
POST  /ravs/{id}/entrevista                      (RF-036) → perguntas[] · respostas viram observações origem=entrevista

POST  /ravs/{id}/validar                         → {itens[]: {regra, severidade, trecho, mensagem_humana, sugestao?}, aprovada}
POST  /ravs/{id}/validacoes/{exec_id}/override   {regra_codigo, justificativa}  (RF-041)
PUT   /ravs/{id}/resultado-final                 {valor} → 422 com regra se incoerente (RN-RES-*)
```

### Exportação e estados
```
POST /ravs/{id}/exportar            {formato: pdf|docx} → 202 → {arquivo_url, sha256}   (RF-050/051)
POST /turmas/{id}/exportar-lote     {bimestre_id, formato, apenas_validados: true} → 202 job  (RF-052)
POST /ravs/{id}/confirmar-assinaturas    (RN-DOC-003 → estado assinado)
GET  /exportacoes/{id}              → status + URL temporária assinada
```

### Normas (leitura; escrita via admin interno)
```
GET /normas/vigente                 → templates, textos fixos F/G, regras parametrizadas
GET /normas/{ano}/objetivos-aprendizagem?ano_escolar=&componente=
```

### API interna (n8n — ADR-003; token de serviço com escopo restrito)
```
GET  /interna/nudges/pendentes      → agregados sem PII: [{usuario_id, n_estudantes_sem_obs, bimestre}]
POST /interna/emails/enviar         (templates de nudge/transacional)
POST /interna/rag/ingestao          (M3 — corpus com metadados de fonte)
```

## 3. Exemplos de contrato

### Geração — resposta SSE `claim`
```json
{
  "ordem": 3,
  "texto": "Nas situações de leitura coletiva, {{EST_1}} passou a se voluntariar para ler em voz alta, com fluência crescente.",
  "secao": "percurso",
  "tipo": "factual",
  "evidence_ids": ["obs_9f2...", "obs_c41..."],
  "rationale": "Sintetiza duas observações de abril/maio que evidenciam avanço em leitura (RN-CNT-001b)."
}
```
*(tokens `{{EST_1}}` reidentificados na renderização — RN-SEG-001)*

### Erro de domínio — `PUT /resultado-final`
```json
{
  "type": "https://ravai.app/erros/resultado-incoerente",
  "title": "Resultado incompatível com o ano do estudante",
  "status": 422,
  "regra": "RN-RES-003",
  "mensagem_humana": "\"Aprovado\" só se aplica ao 3º e ao 5º ano (fim de bloco). Para o 2º ano, o resultado esperado é \"Progressão Continuada\".",
  "acoes": ["progressao_continuada"]
}
```

### Item de validação (pré-voo)
```json
{
  "regra": "RN-CNT-003",
  "severidade": "impedimento",
  "trecho": {"claim_id": "clm_7a1...", "inicio": 42, "fim": 61},
  "mensagem_humana": "Essa expressão pode expor a criança — descreva o que ela faz, não o que ela 'é'.",
  "sugestao": "…demonstra desinteresse nas atividades de escrita → …ainda não se engaja nas atividades de escrita propostas; engajou-se quando…",
  "override_permitido": true
}
```

## 4. Segurança da API

CORS restrito ao domínio do app; cookies `SameSite=Strict` para refresh; validação Pydantic estrita (rejeitar campos extras); upload inexistente no MVP (anexos M3 terão URL pré-assinada); URLs de exportação temporárias e assinadas; logs de acesso sem PII de estudante (ids, não nomes); headers de cota: `X-Quota-Geracoes-Restantes`.

## 5. Não-metas desta versão

Webhooks públicos, API para terceiros e OAuth de aplicações (M5, junto da integração SEDF); GraphQL (sem necessidade — telas mapeiam 1:1 com recursos REST).

**Documentos impactados:** 09-Backlog (stories por endpoint), 10-Testes (contratos + autorização negativa), 11-Segurança (§4).
