type PageName = 'home' | 'gallery' | 'credits' | 'archives' | 'media'

export function usePageSeo(page: PageName) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)

  const title = computed(() => t(`seo.${page}.title`))
  const description = computed(() => t(`seo.${page}.description`))

  useSeoMeta({
    description,
    ogDescription: description,
    ogImage: () => `${baseUrl.value}/images/og-image.webp`,
    ogImageAlt: computed(() => t('site.og_alt')),
    ogImageWidth: 1444,
    ogImageHeight: 840,
    ogImageType: 'image/webp',
    ogUrl: computed(() => `${baseUrl.value}${route.path}`),
    ogLocale: computed(
      () => ({ fr: 'fr_FR', en: 'en_US', ja: 'ja_JP' })[locale.value] || 'fr_FR'
    ),
    ogType: 'website',
  })

  return {
    title,
    titleTemplate: '%s',
    meta: [{ property: 'og:title', content: title }],
  }
}
