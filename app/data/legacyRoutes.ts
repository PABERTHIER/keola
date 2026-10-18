// Server redirects live in server/middleware so sitemap locale matching does not treat an unprefixed redirect as a rule for every localized page
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
  credits: '/credits',
  topcredits: '/credits',
}
