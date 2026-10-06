<template>
  <section class="section gallery-section" aria-labelledby="gallery-title">
    <div class="shell">
      <div class="section-heading">
        <div>
          <span class="eyebrow">{{ t('home.gallery_eyebrow') }}</span>
          <h2 id="gallery-title" class="section-title">
            {{ t('home.gallery_title') }}
          </h2>
          <p class="section-lead">{{ t('home.gallery_text') }}</p>
        </div>
        <NuxtLink class="button button--outline" :to="localePath('/gallery')">
          {{ t('home.gallery_link') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="preview-grid">
        <NuxtLink
          v-for="number in homeGalleryFanartNumbers"
          :key="number"
          class="preview-grid__item"
          :to="localePath('/gallery')"
          :aria-label="`${t('home.gallery_link')} · ${t('gallery.image_alt', { number, description: t(`gallery.image_descriptions.${number}`) })}`">
          <span class="preview-grid__artwork">
            <Image
              class="preview-grid__image"
              :src="`/images/fanarts/fanart-${number}.webp`"
              :alt="
                t('gallery.image_alt', {
                  number,
                  description: t(`gallery.image_descriptions.${number}`),
                })
              " />
          </span>
          <span class="preview-grid__badge" aria-hidden="true">
            <Icon class="preview-grid__icon" name="lucide:arrow-up-right" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { homeGalleryFanartNumbers } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.gallery-section {
  background: $peach;
}
.preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: $space-10;

  &__item {
    position: relative;
    display: block;
    padding: $space-10;
    overflow: hidden;
    border-radius: $radius-control;
    background: $gallery-background-peach;
  }
  &__item:nth-child(2) {
    background: $gallery-background-lilac;
  }
  &__item:nth-child(3) {
    background: $gallery-background-rose;
  }
  &__item:nth-child(4) {
    background: $gallery-background-sage;
  }
  &__artwork {
    display: block;
    overflow: hidden;
  }
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
    border-radius: $radius-small 0 0 0;
    background: $white;
    color: $ink;
    pointer-events: none;
  }
  &__icon {
    width: $gallery-icon-size;
    height: $gallery-icon-size;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .preview-grid__image {
    transition: transform $transition-artwork;
  }
  .preview-grid__item:focus-visible .preview-grid__image {
    transform: scale($artwork-hover-scale);
  }
  @media (hover: hover) and (pointer: fine) {
    .preview-grid__item:hover .preview-grid__image {
      transform: scale($artwork-hover-scale);
    }
  }
}

@media (min-width: 560px) {
  .preview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: $breakpoint-desktop) {
  .preview-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
