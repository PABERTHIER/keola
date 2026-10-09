import type { RouterConfig } from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'

export default {
  async scrollBehavior(to, from, savedPosition) {
    if (import.meta.server) {
      return
    }

    const nuxtApp = useNuxtApp()
    const changingPage = to.path !== from.path

    // Wait for the destination's layout, rather than scrolling the old page
    if (changingPage && from !== START_LOCATION) {
      await new Promise<void>(resolve => {
        nuxtApp.hooks.hookOnce('page:loading:end', () => {
          requestAnimationFrame(() => resolve())
        })
      })
    }

    if (nuxtApp.$router.currentRoute.value.fullPath !== to.fullPath) {
      return false
    }

    const lenis = nuxtApp.$lenis
    lenis.resize()

    // History restoration takes priority over a hash, including same-page Back
    if (savedPosition) {
      lenis.scrollTo(savedPosition.top, { immediate: true })
      return false
    }

    if (!changingPage && !to.hash && !from.hash) {
      return false
    }

    const target = to.hash
      ? document.getElementById(decodeURIComponent(to.hash.slice(1)))
      : 0

    if (target === null) {
      return false
    }

    lenis.scrollTo(target, {
      duration: 0.65,
      immediate:
        from === START_LOCATION ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })

    {
      return false
    }
  },
} satisfies RouterConfig
