# Storage — Avatar (Supabase Storage)

Upload da foto de perfil usando o bucket **`avatars`** no Supabase Storage.
Nesta fase o frontend (já autenticado) envia direto para o Storage com a
`anon/publishable key`; o backend apenas salva a `avatar_url` em `profiles`.

## 1. Criar o bucket `avatars`
No Supabase Dashboard → **Storage** → **New bucket**:
- **Name:** `avatars`
- **Public bucket:** **ativado** (nesta etapa) — facilita exibir a imagem por URL pública.

## 2. O bucket precisa ser público?
**Sim, nesta etapa.** Bucket público torna os arquivos legíveis por URL direta
(`.getPublicUrl`), o que simplifica exibir o avatar no app, nos currículos e no PDF.
A escrita (upload) **não** fica liberada para qualquer um só por ser público —
depende das policies abaixo.

## 3. Policies de Storage (SQL Editor)
Marcar como público costuma criar a policy de leitura. Garanta as policies de
escrita para **usuários autenticados** (o client do frontend usa o JWT do
Supabase Auth, role `authenticated`):

```sql
-- Leitura pública dos avatars
create policy "avatars_public_read"
on storage.objects for select
to public
using (bucket_id = 'avatars');

-- Upload / atualização / remoção por usuários autenticados
create policy "avatars_auth_insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars');

create policy "avatars_auth_update"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars');

create policy "avatars_auth_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'avatars');
```

## 4. Como testar a URL pública
1. Faça um upload pelo app (tela `/perfil` → "Alterar foto").
2. No Dashboard → Storage → `avatars`, abra o arquivo em `"{auth_user_id}/avatar-….png"`.
3. Copie a URL pública e abra no navegador — a imagem deve carregar diretamente.
4. Recarregue `/perfil`: o avatar persiste (lido de `profiles.avatar_url`).

## 5. Caminho dos arquivos
`avatars/{auth_user_id}/avatar-{timestamp}.{ext}`
- Pasta por usuário, nome com timestamp (evita cache antigo).
- Ao trocar a foto, o app remove (best-effort) as fotos anteriores do usuário.

## 6. O que será melhorado no futuro (RLS/policies)
- Restringir a escrita à própria pasta do usuário:
  `((storage.foldername(name))[1] = auth.uid()::text)` nas policies de insert/update/delete.
- Eventualmente mover o upload para o backend (com a service role) + JWT middleware,
  conforme a "Próxima etapa recomendada" em `docs/auth.md`.
- Bucket privado + URLs assinadas, se necessário.

> Segurança: a `service_role` permanece **somente no backend**. O frontend usa
> apenas a `anon/publishable key`.
