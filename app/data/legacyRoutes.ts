// Public Carrd bookmarks and the old standalone path aliases share destinations
export const legacyDestinations: Record<string, string> = {
  presentation: '/keola',
  mediakit: '/media-kit',
  'media-kit': '/media-kit',
  partenaires: '/#partners-title',
  fanart: '/gallery',
  galerie: '/gallery',
  gallery: '/gallery',
  archive: '/archives',
  archives: '/archives',
  goal: '/archives#redpandathon-title',
  redpandathon: '/archives#redpandathon-title',
  RedPandathon: '/archives#redpandathon-title',
  credits: '/credits',
  topcredits: '/credits',
}

export const legacyRouteRules = Object.fromEntries(
  Object.entries(legacyDestinations).map(([path, destination]) => [
    `/${path}`,
    { redirect: { to: `/fr${destination}`, statusCode: 301 as const } },
  ])
)
