import { useNavigate } from "react-router-dom"
import { Compass } from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
          <Compass size={30} />
        </div>

        <div className="space-y-2">
          <p className="text-5xl font-bold text-slate-900">404</p>
          <h1 className="text-2xl font-semibold text-slate-800">
            Página não encontrada
          </h1>
          <p className="text-slate-500 max-w-md">
            O endereço que você tentou acessar não existe ou foi movido.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-white hover:text-black border border-black transition font-medium text-sm cursor-pointer"
          >
            Ir para o início
          </button>
          <button
            onClick={() => navigate("/curriculos")}
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition font-medium text-sm cursor-pointer"
          >
            Ver meus currículos
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
