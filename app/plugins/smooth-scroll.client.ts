import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !motionPreference.matches,
    syncTouch: false,
  })

  const removeNavigationGuard = router.beforeEach(() => {
    lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true })
  })
  const removePageHook = nuxtApp.hook('page:loading:end', () => {
    lenis.resize()
    if (!router.currentRoute.value.hash) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
  })

  function updateMotionPreference() {
    lenis.options.smoothWheel = !motionPreference.matches
    if (motionPreference.matches) {
      lenis.scrollTo(lenis.actualScroll, { immediate: true })
    }
  }

  motionPreference.addEventListener('change', updateMotionPreference)
  nuxtApp.vueApp.onUnmount(() => {
    removeNavigationGuard()
    removePageHook()
    motionPreference.removeEventListener('change', updateMotionPreference)
    lenis.destroy()
  })

  return {
    provide: {
      lenis,
    },
  }
})
