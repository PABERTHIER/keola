const prodUrl = 'https://keola.vercel.app'
const siteUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_ENV === 'production'
      ? prodUrl
      : `https://${process.env.VERCEL_URL}`

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/webp', href: '/images/image01.webp' }], // TODO: Replace with /favicon.ico
      title: 'Keola',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { name: 'application-name', content: 'Keola' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Keola',
        },
        { name: 'theme-color', content: '#493047' }, // TODO: Is it the right theme-color value ?
      ],
      templateParams: {
        separator: '-',
      },
    },
  },
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
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
    url: prodUrl,
    name: 'Keola Kumaneko',
    identity: {
      type: 'Person',
    },
    indexable: true,
    robots: {
      index: true,
      follow: true,
    },
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Keola Kumaneko',
      url: prodUrl,
      logo: `${prodUrl}/logo.svg`, // TODO: Need a logo
      image: `${prodUrl}/images/og-image.webp`,
    },
  },
  ogImage: {
    enabled: false,
  },

  // TODO: Do we need it ?
  css: [
    '@fontsource/kaushan-script/400.css',
    '@fontsource/plus-jakarta-sans/400.css',
    '@fontsource/plus-jakarta-sans/500.css',
    '@fontsource/plus-jakarta-sans/700.css',
    '@fontsource/zen-maru-gothic/500.css',
    '@fontsource/zen-maru-gothic/700.css',
    '~/styles/default.scss',
  ],
})
