import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { supabase } from "../lib/supabase"
import { EMAIL_CONFIRMATION_REQUIRED } from "../lib/authConfig"
import { getProfileByAuth, createProfile, clearLegacyKeys } from "../services/api"

const AuthContext = createContext(null)

function translateError(message = "") {
  const m = message.toLowerCase()
  if (m.includes("invalid login credentials")) return "E-mail ou senha inválidos."
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Este e-mail já está cadastrado."
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar."
  return message || "Ocorreu um erro. Tente novamente."
}

// Garante um profile vinculado ao usuário (cria mínimo se não existir).
// Deduplica chamadas concorrentes (getSession + onAuthStateChange) para evitar
// POST duplicado e 409. Em caso de 409 (corrida), busca o profile existente.
const inflight = new Map()

function ensureProfile(user) {
  if (inflight.has(user.id)) return inflight.get(user.id)

  const promise = (async () => {
    let profile = await getProfileByAuth(user.id)
    if (!profile) {
      try {
        profile = await createProfile({
          auth_user_id: user.id,
          first_name: user.user_metadata?.first_name || user.email?.split("@")[0] || "Usuário",
          last_name: user.user_metadata?.last_name || "",
          email: user.email || "",
        })
      } catch {
        // corrida/duplicado (409): o profile já existe — busca de novo
        profile = await getProfileByAuth(user.id)
      }
    }
    return profile
  })()

  inflight.set(user.id, promise)
  promise.finally(() => inflight.delete(user.id))
  return promise
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncUser = useCallback(async (sessionUser) => {
    if (!sessionUser) {
      setUser(null)
      setProfile(null)
      return
    }
    setUser(sessionUser)
    try {
      setProfile(await ensureProfile(sessionUser))
    } catch {
      setProfile(null)
    }
  }, [])

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      await syncUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await syncUser(session?.user ?? null)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [syncUser])

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(translateError(error.message))
  }, [])

  const signUp = useCallback(async ({ firstName, lastName, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    })
    if (error) throw new Error(translateError(error.message))

    // Não criamos o profile aqui para evitar POST duplicado / 409:
    // - Dev (sessão criada): o onAuthStateChange dispara ensureProfile, que cria
    //   o profile uma única vez usando os nomes salvos em user_metadata.
    // - Produção (sem sessão até confirmar e-mail): o profile é criado no
    //   primeiro login, também via ensureProfile.
    return { needsConfirmation: EMAIL_CONFIRMATION_REQUIRED && !data.session }
  }, [])

  const signOut = useCallback(async () => {
    clearLegacyKeys()
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }, [])

  const resetPassword = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw new Error(translateError(error.message))
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    try {
      setProfile(await getProfileByAuth(user.id))
    } catch {
      /* mantém o profile atual */
    }
  }, [user])

  const value = {
    user, profile, loading,
    signIn, signUp, signOut, resetPassword, refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>")
  return ctx
}
