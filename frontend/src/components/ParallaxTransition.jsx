import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, Sparkles, Check } from "lucide-react"

const MESSAGES = [
  "Preparando sua área profissional…",
  "Organizando seu perfil…",
  "Carregando seus currículos…",
]

// Linhas do "currículo sendo preparado" (animam preenchimento com leve atraso).
const LINES = ["88%", "100%", "72%", "94%"]

export default function ParallaxTransition() {
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800)
    const t2 = setTimeout(() => setStep(2), 1500)
    const end = setTimeout(() => {
      setShow(false)
      navigate("/home")
    }, 2300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(end)
    }
  }, [navigate])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Glows estáticos (sem animação por frame) */}
          <div className="absolute -top-20 left-1/4 w-80 h-80 bg-purple-300/40 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-blue-300/40 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            className="relative w-full max-w-sm px-6"
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Marca */}
            <div className="text-center mb-6 text-2xl font-black text-slate-900">
              Pro<span className="text-purple-600">Talent</span>
            </div>

            {/* Card de currículo sendo preparado */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
                <div className="space-y-2 flex-1">
                  <motion.div
                    className="h-2.5 bg-slate-800 rounded origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ width: "60%" }}
                  />
                  <motion.div
                    className="h-2 bg-slate-300 rounded origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    style={{ width: "40%" }}
                  />
                </div>
              </div>

              {/* Linhas preenchendo */}
              <div className="space-y-2.5">
                {LINES.map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2 bg-slate-200 rounded origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.45, delay: 0.4 + i * 0.15 }}
                    style={{ width: w }}
                  />
                ))}
              </div>

              {/* Conexão perfil ↔ vaga */}
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-1 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  Perfil
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-300 via-blue-300 to-blue-300" />
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-100">
                  <Check size={12} /> Vaga
                </span>
              </div>

              {/* Barra de progresso */}
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ width: "8%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.1, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Texto de loading alternando */}
            <div className="mt-6 flex items-center justify-center gap-2 text-slate-600 text-sm h-5">
              {step < 2 ? (
                <Loader2 size={16} className="animate-spin text-purple-600" />
              ) : (
                <Sparkles size={16} className="text-purple-600" />
              )}
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="font-medium"
                >
                  {MESSAGES[step]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
