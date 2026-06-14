/**
 * Normaliza um valor de mês ("YYYY-MM", vindo de <input type="month">) para
 * uma data válida do PostgreSQL ("YYYY-MM-01"). Vazio/null vira null.
 * Datas completas ("YYYY-MM-DD") são mantidas como estão.
 */
export function monthToDate(value?: string | null): string | null {
  if (!value) return null
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`
  return value
}
