import { Mail, Pin, Link } from "lucide-react"

export default function ModernLayout({ data, editing, onChange }) {

    const habilidades = Array.isArray(data.habilidades)
        ? data.habilidades
        : []

    return (
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr]">

            {/* Faixa lateral esquerda */}
            <aside className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-6 space-y-8">

                {/* Foto + Nome */}
                <div className="text-center space-y-3">
                    <div className="w-28 h-28 mx-auto rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                        FOTO
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Nome do Profissional
                        </h2>
                        <p className="text-sm text-slate-400">
                            Front-end Developer
                        </p>
                    </div>
                </div>

                {/* Informações pessoais */}
                <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                        <Pin size={16} />
                        <span>São Paulo, SP</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>email@email.com</span>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                        Links
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2 hover:text-white transition">
                            <Link size={16} />
                            <span>github.com/usuario</span>
                        </li>

                        <li className="flex items-center gap-2 hover:text-white transition">
                            <Link size={16} />
                            <span>linkedin.com/in/usuario</span>
                        </li>
                    </ul>
                </div>

                {/* Habilidades */}
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                        Habilidades
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {habilidades.map(skill => (
                            <span
                                key={skill}
                                className="px-2 py-1 text-xs rounded-md bg-slate-700 text-slate-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {editing && (
                        <input
                            placeholder="Digite e pressione Enter"
                            className="mt-3 w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onKeyDown={e => {
                                if (e.key === "Enter" && e.target.value.trim()) {
                                    onChange("habilidades", [...habilidades, e.target.value.trim()])
                                    e.target.value = ""
                                }
                            }}
                        />
                    )}
                </div>

                {/* Linguagens */}
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                        Linguagens
                    </h3>

                    <ul className="text-sm space-y-1 text-slate-300">
                        <li>Português — Nativo</li>
                        <li>Inglês — Avançado</li>
                    </ul>
                </div>

            </aside>

            {/* Conteúdo principal */}
            <main className="p-8 space-y-10">

                {/* Resumo */}
                <section className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-800">
                        Resumo Profissional
                    </h3>

                    {editing ? (
                        <textarea
                            value={data.resumo}
                            onChange={e => onChange("resumo", e.target.value)}
                            className="w-full min-h-[120px] border rounded-lg p-3 text-sm"
                        />
                    ) : (
                        <p className="text-slate-600 leading-relaxed">
                            {data.resumo}
                        </p>
                    )}
                </section>

                {/* Experiência */}
                <section className="space-y-6">

                    <h3 className="text-xl font-semibold text-slate-800">
                        Experiência
                    </h3>

                    <div className="border-l-4 border-blue-900 pl-4 space-y-2">
                        <p className="font-medium text-slate-800">
                            Empresa X — Front-end Developer
                        </p>

                        <p className="text-sm text-slate-500">
                            2022 • Atual
                        </p>

                        {editing ? (
                            <textarea
                                value={data.experiencia}
                                onChange={e => onChange("experiencia", e.target.value)}
                                className="w-full min-h-[100px] border rounded-lg p-3 text-sm"
                            />
                        ) : (
                            <p className="text-slate-600">
                                {data.experiencia}
                            </p>
                        )}
                    </div>
                </section>

                {/* Formação */}
                <section className="space-y-6">

                    <h3 className="text-xl font-semibold text-slate-800">
                        Formação
                    </h3>

                    <div className="border-l-4 border-blue-900 pl-4 space-y-2">

                        <p className="font-medium text-slate-800">
                            Análise e Desenvolvimento de Sistemas
                        </p>

                        <p className="text-sm text-slate-500">
                            Universidade XYZ • 2021
                        </p>

                        {editing ? (
                            <textarea
                                value={data.educacao}
                                onChange={e => onChange("educacao", e.target.value)}
                                className="w-full min-h-[80px] border rounded-lg p-3 text-sm"
                                placeholder="Descreva sua formação, projetos acadêmicos, áreas de estudo, etc."
                            />
                        ) : (
                            <p className="text-slate-600">
                                {data.educacao}
                            </p>
                        )}

                    </div>
                </section>
            </main>

        </section>
    )
}