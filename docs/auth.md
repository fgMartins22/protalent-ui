# Autenticação — ProTalent

Autenticação real com **Supabase Auth (e-mail + senha)**. O frontend usa apenas
a `anon/publishable key`; operações sensíveis continuam no backend (service role).

## Configuração no painel do Supabase
1. **Authentication → Providers → Email**: habilitar.
2. **Authentication → Providers → Email → "Confirm email"**: para esta fase,
   recomendado **desativar** (assim o cadastro já retorna sessão e vai direto
   ao `/perfil`). Se mantiver ativado, o usuário precisa confirmar o e-mail
   antes de entrar (o cadastro mostra aviso).
3. **Authentication → URL Configuration → Site URL**: `http://localhost:5173`
   (e a URL de produção quando houver). Adicionar também em *Redirect URLs*.
4. Copiar `Project URL` e a `anon`/`publishable key` para `frontend/.env`.

## Modo de desenvolvimento vs produção (flag local)
Existe uma "site property" local no frontend que controla **apenas o
comportamento do app** (não mexe na segurança nem no rate limit do Supabase):

```
VITE_AUTH_EMAIL_CONFIRMATION_REQUIRED=false
```

### Desenvolvimento local
- No Supabase Dashboard → **Authentication → Providers → Email**, **desativar
  "Confirm email"**.
- No `frontend/.env`, usar `VITE_AUTH_EMAIL_CONFIRMATION_REQUIRED=false`.
- Resultado: após o `signUp`, o cadastro é considerado válido localmente, o
  `profile` é criado e o app redireciona para `/perfil`. Evita depender de
  e-mail de confirmação durante os testes.

### Produção
- **Reativar** a confirmação de e-mail no Supabase.
- Usar `VITE_AUTH_EMAIL_CONFIRMATION_REQUIRED=true`.
- Configurar **Site URL / Redirect URLs** corretamente.
- Resultado: após o `signUp`, o app mostra "confirme seu e-mail" e **não cria o
  profile** enquanto não houver sessão (o profile é criado no primeiro login,
  usando os nomes salvos em `user_metadata`).

> Importante: a flag não remove nem contorna o rate limit do Supabase (que é uma
> proteção do provedor). Ela só ajusta o fluxo do app entre dev e prod.

## Fluxo
- **Cadastro** (`/cadastro`): `supabase.auth.signUp` + cria `profiles` no backend
  com `auth_user_id`, `first_name`, `last_name`, `email` → vai para `/perfil`.
- **Login** (`/login`): `supabase.auth.signInWithPassword` → busca o `profile`
  por `auth_user_id` (cria mínimo se não existir) → vai para `/home`.
- **Logout**: `supabase.auth.signOut` + limpa chaves legadas → `/login`.
- **Recuperar senha** (`/recuperar-senha`): `supabase.auth.resetPasswordForEmail`.
- **Sessão**: persistida pelo Supabase; restaurada no carregamento via
  `getSession` + `onAuthStateChange` no `AuthContext`.

## Vínculo profile ↔ usuário
`profiles.auth_user_id` (UNIQUE) recebe o `user.id` do Supabase Auth.
O frontend nunca usa mais `profileId` em localStorage como fonte; o perfil é
sempre resolvido por `auth_user_id`.

## Google Auth (futuro — não implementado)
1. Ativar o **Google Provider** em Authentication → Providers no Supabase.
2. Criar um **OAuth Client** no Google Cloud Console.
3. Configurar **redirect URLs** (callback do Supabase).
4. No frontend: `supabase.auth.signInWithOAuth({ provider: "google" })`.

## Próxima etapa recomendada
- **Backend auth middleware**: validar o JWT do Supabase no `Authorization`
  header e derivar o `auth_user_id` no servidor (em vez de receber por path/body).
- **RLS policies** por `auth.uid() = profiles.auth_user_id` para anon/authenticated.
