import { useState } from "react"
import { ArrowBigDownDash } from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"

import StandardLayout from "../layouts/curriculo/StandardLayout"
import ProfileLayout from "../layouts/curriculo/ProfileLayout"
import ModernLayout from "../layouts/curriculo/ModernLayout"

export default function CurriculoView() {
  const layouts = [
    {
      id: "standard",
      label: "Padrão",
      recommended: true,
      component: StandardLayout,
    },
    {
      id: "profilePic",
      label: "Básico",
      component: ProfileLayout,
    },
    {
      id: "modern",
      label: "Moderno",
      component: ModernLayout,
    },
  ]

  const [activeLayout, setActiveLayout] = useState(layouts[0])
  const [savedLayout, setSavedLayout] = useState(layouts[0])
  const [editing, setEditing] = useState(false)

  const [curriculo, setCurriculo] = useState({
    resumo:
      "Desenvolvedor focado em criar interfaces modernas, acessíveis e performáticas.",
    experiencia:
      "Desenvolvimento de aplicações web modernas, integração com APIs e foco em performance.",
    educacao:
      "Descrição muito foda pqp",
    habilidades: ["React", "TypeScript", "Tailwind", "Git"],
  })

  const ActiveLayoutComponent = activeLayout.component
  const hasChanges = activeLayout.id !== savedLayout.id

  function handleChange(field, value) {
    setCurriculo(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSaveLayout() {
    setSavedLayout(activeLayout)
    setEditing(false)
    console.log("Layout salvo:", activeLayout.id, curriculo)
  }

  return (
    <main className="flex-1 bg-slate-50 flex flex-col">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-4 py-8 space-y-6">

        {/* Card de controle */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4">

          {/* Layouts */}
          <div className="flex gap-2 overflow-x-auto">
            {layouts.map(layout => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition cursor-pointer
                  ${activeLayout.id === layout.id
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
                `}
              >
                {layout.label}
                {layout.recommended && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    recomendado
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <button
              className="
                flex items-center gap-2
                px-4 py-2
                text-sm font-medium
                rounded-lg
                border border-black
                text-black
                hover:bg-black hover:text-white
                transition-all
                cursor-pointer
              "
            >
              <ArrowBigDownDash size={18} />
              Download PDF
            </button>


            <button
              onClick={() => setEditing(prev => !prev)}
              className="px-4 py-2 font-medium text-sm rounded-lg border border-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              {editing ? "Cancelar edição" : "Editar"}
            </button>

            <button
              onClick={handleSaveLayout}
              disabled={!hasChanges && !editing}
              className={`
                px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer
                ${(hasChanges || editing)
                  ? "border border-black text-black hover:bg-black hover:text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"}
              `}
            >
              Salvar alterações
            </button>
          </div>
        </div>

        {/* Preview */}
        <ActiveLayoutComponent
          data={curriculo}
          editing={editing}
          onChange={handleChange}
        />
      </div>

      <Footer />
    </main>
  )
}
