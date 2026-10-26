import { computed, onMounted, onUnmounted, ref } from 'vue'

const storageKey = 'andora_theme'
const isTheme = value => value === 'light' || value === 'dark'

export function useTheme() {
  const media = window.matchMedia?.('(prefers-color-scheme: dark)')
  let stored
  try { stored = localStorage.getItem(storageKey) } catch { /* Theme still works when storage is blocked. */ }
  let manual = isTheme(stored)
  const systemTheme = () => media?.matches === false ? 'light' : 'dark'
  const theme = ref(manual ? stored : systemTheme())

  function apply(value) {
    theme.value = value
    document.documentElement.dataset.theme = value
    document.documentElement.style.colorScheme = value
  }
  function toggleTheme() {
    manual = true
    apply(theme.value === 'dark' ? 'light' : 'dark')
    try { localStorage.setItem(storageKey, theme.value) } catch { /* Keep the in-memory choice. */ }
  }
  function systemChanged() { if (!manual) apply(systemTheme()) }
  function storageChanged(event) {
    if (event.key !== storageKey && event.key !== null) return
    const value = event.key === null ? null : event.newValue
    manual = isTheme(value)
    apply(manual ? value : systemTheme())
  }

  apply(theme.value)
  onMounted(() => {
    if (media?.addEventListener) media.addEventListener('change', systemChanged)
    else media?.addListener?.(systemChanged)
    window.addEventListener('storage', storageChanged)
  })
  onUnmounted(() => {
    if (media?.removeEventListener) media.removeEventListener('change', systemChanged)
    else media?.removeListener?.(systemChanged)
    window.removeEventListener('storage', storageChanged)
  })
  return { theme, isDark: computed(() => theme.value === 'dark'), toggleTheme }
}
