import { Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-black text-white pt-20 pb-10 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Conteúdo principal */}
        <div className="grid gap-12 md:grid-cols-3 border-b border-gray-800 pb-12">

          {/* Logo / About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Pro<span className="text-purple-500">Talent</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Ajudamos profissionais a se destacarem no mercado através de
              currículos estratégicos, tecnologia e posicionamento profissional.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Conecte-se</h4>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                text-gray-400 hover:text-blue-400
                transition
              "
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ProTalent. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
