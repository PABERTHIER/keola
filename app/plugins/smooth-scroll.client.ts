import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    syncTouch: false,
    virtualScroll: () =>
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  })

  const removeNavigationGuard = router.beforeEach(() => {
    lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true })
  })
  nuxtApp.vueApp.onUnmount(() => {
    removeNavigationGuard()
    lenis.destroy()
  })

  return {
    provide: {
      lenis,
    },
  }
})
