-- =====================================================================
-- ProTalent — Modelagem inicial do banco (PostgreSQL / Supabase)
-- Proposta para revisão. NÃO aplicar ainda se exigir credenciais reais.
-- =====================================================================

-- Extensão para gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Tipos (enums)
-- ---------------------------------------------------------------------
do $$ begin
  create type resume_layout as enum ('standard', 'profile', 'modern');
exception when duplicate_object then null; end $$;

do $$ begin
  create type resume_output_type as enum ('text', 'bullets');
exception when duplicate_object then null; end $$;

do $$ begin
  create type resume_status as enum ('draft', 'updated', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum ('card', 'pix', 'boleto');
exception when duplicate_object then null; end $$;

do $$ begin
  create type billing_type as enum ('recurring', 'one_time');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum ('pending', 'paid', 'failed', 'canceled', 'expired');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- profiles
-- Dados base do usuário (reutilizados para gerar currículos).
-- auth_user_id referenciará auth.users (Supabase Auth) no futuro.
-- ---------------------------------------------------------------------
create table if not exists profiles (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid unique,
  first_name    text not null default '',
  last_name     text not null default '',
  title         text not null default '',
  city          text not null default '',
  state         text not null default '',
  email         text not null default '',
  phone         text not null default '',
  linkedin      text not null default '',
  github        text not null default '',
  portfolio     text not null default '',
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- professional_experiences (sem descrição — ela é customizada por currículo)
-- ---------------------------------------------------------------------
create table if not exists professional_experiences (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  role        text not null default '',
  company     text not null default '',
  start_date  date,
  end_date    date,
  current     boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_experiences_profile on professional_experiences(profile_id);

-- ---------------------------------------------------------------------
-- educations (sem descrição — customizada por currículo)
-- ---------------------------------------------------------------------
create table if not exists educations (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references profiles(id) on delete cascade,
  course       text not null default '',
  institution  text not null default '',
  start_date   date,
  end_date     date,
  current      boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_educations_profile on educations(profile_id);

-- ---------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------
create table if not exists skills (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  name        text not null,
  created_at  timestamptz not null default now(),
  unique (profile_id, name)
);
create index if not exists idx_skills_profile on skills(profile_id);

-- ---------------------------------------------------------------------
-- resumes
-- Currículos. As descrições customizadas ficam aqui (não no perfil).
-- ---------------------------------------------------------------------
create table if not exists resumes (
  id                      uuid primary key default gen_random_uuid(),
  profile_id              uuid not null references profiles(id) on delete cascade,
  name                    text not null,
  layout                  resume_layout not null default 'standard',
  job_description         text,
  output_type             resume_output_type not null default 'text',
  professional_summary    text,
  experience_description  text,
  education_description    text,
  status                  resume_status not null default 'draft',
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index if not exists idx_resumes_profile on resumes(profile_id);

-- ---------------------------------------------------------------------
-- payments
-- Reflete o status retornado pela Vindi (atualizado via webhook no backend).
-- ---------------------------------------------------------------------
create table if not exists payments (
  id                        uuid primary key default gen_random_uuid(),
  profile_id                uuid not null references profiles(id) on delete cascade,
  provider                  text not null default 'vindi',
  provider_payment_id       text,
  provider_subscription_id  text,
  payment_method            payment_method not null,
  plan                      text not null,
  billing_type              billing_type not null,
  status                    payment_status not null default 'pending',
  amount                    numeric(10,2) not null default 0,
  starts_at                 timestamptz,
  expires_at                timestamptz,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);
create index if not exists idx_payments_profile on payments(profile_id);

-- =====================================================================
-- Próximos passos (futuro, fora desta fase):
--  - Habilitar RLS (Row Level Security) em todas as tabelas.
--  - Policies por auth.uid() = profiles.auth_user_id.
--  - Trigger para manter updated_at.
-- =====================================================================
