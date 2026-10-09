// Handle old Carrd routes to prevent any 404 errors
const legacyPaths = {
  '/presentation': '/fr/keola',
  '/media-kit': '/fr/kit-media',
  '/mediakit': '/fr/kit-media',
  '/galerie': '/fr/gallery',
  '/gallery': '/fr/gallery',
  '/archives': '/fr/archives',
  '/credits': '/fr/credits',
  '/partenaires': '/fr/#partners-title',
} as const

export const legacyRouteRules = Object.fromEntries(
  Object.entries(legacyPaths).flatMap(([path, to]) => [
    [path, { redirect: { to, statusCode: 301 as const } }],
    [`${path}/`, { redirect: { to, statusCode: 301 as const } }],
  ])
)
