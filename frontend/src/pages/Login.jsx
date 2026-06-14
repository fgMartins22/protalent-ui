import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Eye,
  EyeClosed,
  Check,
  X,
  Sparkles,
  FileText,
  TrendingUp,
  BadgeCheck,
} from "lucide-react"

const float = (duration, delay = 0) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
})

/* Painel visual: comunica currículo + matching + IA (identidade do produto) */
function ProductShowcase() {
  return (
    <div className="relative w-full max-w-md h-[460px] hidden lg:block">
      {/* Glows */}
      <div className="absolute top-10 left-6 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl" />

      {/* Card currículo principal */}
      <motion.div
        {...float(6)}
        className="absolute left-2 top-10 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
          <div className="space-y-1.5">
            <div className="h-2.5 w-28 bg-slate-800 rounded" />
            <div className="h-2 w-20 bg-slate-300 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-slate-200 rounded" />
          <div className="h-2 w-5/6 bg-slate-200 rounded" />
          <div className="h-2 w-4/6 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-2 pt-1">
          {["React", "UX", "IA"].map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-100">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Badge de match */}
      <motion.div
        {...float(5, 0.6)}
        className="absolute right-0 top-2 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
          <BadgeCheck size={20} />
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900 leading-none">94%</p>
          <p className="text-xs text-slate-500">match com a vaga</p>
        </div>
      </motion.div>

      {/* Chip IA */}
      <motion.div
        {...float(7, 0.3)}
        className="absolute left-0 bottom-20 bg-slate-900 text-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2"
      >
        <Sparkles size={16} className="text-purple-400" />
        <span className="text-sm font-medium">IA analisando seu perfil…</span>
      </motion.div>

      {/* Card evolução */}
      <motion.div
        {...float(6, 0.9)}
        className="absolute right-2 bottom-4 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 space-y-3"
      >
        <div className="flex items-center gap-2 text-slate-800">
          <TrendingUp size={18} className="text-blue-600" />
          <span className="text-sm font-semibold">Mais entrevistas</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 55, 45, 70, 85, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-purple-600 to-blue-500"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Ícone currículo flutuante */}
      <motion.div
        {...float(8, 0.2)}
        className="absolute left-40 top-0 w-12 h-12 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-purple-600"
      >
        <FileText size={22} />
      </motion.div>
    </div>
  )
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const isEmailValid = email.includes("@") && email.includes(".")
  const isPasswordStrong = password.length >= 8

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/transition")
    }, 1600)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-16 gap-12 lg:gap-20 overflow-hidden">

      {/* Lado visual */}
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <ProductShowcase />
      </div>

      {/* Formulário */}
      <div className="w-full max-w-md space-y-8 bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/60">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
            <Sparkles size={13} />
            ProTalent
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-slate-500 text-sm">
            Acesse para criar currículos que abrem portas.
          </p>
        </div>

        <div className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
              Email
              {email && (
                <span className={isEmailValid ? "text-green-600" : "text-red-500"}>
                  {isEmailValid ? <Check size={14} /> : <X size={14} />}
                </span>
              )}
            </label>
            <input
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`w-full bg-white border rounded-xl px-4 py-3 outline-none transition text-slate-800 ${
                focusedField === "email"
                  ? "border-purple-500 ring-2 ring-purple-100"
                  : email && !isEmailValid
                  ? "border-red-300"
                  : "border-slate-200"
              }`}
            />
          </div>

          {/* Senha */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white border rounded-xl px-4 py-3 pr-12 outline-none transition text-slate-800 ${
                  focusedField === "password"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>
            {password && (
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isPasswordStrong ? "bg-green-500 w-full" : "bg-orange-400 w-1/2"
                  }`}
                />
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando…
                </span>
              ) : (
                "Entrar"
              )}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
                alt="Google"
              />
              Entrar com o Google
            </button>
          </div>
        </div>

        <div className="text-center">
          <button className="text-sm text-slate-500 hover:text-purple-600 transition cursor-pointer">
            Esqueceu sua senha?
          </button>
        </div>
      </div>
    </main>
  )
}
