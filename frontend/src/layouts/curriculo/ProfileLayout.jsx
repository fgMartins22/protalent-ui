const emptyText = "text-sm text-slate-400 italic"

export default function ProfileLayout({ data, editing, onChange }) {
  const p = data.person
  const initials = p.name ? p.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "FOTO"
  const sub = [p.city, p.state].filter(Boolean).join(" • ")
  const line = [sub, p.email].filter(Boolean).join(" · ")

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Header com foto */}
      <header className="flex items-center gap-6 p-8 bg-gradient-to-r from-slate-50 to-white">
        <div className="w-28 h-28 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 font-semibold">
          {p.avatar ? (
            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">{p.name || "Seu nome"}</h2>
          {p.title && <p className="text-slate-500">{p.title}</p>}
          {line && <p className="text-sm text-slate-500">{line}</p>}
        </div>
      </header>

      <div className="p-8 space-y-8">

        {/* Resumo */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Perfil Profissional</h3>
          {editing ? (
            <textarea
              value={data.resumo}
              onChange={(e) => onChange("resumo", e.target.value)}
              placeholder="Resumo profissional para esta vaga..."
              className="w-full min-h-[96px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : data.resumo ? (
            <p className="text-slate-600 leading-relaxed">{data.resumo}</p>
          ) : (
            <p className={emptyText}>Sem resumo profissional.</p>
          )}
        </section>

        {/* Experiência */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Experiência</h3>
          {data.experiences.length === 0 ? (
            <p className={emptyText}>Nenhuma experiência cadastrada no perfil.</p>
          ) : (
            <div className="space-y-4 border-l-2 border-slate-200 pl-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <p className="font-medium text-slate-800">
                    {[exp.role, exp.company].filter(Boolean).join(" — ")}
                  </p>
                  {exp.period && <p className="text-sm text-slate-500">{exp.period}</p>}
                </div>
              ))}
            </div>
          )}
          {editing ? (
            <textarea
              value={data.experienciaDescricao}
              onChange={(e) => onChange("experienciaDescricao", e.target.value)}
              placeholder="Descreva suas experiências de forma personalizada para a vaga..."
              className="w-full min-h-[80px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            data.experienciaDescricao && <p className="text-sm text-slate-600">{data.experienciaDescricao}</p>
          )}
        </section>

        {/* Formação + Habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Formação</h3>
            {data.educations.length === 0 ? (
              <p className={emptyText}>Nenhuma formação cadastrada no perfil.</p>
            ) : (
              <div className="space-y-3 border-l-2 border-slate-200 pl-4">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-medium text-slate-800">
                      {[edu.course, edu.institution].filter(Boolean).join(" — ")}
                    </p>
                    {edu.period && <p className="text-sm text-slate-500">{edu.period}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Habilidades</h3>
            {data.skills.length === 0 ? (
              <p className={emptyText}>Nenhuma competência cadastrada no perfil.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}
