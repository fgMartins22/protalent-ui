import { useState } from "react"
import { Link } from "react-router-dom"
import { Sparkles, Loader2, MailCheck } from "lucide-react"

import AuthLayout from "../components/AuthLayout"
import { useAuth } from "../contexts/AuthContext"

export default function RecuperarSenha() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!(email.includes("@") && email.includes("."))) return setError("Informe um e-mail válido.")
    setLoading(true)
    try {
      await resetPassword(email.trim())
      setSent(true)
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
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Recuperar senha</h1>
        <p className="text-slate-500 text-sm">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      {sent ? (
        <div className="flex items-start gap-3 bg-green-50 border border-green-100 text-green-700 rounded-xl p-4">
          <MailCheck size={20} className="mt-0.5 shrink-0" />
          <p className="text-sm">Enviamos um link de recuperação para seu e-mail.</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="text-sm bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2">{error}</div>}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none transition text-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? <><Loader2 size={18} className="animate-spin" /> Enviando…</> : "Enviar link"}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-slate-500">
        <Link to="/login" className="font-semibold text-purple-600 hover:underline">Voltar para o login</Link>
      </p>
    </AuthLayout>
  )
}
