/* eslint-disable react-refresh/only-export-components */
import { Document, Page, View, Text, Image, StyleSheet, pdf } from "@react-pdf/renderer"

const C = {
  slate900: "#0f172a", slate800: "#1e293b", slate700: "#334155", slate600: "#475569",
  slate500: "#64748b", slate400: "#94a3b8", slate200: "#e2e8f0", slate100: "#f1f5f9",
  white: "#ffffff", purple: "#7c3aed", blue: "#1e3a8a",
}

const s = StyleSheet.create({
  page: { paddingTop: 56, paddingBottom: 48, paddingHorizontal: 48, fontSize: 10, fontFamily: "Helvetica", color: C.slate700, lineHeight: 1.45 },
  header: { marginBottom: 12 },
  name: { fontSize: 23, fontFamily: "Helvetica-Bold", color: C.slate900, lineHeight: 1.2, marginBottom: 3 },
  subtitle: { fontSize: 11, color: C.slate600, marginTop: 5 },
  contact: { fontSize: 9, color: C.slate500, marginTop: 5 },
  sectionTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: C.slate800, marginTop: 20, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: C.slate200, paddingBottom: 4 },
  itemTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: C.slate800 },
  period: { fontSize: 9, color: C.slate500, marginBottom: 3 },
  para: { marginTop: 3, color: C.slate600 },
  itemBlock: { marginBottom: 10 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  chip: { fontSize: 9, color: C.slate700, backgroundColor: C.slate100, borderRadius: 4, paddingVertical: 3, paddingHorizontal: 7, marginRight: 6, marginBottom: 6 },
  empty: { fontSize: 9, color: C.slate400, fontStyle: "italic" },
})

const join = (arr, sep) => arr.filter(Boolean).join(sep)

function Section({ title, children }) {
  return (
    <View>
      <Text style={s.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

function ItemList({ items, kind }) {
  if (!items.length) return <Text style={s.empty}>Nenhum registro cadastrado no perfil.</Text>
  return items.map((e) => (
    <View key={e.id} style={s.itemBlock}>
      <Text style={s.itemTitle}>
        {kind === "exp" ? join([e.role, e.company], " — ") : join([e.course, e.institution], " — ")}
      </Text>
      {e.period ? <Text style={s.period}>{e.period}</Text> : null}
    </View>
  ))
}

function Chips({ skills }) {
  if (!skills.length) return <Text style={s.empty}>Nenhuma competência cadastrada.</Text>
  return (
    <View style={s.chipRow}>
      {skills.map((sk) => <Text key={sk} style={s.chip}>{sk}</Text>)}
    </View>
  )
}

function singleColumn(data) {
  const p = data.person
  const headerLine = join([p.title, join([p.city, p.state], " - ")], "  •  ")
  const contact = join([p.email, p.phone, p.linkedin, p.github, p.portfolio], "  •  ")
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{p.name || "Sem nome"}</Text>
          {headerLine ? <Text style={s.subtitle}>{headerLine}</Text> : null}
          {contact ? <Text style={s.contact}>{contact}</Text> : null}
        </View>

        {data.resumo ? (
          <Section title="Resumo Profissional"><Text style={s.para}>{data.resumo}</Text></Section>
        ) : null}

        <Section title="Experiência Profissional">
          <ItemList items={data.experiences} kind="exp" />
          {data.experienciaDescricao ? <Text style={s.para}>{data.experienciaDescricao}</Text> : null}
        </Section>

        <Section title="Formação">
          <ItemList items={data.educations} kind="edu" />
          {data.educacaoDescricao ? <Text style={s.para}>{data.educacaoDescricao}</Text> : null}
        </Section>

        <Section title="Competências"><Chips skills={data.skills} /></Section>
      </Page>
    </Document>
  )
}

function profileColumn(data) {
  const p = data.person
  const headerLine = join([p.title, join([p.city, p.state], " - ")], "  •  ")
  const contact = join([p.email, p.phone, p.linkedin, p.github, p.portfolio], "  •  ")
  const initials = p.name ? p.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : ""
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
          {p.avatar ? (
            <Image src={p.avatar} style={{ width: 64, height: 64, borderRadius: 32, marginRight: 14 }} />
          ) : (
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: C.slate100, marginRight: 14, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 18, color: C.slate400, fontFamily: "Helvetica-Bold" }}>{initials}</Text>
            </View>
          )}
          <View>
            <Text style={s.name}>{p.name || "Sem nome"}</Text>
            {headerLine ? <Text style={s.subtitle}>{headerLine}</Text> : null}
            {contact ? <Text style={s.contact}>{contact}</Text> : null}
          </View>
        </View>

        {data.resumo ? (<Section title="Perfil Profissional"><Text style={s.para}>{data.resumo}</Text></Section>) : null}
        <Section title="Experiência"><ItemList items={data.experiences} kind="exp" />{data.experienciaDescricao ? <Text style={s.para}>{data.experienciaDescricao}</Text> : null}</Section>
        <Section title="Formação"><ItemList items={data.educations} kind="edu" />{data.educacaoDescricao ? <Text style={s.para}>{data.educacaoDescricao}</Text> : null}</Section>
        <Section title="Competências"><Chips skills={data.skills} /></Section>
      </Page>
    </Document>
  )
}

function modernColumn(data) {
  const p = data.person
  const location = join([p.city, p.state], ", ")
  const links = [p.linkedin, p.github, p.portfolio].filter(Boolean)
  const SIDEBAR = 178
  const sideLabel = { fontSize: 8, color: "#94a3b8", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }
  const sideText = { fontSize: 8.5, color: "#cbd5e1", marginBottom: 3 }
  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "Helvetica", fontSize: 10, color: C.slate700, lineHeight: 1.45 }}>
        {/* Coluna lateral escura — repete em todas as páginas (altura total) */}
        <View fixed style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: SIDEBAR, backgroundColor: C.slate900, padding: 24, paddingTop: 36 }}>
          <Text style={{ fontSize: 15, fontFamily: "Helvetica-Bold", color: C.white }}>{p.name || "Sem nome"}</Text>
          {p.title ? <Text style={{ fontSize: 9, color: "#cbd5e1", marginTop: 3 }}>{p.title}</Text> : null}
          <View style={{ marginTop: 16 }}>
            {location ? <Text style={sideText}>{location}</Text> : null}
            {p.email ? <Text style={sideText}>{p.email}</Text> : null}
            {p.phone ? <Text style={sideText}>{p.phone}</Text> : null}
          </View>
          {links.length ? (
            <View style={{ marginTop: 16 }}>
              <Text style={sideLabel}>Links</Text>
              {links.map((l) => <Text key={l} style={sideText}>{l}</Text>)}
            </View>
          ) : null}
          {data.skills.length ? (
            <View style={{ marginTop: 16 }}>
              <Text style={sideLabel}>Habilidades</Text>
              {data.skills.map((sk) => <Text key={sk} style={{ fontSize: 8.5, color: "#e2e8f0", marginBottom: 2 }}>{sk}</Text>)}
            </View>
          ) : null}
        </View>

        {/* Conteúdo principal — flui por várias páginas, sempre ao lado da coluna */}
        <View style={{ marginLeft: SIDEBAR, paddingTop: 40, paddingBottom: 40, paddingHorizontal: 30 }}>
          {data.resumo ? (<><Text style={s.sectionTitle}>Resumo Profissional</Text><Text style={s.para}>{data.resumo}</Text></>) : null}
          <Text style={s.sectionTitle}>Experiência</Text>
          <ItemList items={data.experiences} kind="exp" />
          {data.experienciaDescricao ? <Text style={s.para}>{data.experienciaDescricao}</Text> : null}
          <Text style={s.sectionTitle}>Formação</Text>
          <ItemList items={data.educations} kind="edu" />
          {data.educacaoDescricao ? <Text style={s.para}>{data.educacaoDescricao}</Text> : null}
        </View>
      </Page>
    </Document>
  )
}

function buildResumeDocElement(layoutId, data) {
  if (layoutId === "modern") return modernColumn(data)
  if (layoutId === "profile") return profileColumn(data)
  return singleColumn(data)
}

export async function generatePdfBlob(layoutId, data) {
  return pdf(buildResumeDocElement(layoutId, data)).toBlob()
}
