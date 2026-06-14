# Modelagem inicial do banco — ProTalent

PostgreSQL (Supabase). Proposta para revisão. O SQL executável está em
[`backend/db/schema.sql`](../db/schema.sql).

## Visão geral

- Um **profile** concentra os dados base do usuário (reutilizáveis).
- `professional_experiences`, `educations` e `skills` pertencem a um profile.
- **resumes** são os currículos; as descrições customizadas ficam neles, não no perfil.
- **payments** reflete o status vindo da Vindi (atualizado por webhook no backend).

## Tabelas

### profiles
`id`, `auth_user_id` (→ Supabase Auth futuramente), `first_name`, `last_name`,
`title`, `city`, `state`, `email`, `phone`, `linkedin`, `github`, `portfolio`,
`avatar_url`, `created_at`, `updated_at`.

### professional_experiences
`id`, `profile_id` (FK), `role`, `company`, `start_date`, `end_date`,
`current`, `created_at`, `updated_at`. — **Sem descrição** (é por currículo).

### educations
`id`, `profile_id` (FK), `course`, `institution`, `start_date`, `end_date`,
`current`, `created_at`, `updated_at`. — **Sem descrição** (é por currículo).

### skills
`id`, `profile_id` (FK), `name`, `created_at`. Único por (`profile_id`, `name`).

### resumes
`id`, `profile_id` (FK), `name`, `layout` (`standard|profile|modern`),
`job_description`, `output_type` (`text|bullets`), `professional_summary`,
`experience_description`, `education_description`,
`status` (`draft|updated|published`), `created_at`, `updated_at`.

### payments
`id`, `profile_id` (FK), `provider` (`vindi`), `provider_payment_id`,
`provider_subscription_id`, `payment_method` (`card|pix|boleto`), `plan`,
`billing_type` (`recurring|one_time`), `status`
(`pending|paid|failed|canceled|expired`), `amount`, `starts_at`, `expires_at`,
`created_at`, `updated_at`.

### subscriptions
Assinaturas recorrentes (cartão), com status sincronizado pela Vindi via webhook.
`id`, `profile_id` (FK), `provider` (`vindi`), `provider_subscription_id`,
`plan`, `status` (`active|past_due|canceled|expired|pending`),
`current_period_start`, `current_period_end`, `canceled_at`,
`created_at`, `updated_at`.

## Relacionamentos
- `profiles 1—N professional_experiences`
- `profiles 1—N educations`
- `profiles 1—N skills`
- `profiles 1—N resumes`
- `profiles 1—N payments`
- `profiles 1—N subscriptions`

Todas as FKs usam `on delete cascade`.

## Futuro (fora desta fase)
- Habilitar **RLS** e policies por `auth.uid() = profiles.auth_user_id`.
- Trigger para atualizar `updated_at` automaticamente.
