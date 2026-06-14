# Arquitetura — ProTalent

Visão simples da arquitetura fullstack. O objetivo desta fase foi apenas
**separar frontend e backend**; integrações reais virão depois.

## Visão geral
```
[ Frontend (React + Vite) ]
        │  HTTP (futuro)
        ▼
[ Backend (Node + Fastify) ]
        │
        ├── Supabase (PostgreSQL)   — dados        (futuro)
        ├── Supabase Auth           — autenticação (futuro)
        ├── Supabase Storage        — fotos/arquivos (futuro)
        └── Vindi                   — pagamentos    (futuro)
```

## Frontend (`frontend/`)
- React + Vite + TailwindCSS. SPA com React Router.
- Hoje funciona com dados mockados/estado local.
- Responsável apenas por UI/UX. **Não** contém segredos nem chamadas a provedores.
- Futuramente consumirá a API do backend.

## Backend (`backend/`)
- Node.js + TypeScript + Fastify.
- Nesta fase: apenas a base (health check + stubs de rotas).
- Centraliza regras de negócio, acesso ao banco e integrações.
- Guarda **todas as chaves secretas** (service role do Supabase, API key da Vindi).

## Banco (Supabase / PostgreSQL — futuro)
- Modelagem inicial em [`backend/db/schema.sql`](../backend/db/schema.sql) e
  [`backend/docs/database.md`](../backend/docs/database.md).
- Entidades: `profiles`, `professional_experiences`, `educations`, `skills`,
  `resumes`, `payments`.
- Acesso somente pelo backend; RLS e policies serão habilitados depois.

## Autenticação (Supabase Auth — futuro)
- Login/sessão via Supabase Auth.
- O frontend envia o token; o backend valida e associa ao `profile`.

## Storage (Supabase Storage — futuro)
- Upload de foto de perfil; o backend gera/valida as URLs.

## Pagamentos (Vindi — futuro)
- Fluxo: Frontend → Backend → Vindi → Webhook → Backend atualiza Supabase →
  Frontend consulta status. Detalhes em [`backend/docs/vindi.md`](../backend/docs/vindi.md).
- Frontend nunca confirma pagamento; chave da Vindi só no backend.

## Fluxo futuro (resumo)
1. Usuário monta o **perfil** (dados base) → salvo no Supabase via backend.
2. Cria **currículos** a partir do perfil; descrições customizadas por vaga.
3. Assina o **Premium** via Vindi; status sincronizado por webhook.
4. Auth e Storage do Supabase habilitam login e foto de perfil.

## Princípios
- Simplicidade acima de tudo; sem padrões enterprise desnecessários.
- Frontend e backend desacoplados, cada um com seu ciclo de vida.
- Segredos nunca no frontend.
