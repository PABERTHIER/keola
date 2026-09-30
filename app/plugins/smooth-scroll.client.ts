import Lenis from 'lenis'

export default defineNuxtPlugin(nuxtApp => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !motionPreference.matches,
    syncTouch: false,
  })

  function updateMotionPreference() {
    lenis.options.smoothWheel = !motionPreference.matches
    if (motionPreference.matches) {
      lenis.scrollTo(lenis.actualScroll, { immediate: true })
    }
  }

  motionPreference.addEventListener('change', updateMotionPreference)
  nuxtApp.vueApp.onUnmount(() => {
    motionPreference.removeEventListener('change', updateMotionPreference)
    lenis.destroy()
  })

  return {
    provide: {
      lenis,
    },
  }
})
