import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ana Souza",
    role: "Analista de Dados",
    text: "Depois da ProTalent, comecei a receber convites para entrevistas em menos de duas semanas. O currículo ficou muito mais estratégico e profissional.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Lucas Pereira",
    role: "Desenvolvedor Front-end",
    text: "O diferencial foi entender exatamente como os recrutadores leem o currículo. Mudou completamente minha forma de me apresentar.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Mariana Costa",
    role: "Estudante de TI",
    text: "Mesmo sem muita experiência, consegui um currículo que valoriza meus projetos e habilidades. Me senti muito mais confiante.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full bg-black text-white mb-20">
      <div className="max-w-7xl mx-auto px-6">
         {/* DIVISOR */}
        <div className="mb-20 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            O que dizem nossos clientes
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Histórias reais de profissionais que deram o próximo passo
            na carreira com a ProTalent.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              {/* Glow */}
              <div className="
                absolute -inset-1 rounded-2xl
                opacity-0 group-hover:opacity-100
                blur-xl transition
                bg-gradient-to-br from-blue-500 to-purple-600
              " />

              {/* Card */}
              <div className="relative bg-black border border-gray-800 rounded-2xl p-8 h-full">
                <Quote className="text-blue-500 mb-4" size={28} />

                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  “{item.text}”
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-700"
                  />

                  <div>
                    <p className="font-semibold text-sm">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
