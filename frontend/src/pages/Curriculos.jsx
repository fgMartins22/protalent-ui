import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserPlus } from "lucide-react"

import CurriculosList from "./CurriculosList"
import CurriculoCreate from "./CurriculoCreate"
import CurriculosHeader from "./CurriculoHeader"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { getStoredProfileId } from "../services/api"

export default function Curriculos() {
  const [mode, setMode] = useState("list") // list | create
  const navigate = useNavigate()
  const profileId = getStoredProfileId()

  // Sem perfil ainda: não dá para criar/listar currículos.
  if (!profileId) {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <UserPlus size={26} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Complete seu perfil primeiro</h1>
            <p className="text-slate-600 max-w-md">
              Seus currículos são gerados a partir do seu perfil. Cadastre seus dados
              base para começar.
            </p>
          </div>
          <button
            onClick={() => navigate("/perfil")}
            className="px-6 py-3 rounded-xl bg-black text-white border border-black hover:bg-purple-600 hover:border-purple-600 transition font-medium text-sm cursor-pointer"
          >
            Ir para o perfil
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <CurriculosHeader mode={mode} setMode={setMode} />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
        {mode === "list" && <CurriculosList profileId={profileId} />}
        {mode === "create" && (
          <CurriculoCreate profileId={profileId} onBack={() => setMode("list")} />
        )}
      </div>
      <Footer />
    </main>
  )
}
