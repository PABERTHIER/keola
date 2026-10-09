import { legacyRouteRules } from './app/data/legacyRoutes'
import { pageSeo, robotsContent } from './app/data/seo'
import { externalLinks, siteName } from './app/data/site'

// Set NUXT_SITE_URL at build time when the final production domain is confirmed.
const prodUrl = (
  process.env.NUXT_SITE_URL || 'https://keola.vercel.app'
).replace(/\/$/, '')

const siteUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_ENV === 'production'
      ? prodUrl
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : prodUrl

const indexable =
  process.env.NODE_ENV !== 'development' &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production')

export default defineNuxtConfig({
  routeRules: legacyRouteRules,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }, // TODO: Replace with /favicon.ico
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      title: siteName,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { name: 'application-name', content: siteName },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        {
          name: 'apple-mobile-web-app-title',
          content: siteName,
        },
        { name: 'theme-color', content: '#ff7b00' },
      ],
      templateParams: {
        separator: '-',
      },
    },
  },
  ssr: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  plugins: [],
  build: {
    transpile: [],
  },
  typescript: {
    strict: true,
  },
  modules: ['@nuxt/icon', '@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/eslint'],
  imports: {
    dirs: [],
  },
  runtimeConfig: {
    public: {
      apiBase: '',
      i18n: {
        baseUrl: siteUrl,
      },
    },
  },
  icon: {
    clientBundle: {
      includeCustomCollections: true,
    },
    customCollections: [
      {
        prefix: 'keo-icon',
        dir: './app/assets/svg',
      },
    ],
  },
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'fr',
    langDir: 'locales',
    strategy: 'prefix',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja-JP.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  css: [
    '@fontsource/kaushan-script/400.css',
    '@fontsource/plus-jakarta-sans/400.css',
    '@fontsource/plus-jakarta-sans/700.css',
    '@fontsource/zen-maru-gothic/500.css',
    '@fontsource/zen-maru-gothic/700.css',
    '~/styles/default.scss',
    '~/styles/keyframes.scss',
    '~/styles/shared.scss',
    '~/styles/cursors.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
        '@vueuse/core',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
      ],
    },
    plugins: [],
  },
  compatibilityDate: '2026-09-27',
  devtools: {
    enabled: true,
  },
  site: {
    url: siteUrl,
    name: siteName,
    defaultLocale: 'fr-FR',
    trailingSlash: false,
    indexable,
  },
  robots: {
    robotsEnabledValue: robotsContent.indexable,
    robotsDisabledValue: robotsContent.blocked,
  },
  sitemap: {
    // Runtime SSR pages aren't crawled for images by the sitemap module.
    // i18n expands each record into FR/EN/JA with reciprocal alternates.
    urls: Object.values(pageSeo).map(page => ({
      loc: page.path,
      _i18nTransform: true,
      images: page.images.map(loc => ({ loc })),
    })),
  },
  schemaOrg: {
    reactive: true,
    identity: {
      type: 'Person',
      name: siteName,
      jobTitle: 'VTuber',
      worksFor: 'Keola',
      url: siteUrl,
      logo: `${siteUrl}/images/logo.webp`, // TODO: Need a svg logo
      image: `${siteUrl}/images/models/Keola_v3_portrait.webp`,
      sameAs: [
        externalLinks.twitch,
        externalLinks.youtube,
        externalLinks.bluesky,
        externalLinks.instagram,
        externalLinks.tiktok,
        externalLinks.x,
      ],
    },
  },
  unhead: {
    vite: {
      // Preserve this helper's reactive useSchemaOrg call on the client.
      // Other server-only composables can still be removed normally.
      treeshake: {
        filter: {
          exclude: [/[/\\]app[/\\]composables[/\\]usePageSeo\.ts(?:\?|$)/],
        },
      },
    },
  },
  ogImage: {
    enabled: false,
  },
})
