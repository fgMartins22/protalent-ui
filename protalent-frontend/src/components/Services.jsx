import { FileText, Linkedin, Mail, User, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Services() {
  const navigate = useNavigate()

  const services = [
    {
      title: "Currículo Profissional",
      description:
        "Currículos personalizados, modernos e otimizados para sistemas de recrutamento (ATS).",
      icon: <FileText size={32} />,
      route: "/curriculos",
    },
    {
      title: "LinkedIn Otimizado",
      description:
        "Melhore seu perfil no LinkedIn para atrair recrutadores e oportunidades reais.",
      icon: <Linkedin size={32} />,
      route: "/linkedin",
    },
    {
      title: "Carta de Apresentação",
      description:
        "Textos estratégicos que destacam suas habilidades e aumentam suas chances.",
      icon: <Mail size={32} />,
      route: "/carta",
    },
    {
      title: "Consultoria de Currículos",
      description:
        "Avaliação personalizada do seu currículo com um especialista da área de recrutamento.",
      icon: <User size={32} />,
      route: "/consult",
    },
    {
      title: "Funcionalidades Premium",
      description:
        "Desbloqueie a assistência da IA para seus currículos e muito mais!",
      icon: <ShieldCheck size={32} />,
      route: "/buy",
    },
  ]

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Título */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos serviços
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Soluções completas para destacar seu perfil profissional no mercado de trabalho.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(service.route)}
              className={`
                border rounded-2xl p-8 cursor-pointer transition group
                ${
                  service.highlight
                    ? "border-black bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white hover:shadow-2xl"
                    : "bg-white hover:bg-gradient-to-br hover:from-gray-900 hover:via-black hover:to-gray-800 hover:text-white"
                }
              `}
            >
              {/* Ícone */}
              <div
                className={`
                  mb-6 transition transform
                  ${
                    service.highlight
                      ? "text-white"
                      : "text-black group-hover:text-white group-hover:scale-110"
                  }
                `}
              >
                {service.icon}
              </div>

              <h4 className="text-xl font-semibold mb-4">
                {service.title}
              </h4>

              <p
                className={`mb-6 ${
                  service.highlight
                    ? "text-gray-300"
                    : "text-gray-600 group-hover:text-gray-300"
                }`}
              >
                {service.description}
              </p>

              <span className="font-medium group-hover:underline">
                Saiba mais →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
