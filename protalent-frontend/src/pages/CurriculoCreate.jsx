import { Sparkles, Lock } from "lucide-react"

export default function CurriculoCreate({ onBack }) {
  const iaEnabled = false 

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-8">

        {/* Header */}

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">

          {/* Nome */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Nome do currículo
            </label>
            <input
              type="text"
              placeholder="Ex: Front-end React • Vaga XP"
              className="
                w-full px-4 py-3 rounded-xl
                border border-slate-300
                focus:border-slate-900 focus:ring-1 focus:ring-slate-900
                outline-none text-sm
              "
            />
          </div>

          {/* IA */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Sparkles size={16} />
              Descrição da vaga
            </label>

            <textarea
              rows={6}
              placeholder="Cole aqui a descrição da vaga..."
              className="
                w-full px-4 py-3 rounded-xl
                border border-slate-300
                outline-none text-sm resize-none
                disabled:bg-slate-50
              "
            />

            {/* IA em breve */}
            {!iaEnabled && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Lock size={18} className="text-slate-500 mt-0.5" />
                <div className="text-sm text-slate-600">
                  <p className="font-medium text-slate-700">
                    IA em breve 
                  </p>
                  <p>
                    Em breve nossa IA analisará a vaga e criará automaticamente
                    um resumo profissional alinhado ao seu perfil.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex justify-end">
            <button
              className="
                px-6 py-3 rounded-xl
                bg-slate-900 text-white
                hover:bg-black
                transition font-medium text-sm
              "
            >
              Criar currículo
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
