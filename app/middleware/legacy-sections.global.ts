// Fragments are never sent to the server, so old Carrd section bookmarks need a browser-side redirect after i18n has selected a locale
const legacySections: Record<string, string> = {
  '#presentation': '/keola',
  '#media-kit': '/media-kit',
  '#mediakit': '/media-kit',
  '#galerie': '/gallery',
  '#archives': '/archives',
  '#credits': '/credits',
  '#partenaires': '/#partners-title',
}

export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server || !/^\/(fr|en|ja)\/?$/.test(to.path)) {
    return
  }

  const destination = legacySections[to.hash.toLowerCase()]

  if (!destination) {
    return
  }

  const localePath = useLocalePath()

  return navigateTo(localePath(destination), { replace: true })
})
