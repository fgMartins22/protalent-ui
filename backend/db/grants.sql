-- =====================================================================
-- GRANTS para o backend operar via service_role (PostgREST).
-- Rode UMA VEZ no Supabase (SQL Editor) caso receba:
--   "permission denied for table ..." (código 42501).
--
-- O backend usa apenas a service_role, que IGNORA RLS. Conceder os
-- privilégios abaixo é suficiente para os CRUDs funcionarem.
-- (As policies de RLS continuarão valendo para anon/authenticated.)
-- =====================================================================

grant usage on schema public to service_role;

grant select, insert, update, delete
  on all tables in schema public
  to service_role;

grant usage, select
  on all sequences in schema public
  to service_role;

-- Tabelas/sequences criadas no futuro também herdam os privilégios:
alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;

alter default privileges in schema public
  grant usage, select on sequences to service_role;
