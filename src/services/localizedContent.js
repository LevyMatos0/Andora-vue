// English API fields use the existing field name plus _ingles. Keep API data intact
// so switching back to Portuguese restores the originally published text.
function localizeRecord(record, fields, english) {
  if (!record || !english) return record
  const localized = { ...record }
  for (const field of fields) {
    const translated = record[`${field}_ingles`]
    if (typeof translated === 'string' && translated.trim()) localized[field] = translated
  }
  return localized
}

export function localizePublicContent(content, locale) {
  const english = String(locale).toLowerCase().split(/[-_]/)[0] === 'en'
  const localizeList = (items, fields) => items?.map(item => localizeRecord(item, fields, english)) ?? null
  return {
    site: content.site && {
      ...content.site,
      hero: localizeRecord(content.site.hero, ['titulo', 'descricao'], english),
      sobre: localizeRecord(content.site.sobre, ['titulo', 'texto'], english),
      contato: content.site.contato,
    },
    servicos: localizeList(content.servicos, ['srv_titulo', 'srv_descricao', 'srv_informacoes']),
    equipe: localizeList(content.equipe, ['tms_cargo', 'tms_apresentacao']),
    faqs: localizeList(content.faqs, ['pergunta', 'resposta']),
  }
}
