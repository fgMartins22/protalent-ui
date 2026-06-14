import { Navigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
      <Loader2 size={28} className="animate-spin" />
    </div>
  )
}

// Rota privada: exige usuário autenticado.
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <FullScreenLoader />
  if (!user) return <Navigate to="/login" replace />
  return children
}

// Rota pública-apenas (login/cadastro): se já autenticado, vai para /home.
export function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <FullScreenLoader />
  if (user) return <Navigate to="/home" replace />
  return children
}
