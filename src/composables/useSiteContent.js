import { computed, reactive, readonly } from 'vue'
import { useI18n } from 'vue-i18n'
import { activeItems, apiRequest } from '../services/api'
import { localizePublicContent } from '../services/localizedContent'

// null means no successful response yet; [] means the panel published no items.
const state = reactive({ site: null, servicos: null, equipe: null, faqs: null })
let pending

export function refreshSiteContent() {
  if (pending) return pending
  const endpoints = [
    ['site', 'site'],
    ['servicos', 'servicos'],
    ['equipe', 'team'],
    ['faqs', 'faqs?ativos=true'],
  ]
  pending = Promise.allSettled(endpoints.map(async ([key, path]) => {
    let data = await apiRequest(path)
    if (key === 'site') {
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid site response')
    } else {
      if (!Array.isArray(data)) throw new Error(`Invalid ${key} response`)
      if (key === 'servicos') data = activeItems(data, 'srv_ativo', 'srv_ordem')
      if (key === 'equipe') data = activeItems(data, 'tms_status', 'tms_ordem')
      if (key === 'faqs') data = activeItems(data, 'status', 'ordem')
    }
    state[key] = data
  })).then(results => {
    for (const result of results) {
      if (result.status === 'rejected') console.warn('Conteúdo do site indisponível:', result.reason)
    }
  }).finally(() => { pending = undefined })
  return pending
}

export function useSiteContent() {
  const { locale } = useI18n({ useScope: 'global' })
  const localized = computed(() => localizePublicContent(state, locale.value))
  return readonly(reactive({
    site: computed(() => localized.value.site),
    servicos: computed(() => localized.value.servicos),
    equipe: computed(() => localized.value.equipe),
    faqs: computed(() => localized.value.faqs),
  }))
}
