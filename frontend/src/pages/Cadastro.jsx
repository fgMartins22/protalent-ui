import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Sparkles, Loader2 } from "lucide-react"

import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../contexts/AuthContext"

const inputClass =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none transition text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"

export default function Cadastro() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  function validate() {
    if (!form.firstName.trim()) return "Informe seu nome."
    if (!form.lastName.trim()) return "Informe seu sobrenome."
    if (!form.email.trim()) return "Informe seu e-mail."
    if (!(form.email.includes("@") && form.email.includes("."))) return "E-mail em formato inválido."
    if (!form.password) return "Informe uma senha."
    if (form.password.length < 6) return "A senha deve ter ao menos 6 caracteres."
    if (form.password !== form.confirm) return "As senhas não conferem."
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const v = validate()
    if (v) return setError(v)

    setLoading(true)
    try {
      const { needsConfirmation } = await signUp({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      })
      if (needsConfirmation) {
        setInfo("Conta criada! Confirme seu e-mail para acessar.")
      } else {
        setInfo("Conta criada com sucesso! Redirecionando…")
        setTimeout(() => navigate("/perfil"), 700)
      }
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
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Crie sua conta</h1>
        <p className="text-slate-500 text-sm">
          Comece montando seu perfil profissional e gere currículos personalizados para cada vaga.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-sm bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2">{error}</div>}
        {info && <div className="text-sm bg-green-50 border border-green-100 text-green-700 rounded-lg px-3 py-2">{info}</div>}

        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} placeholder="Nome" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
          <input className={inputClass} placeholder="Sobrenome" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </div>

        <input className={inputClass} type="email" placeholder="voce@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />

        <div className="relative">
          <input
            className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} placeholder="Senha (mín. 6 caracteres)"
            value={form.password} onChange={(e) => set("password", e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer">
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        </div>

        <input className={inputClass} type={showPassword ? "text" : "password"} placeholder="Confirmar senha" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} />

        <button
          type="submit" disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? <><Loader2 size={18} className="animate-spin" /> Criando conta…</> : "Criar conta"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Já tem conta?{" "}
        <Link to="/login" className="font-semibold text-purple-600 hover:underline">Entrar</Link>
      </p>
    </AuthLayout>
  )
}
