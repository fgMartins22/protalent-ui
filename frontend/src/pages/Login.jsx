import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Check, X, Sparkles, Loader2 } from "lucide-react"

import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isEmailValid = email.includes("@") && email.includes(".")

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) return setError("Informe seu e-mail.")
    if (!isEmailValid) return setError("E-mail em formato inválido.")
    if (!password) return setError("Informe sua senha.")

    setLoading(true)
    try {
      await signIn(email.trim(), password)
      navigate("/home")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-2">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
          <Sparkles size={13} /> ProTalent
        </span>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Entre na sua conta</h1>
        <p className="text-slate-500 text-sm">
          Acesse seus currículos, perfil profissional e ferramentas do ProTalent.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="text-sm bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2">{error}</div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
            Email
            {email && <span className={isEmailValid ? "text-green-600" : "text-red-500"}>{isEmailValid ? <Check size={14} /> : <X size={14} />}</span>}
          </label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
            placeholder="voce@email.com"
            className={`w-full bg-white border rounded-xl px-4 py-3 outline-none transition text-slate-800 ${focused === "email" ? "border-purple-500 ring-2 ring-purple-100" : email && !isEmailValid ? "border-red-300" : "border-slate-200"}`}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
              placeholder="••••••••"
              className={`w-full bg-white border rounded-xl px-4 py-3 pr-12 outline-none transition text-slate-800 ${focused === "password" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer">
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>
          <div className="text-right">
            <Link to="/recuperar-senha" className="text-sm text-slate-500 hover:text-purple-600 transition">Esqueci minha senha</Link>
          </div>
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? <><Loader2 size={18} className="animate-spin" /> Entrando…</> : "Entrar"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Não tem conta?{" "}
        <Link to="/cadastro" className="font-semibold text-purple-600 hover:underline">Criar conta</Link>
      </p>
    </AuthLayout>
  )
}
