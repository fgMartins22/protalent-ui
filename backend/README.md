# ProTalent API

Backend inicial do ProTalent — **base de preparação**, sem integração real
de Auth/Storage/Pagamentos ainda.

## Stack
- Node.js + TypeScript
- Fastify (servidor HTTP)
- Supabase (PostgreSQL) — client preparado, sem queries ainda
- Zod (validação de ambiente)

## Estrutura
```
backend/
  src/
    server.ts          # bootstrap do Fastify + registro de rotas
    config/env.ts      # validação das variáveis de ambiente (zod)
    lib/supabase.ts    # client Supabase (service role, lazy)
    routes/            # health, profiles, resumes, payments (stubs)
    types/             # tipos que espelham o banco
  db/schema.sql        # modelagem inicial do banco
  docs/                # database.md, vindi.md
  .env.example
```

## Como rodar localmente
```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # sobe em http://localhost:3333 (tsx watch)
```

Build de produção:
```bash
npm run build          # gera dist/
npm start              # roda dist/server.js
```

## Configurar o `.env`
Preencha a partir do `.env.example`. Nesta fase as chaves podem ficar vazias
(o servidor sobe mesmo assim). `PORT` tem default `3333`.

- `SUPABASE_*` — necessárias só quando começarmos a usar o banco/Auth.
- `VINDI_*` — necessárias só na integração de pagamentos.

> A `SUPABASE_SERVICE_ROLE_KEY` e a `VINDI_API_KEY` são **secretas** e ficam
> **apenas no backend**. Nunca vão para o frontend.

## Health check
```
GET /health  ->  { "status": "ok", "service": "protalent-api", ... }
```

## Deploy (recomendação)
- **Render** (ou Railway/Fly): serviço Node persistente — ideal para o Fastify.
  Build: `npm run build` • Start: `npm start`.
- **Vercel**: focada em serverless; exigiria adaptar o Fastify a handlers
  (ex.: `@fastify/aws-lambda` ou rotas em `/api`). Não recomendado para este
  servidor persistente neste momento.
