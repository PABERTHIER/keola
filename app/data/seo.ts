import { fanartNumbers, homeGalleryFanartNumbers } from './site'

// Shared by Nuxt Robots (HTTP/SSR), content pages and error recovery (client).
export const robotsContent = {
  indexable:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  blocked: 'noindex, nofollow',
} as const

// Keep each selected artwork with its existing translated description.
// Sitemap images describe content available on the page, including its viewer.
export const pageSeo = {
  home: {
    path: '/',
    type: 'WebPage',
    image: '/images/og-image.webp',
    imageAlt: 'components.home_hero.alts.4',
    images: [
      ...Array.from(
        { length: 9 },
        (_, i) => `/images/slideshows/slideshow-${i + 1}.webp`
      ),
      ...homeGalleryFanartNumbers.map(
        number => `/images/fanarts/fanart-${number}.webp`
      ),
      '/images/fanarts/fanart-32-home.webp',
      '/images/keola/Keola_left_side_inclined_v1.webp',
      '/images/keola/Keola_Peak.webp',
    ],
  },
  keola: {
    path: '/keola',
    type: 'AboutPage',
    image: '/images/models/Keola_v3_portrait.webp',
    imageAlt: 'keola.portrait_alt',
    images: [
      '/images/models/Keola_v3_portrait.webp',
      '/images/keola/Keola_left_side_inclined_v2.webp',
      '/images/keola/Keola_chibi_looking.webp',
      '/images/keola/Keola_pirate_sat_heart_eyes.webp',
      '/images/misc/Petits_esprits.webp',
      '/images/debut/Keola_Debut.webp',
      '/images/debut/Keola_Schedule_debut.webp',
      '/images/models/Keola_models_evolution.webp',
      '/images/models/Keola_v3.webp',
      '/images/models/Keola_v4.webp',
      '/images/models/Keola_v5.webp',
      '/images/models/Keola_Refsheet_2025.webp',
      '/images/models/Keola_Ref_model_v5.webp',
      '/images/models/Keola_Refsheet_2026.webp',
    ],
  },
  gallery: {
    path: '/gallery',
    type: 'CollectionPage',
    image: '/images/fanarts/fanart-92.webp',
    imageAlt: 'gallery.image_descriptions.92',
    images: fanartNumbers.map(
      number => `/images/fanarts/fanart-${number}.webp`
    ),
  },
  credits: {
    path: '/credits',
    type: 'WebPage',
    image: '/images/misc/Credits.webp',
    imageAlt: 'keola.more.credits_art_alt',
    images: ['/images/keola/Keola_magnifying_glass.webp'],
  },
  archives: {
    path: '/archives',
    type: 'CollectionPage',
    image: '/images/models/Keola_Refsheet_2025.webp',
    imageAlt: 'keola.models.sheet2025_alt',
    images: [
      '/images/redpanda/RedPandathon_2024_goals.webp',
      '/images/redpanda/RedPandathon_2024_impossible_goals.webp',
      ...[2023, 2024].flatMap(year =>
        ['left', 'right'].map(
          side => `/images/debut/Keola_Redebut_${year}_${side}_part.webp`
        )
      ),
    ],
  },
  media: {
    path: '/media-kit',
    type: 'ContactPage',
    image: '/images/misc/Mediakit.webp',
    imageAlt: 'media.preview_alt',
    images: [
      '/images/misc/Mediakit.webp',
      '/images/keola/Keola_pirate_blep.webp',
      '/images/keola/Keola_pirate_blush.webp',
    ],
  },
} as const

export type PageName = keyof typeof pageSeo
