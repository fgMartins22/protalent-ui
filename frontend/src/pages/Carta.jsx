import { Mail, PenLine, Target, Zap } from "lucide-react"
import FeaturePage from "../components/FeaturePage"

export default function Carta() {
  return (
    <FeaturePage
      badge="Carta de Apresentação"
      icon={<Mail size={14} />}
      title="Cartas que abrem"
      highlight="conversas"
      description="Textos estratégicos que destacam suas conquistas e aumentam suas chances de resposta."
      benefits={[
        {
          icon: <PenLine size={22} />,
          title: "Texto personalizado",
          description: "Adaptado ao seu perfil e ao tom da empresa que você quer conquistar.",
        },
        {
          icon: <Target size={22} />,
          title: "Foco na vaga",
          description: "Conecta suas habilidades diretamente ao que a vaga procura.",
        },
        {
          icon: <Zap size={22} />,
          title: "Pronta em minutos",
          description: "Modelos prontos para você ajustar e enviar rapidamente.",
        },
      ]}
    />
  )
}
