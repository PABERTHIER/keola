// Handle old Carrd routes to prevent any 404 errors
const legacyPaths = {
  '/presentation': '/fr/keola',
  '/media-kit': '/fr/media-kit',
  '/mediakit': '/fr/media-kit',
  '/galerie': '/fr/gallery',
  '/gallery': '/fr/gallery',
  '/archives': '/fr/archives',
  '/credits': '/fr/credits',
  '/partenaires': '/fr/#partners-title',
} as const

export const legacyRouteRules = Object.fromEntries(
  Object.entries(legacyPaths).map(([path, to]) => [
    path,
    { redirect: { to, statusCode: 301 as const } },
  ])
)
