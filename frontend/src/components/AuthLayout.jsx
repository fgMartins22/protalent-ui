import { motion } from "framer-motion"
import { Sparkles, FileText, TrendingUp, BadgeCheck } from "lucide-react"

const float = (duration, delay = 0) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
})

function Showcase() {
  return (
    <div className="relative w-full max-w-md h-[460px] hidden lg:block">
      <div className="absolute top-10 left-6 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl" />

      <motion.div {...float(6)} className="absolute left-2 top-10 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4">
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
            <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-100">{t}</span>
          ))}
        </div>
      </motion.div>

      <motion.div {...float(5, 0.6)} className="absolute right-0 top-2 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><BadgeCheck size={20} /></div>
        <div>
          <p className="text-lg font-bold text-slate-900 leading-none">94%</p>
          <p className="text-xs text-slate-500">match com a vaga</p>
        </div>
      </motion.div>

      <motion.div {...float(7, 0.3)} className="absolute left-0 bottom-20 bg-slate-900 text-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
        <Sparkles size={16} className="text-purple-400" />
        <span className="text-sm font-medium">IA analisando seu perfil…</span>
      </motion.div>

      <motion.div {...float(6, 0.9)} className="absolute right-2 bottom-4 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-800">
          <TrendingUp size={18} className="text-blue-600" />
          <span className="text-sm font-semibold">Mais entrevistas</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 55, 45, 70, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-purple-600 to-blue-500" style={{ height: `${h}%` }} />
          ))}
        </div>
      </motion.div>

      <motion.div {...float(8, 0.2)} className="absolute left-40 top-0 w-12 h-12 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-purple-600">
        <FileText size={22} />
      </motion.div>
    </div>
  )
}

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-16 gap-12 lg:gap-20 overflow-hidden">
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <Showcase />
      </div>
      <div className="w-full max-w-md space-y-8 bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/60">
        {children}
      </div>
    </main>
  )
}
