<template>
  <main id="main-content">
    <PageIntro
      :eyebrow="t('gallery.eyebrow')"
      :title="t('gallery.title')"
      :intro="t('gallery.intro')" />
    <section class="gallery-page shell" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" class="sr-only">{{ t('site.gallery') }}</h2>
      <div class="gallery-wall">
        <button
          v-for="(number, index) in fanartNumbers"
          :key="number"
          class="gallery-item"
          type="button"
          :aria-label="`${t('gallery.open', { number })} : ${t(`gallery.image_descriptions.${number}`)}`"
          @click="openArtwork(index, $event)">
          <Image
            class="gallery-item__image"
            :src="`/images/fanarts/fanart-${number}.webp`"
            :alt="
              t('gallery.image_alt', {
                number,
                description: t(`gallery.image_descriptions.${number}`),
              })
            " />
          <span class="gallery-item__badge" aria-hidden="true">
            <Icon class="gallery-item__icon" name="lucide:expand" />
          </span>
        </button>
      </div>
      <p class="gallery-page__note">{{ t('gallery.credit_note') }}</p>
    </section>

    <ArtworkLightbox
      ref="viewer"
      :artworks="artworks"
      :label="t('site.gallery')" />
  </main>
</template>

<script setup lang="ts">
import { fanartNumbers } from '~/data/site'

const { t } = useI18n()
const viewer = ref<{
  open: (index: number, trigger?: HTMLElement) => void
} | null>(null)
const artworks = computed(() =>
  fanartNumbers.map(number => ({
    src: `/images/fanarts/fanart-${number}.webp`,
    alt: t('gallery.image_alt', {
      number,
      description: t(`gallery.image_descriptions.${number}`),
    }),
  }))
)

useHead(usePageSeo('gallery'))

function openArtwork(index: number, event: MouseEvent) {
  viewer.value?.open(index, event.currentTarget as HTMLElement)
}
</script>

<style lang="scss" scoped>
.gallery-page {
  padding-block: 65px $space-100;
}
.gallery-wall {
  columns: $gallery-column-width 4;
  column-gap: $space-13;
}
.gallery-item {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 $space-13;
  padding: 0;
  overflow: hidden;
  break-inside: avoid;
  border: $border-width solid $line;
  border-radius: $radius-control;
  background: $white;
  cursor: zoom-in;

  &__image {
    width: 100%;
    height: auto;
  }
  &__badge {
    position: absolute;
    z-index: $z-artwork;
    right: $space-10;
    bottom: $space-10;
    width: $gallery-badge-size;
    height: $gallery-badge-size;
    display: grid;
    place-items: center;
    border-radius: $radius-small;
    background: $white;
    color: $ink;
    pointer-events: none;
    transition: opacity $transition-ui;
  }
  &__icon {
    width: $gallery-icon-size;
    height: $gallery-icon-size;
  }
}

@media (hover: hover) and (pointer: fine) {
  .gallery-item__badge {
    opacity: 0;
  }
  .gallery-item:hover .gallery-item__badge,
  .gallery-item:focus-visible .gallery-item__badge {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .gallery-item__image {
    transition: transform $transition-artwork;
  }
  .gallery-item:focus-visible .gallery-item__image {
    transform: scale($artwork-hover-scale);
  }
  @media (hover: hover) and (pointer: fine) {
    .gallery-item:hover .gallery-item__image {
      transform: scale($artwork-hover-scale);
    }
  }
}
.gallery-page__note {
  max-width: 650px;
  margin: 35px 0 0;
  color: $muted;
  font-size: $font-size-note;
}

@media (max-width: $breakpoint-mobile) {
  .gallery-page {
    padding-block: $space-38 $space-70;
  }
  .gallery-wall {
    column-gap: $space-9;
  }
  .gallery-item {
    margin-bottom: $space-9;
  }
}
</style>
