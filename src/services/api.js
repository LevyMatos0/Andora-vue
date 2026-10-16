// Public backend URL only. Database credentials never belong in the frontend.
const configuredBase = import.meta.env?.VITE_API_BASE_URL
// Vite forwards local requests to the backend so the panel can keep port 5173.
export const apiBase = (import.meta.env?.DEV
  ? ''
  : configuredBase || globalThis.location?.origin || 'http://localhost:3000').replace(/\/+$/, '')

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${apiBase}/api/${path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
    ...options,
  })
  if (!response.ok) throw new Error(`API ${path}: HTTP ${response.status}`)
  return response.json()
}

export function safeHttpUrl(value) {
  if (!value) return ''
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

export function uploadUrl(value) {
  if (!value) return ''
  const absolute = safeHttpUrl(value)
  if (absolute) return absolute
  const path = String(value).replace(/^\/?uploads\//, '')
  if (path.includes(':') || path.split('/').some(part => part === '..')) return ''
  return `${apiBase}/uploads/${path.split('/').map(encodeURIComponent).join('/')}`
}

export function activeItems(items, status, order) {
  return items.filter(item => Number(item[status]) === 1)
    .sort((a, b) => Number(a[order]) - Number(b[order]))
}
