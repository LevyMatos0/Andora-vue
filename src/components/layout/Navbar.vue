<template>
  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container position-relative d-flex align-items-center justify-content-between gap-3">
      <RouterLink :to="{ path: '/', hash: '#hero' }" class="logo d-flex align-items-center me-auto me-xl-0" @click="closeMenu">
        <img src="../../assets/img/icone/ANDORA-COMPLETO-ST-NEGATIVO.png" alt="Andora">
      </RouterLink>

      <nav id="navmenu" ref="navigation" class="navmenu" :aria-label="$t('nav.menu')" @click.self="closeMenu" @keydown="trapMenuFocus">
        <ul id="navigation-links">
          <li v-for="link in links" :key="link.section">
            <RouterLink :to="{ path: '/', hash: `#${link.section}` }" :class="{ active: activeSection === link.section }" :aria-current="activeSection === link.section ? 'location' : undefined" @click="closeMenu">
              {{ $t(link.label) }}
            </RouterLink>
          </li>
        </ul>
        <button ref="menuButton" type="button" class="mobile-nav-toggle d-xl-none" :aria-label="menuOpen ? $t('nav.fecharMenu') : $t('nav.abrirMenu')" :aria-expanded="menuOpen" aria-controls="navigation-links" @click="toggleMenu">
          <i class="bi" :class="menuOpen ? 'bi-x' : 'bi-list'" aria-hidden="true"></i>
        </button>
      </nav>

      <button class="language-toggle btn btn-outline-light btn-sm d-flex align-items-center gap-1" :title="$t('langButton.tooltip')" @click="toggleLocale">
        <i class="bi bi-globe2" aria-hidden="true"></i>
        <span>{{ $t('langButton.label') }}</span>
      </button>

      <div class="header-social-links d-none d-sm-flex">
        <a href="https://www.instagram.com/andora.desenvolvimento/" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="https://x.com/Andora_dev" aria-label="X"><i class="bi bi-twitter-x"></i></a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref(null)
const navigation = ref(null)
const links = [
  { section: 'hero', label: 'nav.inicio' },
  { section: 'about', label: 'nav.sobre' },
  { section: 'services', label: 'nav.servicos' },
  { section: 'team', label: 'nav.quemSomos' },
  { section: 'contact', label: 'nav.contato' },
]
const activeSection = computed(() => route.hash.slice(1) || 'hero')
watch(menuOpen, open => document.body.classList.toggle('mobile-nav-active', open), { flush: 'sync' })

function closeMenu() { menuOpen.value = false }
async function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    await nextTick()
    navigation.value?.querySelector('a')?.focus()
  }
}
function onEscape(event) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
    menuButton.value?.focus()
  }
}
function onResize() { if (window.innerWidth >= 1200) closeMenu() }
function trapMenuFocus(event) {
  if (!menuOpen.value || event.key !== 'Tab') return
  const controls = navigation.value.querySelectorAll('a, button')
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}
function toggleLocale() { locale.value = locale.value === 'pt' ? 'en' : 'pt' }
onMounted(() => {
  document.addEventListener('keydown', onEscape)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  document.body.classList.remove('mobile-nav-active')
  document.removeEventListener('keydown', onEscape)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.header .logo img { max-height: 60px; max-width: 180px; object-fit: contain; }
.mobile-nav-toggle { background: none; border: 0; padding: 8px; min-width: 44px; min-height: 44px; }
.mobile-nav-toggle:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 3px; }
@media (max-width: 1199px) {
  .language-toggle { order: 2; margin-left: auto; }
  .header-social-links { order: 2; }
}
@media (max-width: 575px) { .header .logo img { max-width: 135px; max-height: 48px; } }
</style>
