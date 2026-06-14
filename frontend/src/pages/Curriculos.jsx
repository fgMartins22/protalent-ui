import { useState } from "react"
import { Loader2 } from "lucide-react"

import CurriculosList from "./CurriculosList"
import CurriculoCreate from "./CurriculoCreate"
import CurriculosHeader from "./CurriculoHeader"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAuth } from "../contexts/AuthContext"

export default function Curriculos() {
  const [mode, setMode] = useState("list") // list | create
  const { profile } = useAuth()
  const profileId = profile?.id ?? null

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <CurriculosHeader mode={mode} setMode={setMode} />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
        {!profileId ? (
          <div className="flex items-center justify-center py-24 text-slate-500">
            <Loader2 size={26} className="animate-spin" />
          </div>
        ) : mode === "list" ? (
          <CurriculosList profileId={profileId} />
        ) : (
          <CurriculoCreate profileId={profileId} onBack={() => setMode("list")} />
        )}
      </div>

      <Footer />
    </main>
  )
}
