import { legacyDestinations } from '~/data/legacyRoutes'

// Fragments never reach the server, so section bookmarks need a browser-side redirect after i18n has selected a locale
export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server || !/^\/(fr|en|ja)\/?$/.test(to.path)) {
    return
  }

  const destination = legacyDestinations[to.hash.slice(1).toLowerCase()]

  if (!destination) {
    return
  }

  const localePath = useLocalePath()

  const target = localePath(destination)
  const nuxtApp = useNuxtApp()

  // The server rendered the homepage without its fragment
  // Hydrate that HTML before replacing it, or Vue will patch the new page into the wrong DOM
  if (nuxtApp.isHydrating) {
    const source = to.fullPath
    const router = useRouter()

    onNuxtReady(() => {
      if (router.currentRoute.value.fullPath === source) {
        void navigateTo(target, { replace: true })
      }
    })

    return
  }

  return navigateTo(target, { replace: true })
})
