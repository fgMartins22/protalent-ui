# Pagamentos com Vindi — fluxo planejado

> Documentação de arquitetura. **Nada de integração real nesta fase.**

## Fluxo

```
Frontend
  └─ POST /payments/checkout  ─────────────►  Backend
                                                 └─ chama Vindi API (cria cobrança/assinatura)
Vindi
  └─ POST /payments/webhook/vindi  ───────►  Backend
                                                 └─ valida assinatura/segredo
                                                 └─ atualiza tabela `payments` no Supabase
Frontend
  └─ consulta status no Backend (nunca confirma pagamento sozinho)
```

## Regras de segurança
- `VINDI_API_KEY` fica **somente no backend** (variável de ambiente).
- O webhook deve **validar a assinatura/segredo** (`VINDI_WEBHOOK_SECRET`) antes de processar.
- O **frontend nunca confirma** um pagamento; ele apenas inicia o checkout e consulta o status.
- Responder `200` rápido ao webhook e processar de forma idempotente (mesmo evento pode chegar mais de uma vez).

## Mapeamento de status (futuro)
Eventos da Vindi → coluna `payments.status`:
- cobrança paga → `paid`
- cobrança pendente → `pending`
- falha → `failed`
- assinatura cancelada → `canceled`
- expirada → `expired`

## Endpoints (stubs atuais)
- `POST /payments/checkout` — iniciará a cobrança na Vindi.
- `POST /payments/webhook/vindi` — receberá eventos (validação virá depois).

## Próximos passos
1. Criar conta/sandbox Vindi e obter `VINDI_API_KEY`.
2. Implementar cliente HTTP da Vindi em `src/services/vindi`.
3. Implementar criação de cliente + assinatura/cobrança no checkout.
4. Implementar validação de assinatura no webhook e atualização do `payments`.
