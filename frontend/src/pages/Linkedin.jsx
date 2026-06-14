import { Linkedin as LinkedinIcon, Search, TrendingUp, Eye } from "lucide-react"
import FeaturePage from "../components/FeaturePage"

export default function Linkedin() {
  return (
    <FeaturePage
      badge="LinkedIn Otimizado"
      icon={<LinkedinIcon size={14} />}
      title="Seu LinkedIn pronto para"
      highlight="atrair recrutadores"
      description="Transforme seu perfil em um ímã de oportunidades, com headline, resumo e palavras-chave estratégicas."
      benefits={[
        {
          icon: <Search size={22} />,
          title: "Palavras-chave certas",
          description: "Apareça nas buscas dos recrutadores com termos alinhados à sua área.",
        },
        {
          icon: <TrendingUp size={22} />,
          title: "Headline de impacto",
          description: "Uma chamada que comunica valor e senioridade em segundos.",
        },
        {
          icon: <Eye size={22} />,
          title: "Mais visualizações",
          description: "Estrutura pensada para aumentar a relevância e o alcance do seu perfil.",
        },
      ]}
    />
  )
}
