import { useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

/**
 * Feedback visual simples para ações simuladas (salvar, duplicar, excluir, baixar).
 * Controlado pelo pai: recebe `message` (string|null) e `onClose` estável (useCallback).
 */
export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 2600)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700">
        <CheckCircle2 size={18} className="text-purple-400 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
