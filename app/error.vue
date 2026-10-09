<template>
  <div class="error-page">
    <a class="error-page__skip" href="#main-content">{{ t('site.skip') }}</a>
    <header class="error-page__header shell">
      <a
        :href="homePath"
        class="error-page__brand"
        @click.prevent="recover(homePath)">
        <Image
          src="/images/logo.webp"
          :alt="t('components.site_brand.brand_logo_alt')"
          loading="eager" />
        <span>{{ t('components.site_brand.brand_name') }}</span>
      </a>
      <span class="error-page__status">
        {{ t('error.code', { code: statusCode }) }}
      </span>
    </header>

    <main id="main-content" class="error-page__main shell" tabindex="-1">
      <div class="error-page__copy">
        <span class="eyebrow">{{ t('error.eyebrow') }}</span>
        <h1>{{ t(`error.${errorKind}.heading`) }}</h1>
        <p class="error-page__description">{{ description }}</p>
        <div class="error-page__actions">
          <a
            :href="homePath"
            class="button button--primary"
            @click.prevent="recover(homePath)">
            <Icon name="lucide:arrow-left" mode="svg" aria-hidden="true" />
            {{ t('site.back_home') }}
          </a>
          <a
            :href="galleryPath"
            class="button button--outline"
            @click.prevent="recover(galleryPath)">
            {{ t('error.explore_gallery') }}
            <Icon name="lucide:arrow-up-right" mode="svg" aria-hidden="true" />
          </a>
        </div>
      </div>

      <figure class="error-page__art">
        <span class="error-page__number" aria-hidden="true">
          {{ statusCode }}
        </span>
        <Image
          src="/images/keola/Keola_magnifying_glass.webp"
          :alt="t('credits.magnifying_glass_alt')"
          loading="eager"
          fetchpriority="high" />
        <figcaption>{{ t('error.art_caption') }}</figcaption>
      </figure>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { imageDimensions } from '~/data/imageDimensions'
import { robotsContent } from '~/data/seo'
import { siteName } from '~/data/site'

const props = defineProps<{ error: NuxtError }>()

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()
const route = useRoute()

const statusCode = computed(() => props.error.status || 500)
const errorKind = computed(() =>
  statusCode.value === 404 ? 'not_found' : 'unexpected'
)
const title = computed(() => t(`error.${errorKind.value}.title`))
const description = computed(() => t(`error.${errorKind.value}.description`))
const homePath = computed(() => localePath('/'))
const galleryPath = computed(() => localePath('/gallery'))

const imagePath = '/images/keola/Keola_magnifying_glass.webp'
const [imageWidth, imageHeight] = imageDimensions[imagePath]!

// Error pages preserve their HTTP status and must never become search results.
useResponseHeader('X-Robots-Tag').value = robotsContent.blocked
useSeoMeta({
  robots: robotsContent.blocked,
  description,
  ogTitle: title,
  ogDescription: description,
  ogSiteName: siteName,
  ogType: 'website',
  ogUrl: () => new URL(route.path, site.url).href,
  ogLocale: () => localeProperties.value.language?.replace('-', '_'),
  ogImage: () => new URL(imagePath, site.url).href,
  ogImageAlt: () => t('credits.magnifying_glass_alt'),
  ogImageWidth: imageWidth,
  ogImageHeight: imageHeight,
  ogImageType: 'image/webp',
})
useHead(() => ({
  title: title.value,
  titleTemplate: '%s',
  htmlAttrs: {
    lang: localeProperties.value.language,
    dir: localeProperties.value.dir || 'ltr',
  },
}))

async function recover(path: string) {
  await clearError({ redirect: path })
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100svh;
  background: $paper;

  &__skip {
    position: fixed;
    z-index: $z-skip-link;
    top: $space-8;
    left: $space-16;
    padding: $space-12 $space-18;
    background: $white;
    transform: translateY(-160%);

    &:focus {
      transform: translateY(0);
    }
  }

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $space-12 $space-24;
    padding-block: $space-20;
    border-bottom: $border-width solid $line;
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: $space-10;
    min-height: $control-size;
    font-family: $signature;
    font-size: $font-size-brand-mobile;

    img {
      width: $control-size;
      height: $control-size;
      object-fit: contain;
    }
  }

  &__status {
    color: $muted;
    font-size: $font-size-note;
  }

  &__main {
    display: grid;
    gap: $space-40;
    padding-block: $space-40 max($space-40, env(safe-area-inset-bottom));
  }

  &__copy {
    min-width: 0;

    h1 {
      max-width: 12ch;
      margin-block: $space-16 $space-20;
      font-size: clamp(2.15rem, 4.8vw, 4.5rem);
      text-wrap: balance;
      overflow-wrap: anywhere;
    }
  }

  &__description {
    max-width: 43ch;
    margin: 0;
    color: $muted;
    line-height: $line-height-copy;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-12;
    margin-top: $space-28;

    .button {
      width: 100%;
    }
  }

  &__art {
    position: relative;
    isolation: isolate;
    display: grid;
    justify-items: center;
    width: min(100%, 27rem);
    margin: 0 auto;
    padding: $space-24 $space-18;
    border-radius: 45% 45% $radius-art $radius-art;
    background: $peach;

    img {
      position: relative;
      width: 76%;
      margin-top: $space-32;
    }

    figcaption {
      position: relative;
      max-width: 28ch;
      margin-top: $space-18;
      color: $muted;
      font-size: $font-size-note;
      text-align: center;
    }
  }

  &__number {
    position: absolute;
    top: $space-8;
    color: $plum;
    font-family: $display;
    font-size: clamp(5rem, 17vw, 9rem);
    font-weight: $weight-bold;
    line-height: 1;
    letter-spacing: -0.06em;
  }
}

@media (min-width: $breakpoint-mobile) {
  .error-page__main {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    min-height: calc(100svh - 100px);
    gap: $space-48;
    padding-block: $space-60;
  }

  .error-page__actions .button {
    width: auto;
  }

  .error-page__art {
    padding: $space-32;
  }
}
</style>
