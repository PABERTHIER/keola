export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()
  let pendingPath: string | null = null

  function focusDestination(hash: string) {
    const target = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : document.getElementById('main-content')

    if (!target) {
      return
    }

    const hadTabindex = target.hasAttribute('tabindex')

    if (!hadTabindex) {
      target.setAttribute('tabindex', '-1')
    }

    target.focus({ preventScroll: true })

    if (!hadTabindex) {
      target.addEventListener(
        'blur',
        () => target.removeAttribute('tabindex'),
        { once: true }
      )
    }
  }

  const removeGuard = router.afterEach((to, from) => {
    if (to.path !== from.path) {
      pendingPath = to.path

      return
    }

    if (to.hash && to.hash !== from.hash) {
      requestAnimationFrame(() => {
        focusDestination(to.hash)
      })
    }
  })

  const removePageHook = nuxtApp.hook('page:finish', () => {
    if (pendingPath !== router.currentRoute.value.path) {
      return
    }

    pendingPath = null

    requestAnimationFrame(() => {
      focusDestination(router.currentRoute.value.hash)
    })
  })

  nuxtApp.vueApp.onUnmount(() => {
    removeGuard()
    removePageHook()
  })
})
