import { UserCheck, MessageSquare, ClipboardCheck, Award } from "lucide-react"
import FeaturePage from "../components/FeaturePage"

export default function Consultoria() {
  return (
    <FeaturePage
      badge="Consultoria de Currículos"
      icon={<UserCheck size={14} />}
      title="Avaliação com"
      highlight="especialistas"
      description="Receba uma análise personalizada do seu currículo por quem entende de recrutamento."
      benefits={[
        {
          icon: <ClipboardCheck size={22} />,
          title: "Análise detalhada",
          description: "Revisão completa de estrutura, conteúdo e aderência às vagas.",
        },
        {
          icon: <MessageSquare size={22} />,
          title: "Feedback direto",
          description: "Recomendações práticas e objetivas para evoluir seu currículo.",
        },
        {
          icon: <Award size={22} />,
          title: "Pronto para o mercado",
          description: "Saia com um currículo competitivo e alinhado ao seu objetivo.",
        },
      ]}
    />
  )
}
