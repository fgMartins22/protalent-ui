# services/

Camada de serviços do backend (regras de negócio e integrações externas).

Ainda **vazia** — sem lógica real nesta fase. Aqui ficarão, no futuro:

- `profiles` — operações de perfil (via Supabase)
- `resumes` — operações de currículo (via Supabase)
- `payments` / `vindi` — integração de pagamentos (Vindi)

As rotas em `../routes` devem delegar para serviços daqui, mantendo os
handlers HTTP finos.
