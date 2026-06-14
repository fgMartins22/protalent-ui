import { UserCog, ClipboardList, FileCheck } from "lucide-react"

const steps = [
  {
    icon: <UserCog size={24} />,
    title: "Monte seu perfil",
    description:
      "Cadastre uma vez seus dados, experiências, formação e competências. Eles viram a base de todos os seus currículos.",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Cole a vaga",
    description:
      "Informe os requisitos da vaga desejada. O ProTalent usa seu perfil como ponto de partida.",
  },
  {
    icon: <FileCheck size={24} />,
    title: "Gere o currículo",
    description:
      "Receba descrições sob medida, escolha o layout e baixe um currículo pronto para se destacar.",
  },
]

export default function HowItWorks() {
  return (
    <section className="w-full bg-slate-50 py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Como funciona
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Do perfil ao currículo pronto em três passos simples.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-purple-500/30 ring-4 ring-purple-50">
                  {index + 1}
                </span>
              </div>
              <h4 className="text-xl font-semibold text-slate-800">
                {step.title}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
