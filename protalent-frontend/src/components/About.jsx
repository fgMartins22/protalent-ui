import { motion, useScroll, useTransform } from "framer-motion"

import TeamCard from "./TeamCard"
import filipeAvatar from "../assets/cat-sanemi.jpg"
import eduardoAvatar from "../assets/cat-tengen.jpg"

export default function About() {
  const { scrollYProgress } = useScroll()

  // Parallax avançado
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -220])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section className="relative w-full bg-black text-white py-40 overflow-hidden">

      {/* BACKGROUND PARALLAX */}
      <motion.div
        style={{ y: ySlow, scale: scaleBg }}
        className="absolute -top-48 -left-48 w-[480px] h-[480px] bg-purple-600/20 rounded-full blur-[180px]"
      />

      <motion.div
        style={{ y: yFast, scale: scaleBg }}
        className="absolute top-1/3 -right-48 w-[520px] h-[520px] bg-blue-500/20 rounded-full blur-[180px]"
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Currículos que não apenas descrevem.
            <br />
            <span className="text-purple-500">Posicionam.</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Cada detalhe é pensado para comunicar clareza,
            senioridade e valor real.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative grid gap-40">

          {/* Linha central */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent -translate-x-1/2" />

          {/* SOBRE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="md:text-right md:pr-16">
              <h3 className="text-2xl font-semibold mb-4">
                Sobre a ProTalent
              </h3>

              <p className="text-gray-400 leading-relaxed">
                A ProTalent nasceu para ajudar profissionais
                a se destacarem em um mercado cada vez mais competitivo
                e automatizado.
              </p>
            </div>

            <div className="relative pl-16">
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-500" />
              <p className="text-gray-300 leading-relaxed max-w-md">
                Mais do que currículos, entregamos clareza,
                estratégia e posicionamento profissional.
              </p>
            </div>
          </motion.div>

          {/* DIFERENCIAL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="relative md:text-right md:pr-16 order-2 md:order-1">
              <div className="absolute right-0 top-2 w-3 h-3 rounded-full bg-blue-500" />
              <ul className="space-y-4 text-gray-400 max-w-md ml-auto">
                <li><span className="text-white">ATS First</span> — passa pelos filtros</li>
                <li><span className="text-white">Linguagem estratégica</span></li>
                <li><span className="text-white">Design com intenção</span></li>
                <li><span className="text-white">Leitura rápida</span></li>
              </ul>
            </div>

            <div className="order-1 md:order-2">
              <h4 className="text-2xl font-semibold mb-4">
                Nosso diferencial
              </h4>

              <p className="text-gray-400 leading-relaxed">
                Pensamos como recrutadores.
                Escrevemos como estrategistas.
              </p>
            </div>
          </motion.div>
        </div>

         {/* DIVISOR */}
        <div className="my-20 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* DEV */}
        <div>
          <motion.h4
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-4"
          >
            Desenvolvedores
          </motion.h4>

          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Desenvolvido por quem entende de código,
            produto e posicionamento.
          </p>

          <div className="grid gap-1 md:grid-cols-2 max-w-2xl mx-auto">
            <TeamCard
              name="Filipe"
              nickname="Fifas"
              surname="Martins"
              role="Desenvolvedor Full Stack & Idealizador"
              avatar={filipeAvatar}
              linkedin="https://www.linkedin.com/"
            />

            <TeamCard
              name="Eduardo"
              nickname="Duds"
              surname="Bazarelli"
              role="Desenvolvedor Full Stack"
              avatar={eduardoAvatar}
              linkedin="https://www.linkedin.com/"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
