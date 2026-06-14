// "Site property" local para o comportamento de auth em desenvolvimento.
// Controla apenas o COMPORTAMENTO DO APP — não altera a segurança do Supabase.
//
// false (padrão / dev): após o cadastro, segue o fluxo sem exigir confirmação.
// true  (produção): exige confirmação de e-mail antes de acessar.
export const EMAIL_CONFIRMATION_REQUIRED =
  import.meta.env.VITE_AUTH_EMAIL_CONFIRMATION_REQUIRED === "true"
