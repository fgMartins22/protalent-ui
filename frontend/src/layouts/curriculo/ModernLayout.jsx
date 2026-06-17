import { Mail, Pin, Link as LinkIcon } from "lucide-react"

const emptyText = "text-sm text-slate-400 italic"

export default function ModernLayout({ data, editing, onChange, exportMode = false }) {
  const p = data.person
  const initials = p.name ? p.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "FOTO"
  const location = [p.city, p.state].filter(Boolean).join(", ")
  const links = [p.linkedin, p.github, p.portfolio].filter(Boolean)

  return (
    <section className={`${exportMode ? "bg-white" : "bg-white border border-slate-200 rounded-xl shadow-sm"} overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr]`}>

      {/* Faixa lateral */}
      <aside className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-6 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-slate-300 font-semibold">
            {p.avatar ? <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" /> : initials}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{p.name || "Seu nome"}</h2>
            {p.title && <p className="text-sm text-slate-400">{p.title}</p>}
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-300">
          {location && (
            <div className="flex items-center gap-2"><Pin size={16} /><span>{location}</span></div>
          )}
          {p.email && (
            <div className="flex items-center gap-2"><Mail size={16} /><span>{p.email}</span></div>
          )}
        </div>

        {links.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l} className="flex items-center gap-2 break-all">
                  <LinkIcon size={16} className="shrink-0" /><span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Habilidades</h3>
          {data.skills.length === 0 ? (
            <p className="text-sm text-slate-400 italic">Nenhuma competência no perfil.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 text-xs rounded-md bg-slate-700 text-slate-200">{skill}</span>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="p-8 space-y-10">
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-800">Resumo Profissional</h3>
          {editing ? (
            <textarea
              value={data.resumo}
              onChange={(e) => onChange("resumo", e.target.value)}
              placeholder="Resumo profissional para esta vaga..."
              className="w-full min-h-[120px] border rounded-lg p-3 text-sm"
            />
          ) : data.resumo ? (
            <p className="text-slate-600 leading-relaxed">{data.resumo}</p>
          ) : (
            <p className={emptyText}>Sem resumo profissional.</p>
          )}
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800">Experiência</h3>
          {data.experiences.length === 0 ? (
            <p className={emptyText}>Nenhuma experiência cadastrada no perfil.</p>
          ) : (
            data.experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-900 pl-4 space-y-1">
                <p className="font-medium text-slate-800">{[exp.role, exp.company].filter(Boolean).join(" — ")}</p>
                {exp.period && <p className="text-sm text-slate-500">{exp.period}</p>}
              </div>
            ))
          )}
          {editing ? (
            <textarea
              value={data.experienciaDescricao}
              onChange={(e) => onChange("experienciaDescricao", e.target.value)}
              placeholder="Descreva suas experiências de forma personalizada para a vaga..."
              className="w-full min-h-[100px] border rounded-lg p-3 text-sm"
            />
          ) : (
            data.experienciaDescricao && <p className="text-slate-600">{data.experienciaDescricao}</p>
          )}
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800">Formação</h3>
          {data.educations.length === 0 ? (
            <p className={emptyText}>Nenhuma formação cadastrada no perfil.</p>
          ) : (
            data.educations.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-900 pl-4 space-y-1">
                <p className="font-medium text-slate-800">{[edu.course, edu.institution].filter(Boolean).join(" — ")}</p>
                {edu.period && <p className="text-sm text-slate-500">{edu.period}</p>}
              </div>
            ))
          )}
          {editing ? (
            <textarea
              value={data.educacaoDescricao}
              onChange={(e) => onChange("educacaoDescricao", e.target.value)}
              placeholder="Descrição personalizada da formação (opcional)..."
              className="w-full min-h-[80px] border rounded-lg p-3 text-sm"
            />
          ) : (
            data.educacaoDescricao && <p className="text-slate-600">{data.educacaoDescricao}</p>
          )}
        </section>
      </main>
    </section>
  )
}
