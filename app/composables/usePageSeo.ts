import { imageDimensions } from '~/data/imageDimensions'
import { pageSeo, robotsContent } from '~/data/seo'
import type { PageName } from '~/data/seo'
import { siteName } from '~/data/site'

export function usePageSeo(page: PageName) {
  const { t, localeProperties } = useI18n()
  const localePath = useLocalePath()
  const site = useSiteConfig()

  const pageData = pageSeo[page]

  const url = computed(() => new URL(localePath(pageData.path), site.url).href)
  const image = computed(() => new URL(pageData.image, site.url).href)
  const imageAlt = computed(() => t(pageData.imageAlt))

  const [imageWidth, imageHeight] = imageDimensions[pageData.image]!

  const title = computed(() => t(`seo.${page}.title`))
  const description = computed(() => t(`seo.${page}.description`))

  useSeoMeta({
    // Nuxt Robots supplies SSR tags; also restore the policy after a client
    // recovery from an error, where the error component's tag is disposed.
    robots: () =>
      String(site.indexable) === 'true'
        ? robotsContent.indexable
        : robotsContent.blocked,
    ogTitle: title,
    ogSiteName: siteName,
    description,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: imageAlt,
    ogImageWidth: imageWidth,
    ogImageHeight: imageHeight,
    ogImageType: 'image/webp',
    ogUrl: url,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@KeolaKumaneko',
  })

  useSchemaOrg([
    defineWebPage({
      '@type': pageData.type,
      name: title,
      description,
      url,
      inLanguage: computed(() => localeProperties.value.language),
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        caption: imageAlt,
        width: imageWidth,
        height: imageHeight,
      },
      ...(page === 'keola'
        ? { mainEntity: { '@id': new URL('/#identity', site.url).href } }
        : {}),
    }),
  ])

  return computed(() => ({
    title: title.value,
    titleTemplate: '%s',
    // The module initializes these on first load; keep the graph's default
    // node IDs and actions aligned with the page during client navigation.
    templateParams: {
      schemaOrg: {
        url: url.value,
        path: localePath(pageData.path),
      },
    },
  }))
}
