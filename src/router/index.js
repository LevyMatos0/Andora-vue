import { createRouter, createWebHashHistory } from 'vue-router'
import { nextTick } from 'vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      await nextTick()
      const target = document.getElementById(to.hash.slice(1))
      if (!target) return false
      return {
        el: target,
        top: (document.getElementById('header')?.offsetHeight || 0) + 16,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: HomeView
    }
  ]
})

export default router
