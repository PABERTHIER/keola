// Fragments are never sent to the server, so old Carrd section bookmarks need a browser-side redirect after i18n has selected a locale
const legacySections: Record<string, string> = {
  '#presentation': '/keola',
  '#mediakit': '/media-kit',
  '#partenaires': '/#partners-title',
  '#fanart': '/gallery',
  '#archive': '/archives',
  '#goal': '/archives#redpandathon-title',
  '#redpandathon': '/archives#redpandathon-title',
  '#credits': '/credits',
  '#topcredits': '/credits',
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
