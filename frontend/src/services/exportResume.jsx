export function slugify(name) {
  const slug = (name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^curriculo-?/, "")
  return slug || "sem-nome"
}

export const buildFilename = (name, ext) => `curriculo-${slugify(name)}.${ext}`

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/**
 * PDF: documento A4 vetorial real (texto selecionável, paginação automática,
 * coluna lateral de altura total no Moderno). Não é print de card.
 * A geração (lib @react-pdf/renderer) é carregada sob demanda.
 */
export async function exportResumePdf(layoutId, data, name) {
  const { generatePdfBlob } = await import("./resumePdf.jsx")
  const blob = await generatePdfBlob(layoutId, data)
  triggerDownload(blob, buildFilename(name, "pdf"))
}
