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
        <NuxtLink class="button button--outline" :to="localePath('/galerie')">
          {{ t('home.gallery_link') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="preview-grid">
        <NuxtLink
          v-for="number in fanartNumbers.slice(0, 4)"
          :key="number"
          class="preview-grid__item"
          :to="localePath('/galerie')"
          :aria-label="`${t('home.gallery_link')} · ${t('gallery.image_alt', { number })}`">
          <Image
            class="preview-grid__image"
            :src="`/images/fanart/fanart-${number}.webp`"
            :alt="t('gallery.image_alt', { number })" />
          <span class="preview-grid__badge" aria-hidden="true">
            <Icon class="preview-grid__icon" name="lucide:arrow-up-right" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { fanartNumbers } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.gallery-section {
  background: $peach;
}
.preview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: $space-12;

  &__item {
    position: relative;
    height: 295px;
    display: grid;
    place-items: center;
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
  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__badge {
    position: absolute;
    z-index: $z-artwork;
    right: $space-12;
    bottom: $space-12;
    width: $gallery-badge-size;
    height: $gallery-badge-size;
    display: grid;
    place-items: center;
    border-radius: $radius-small;
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

@media (max-width: $breakpoint-mobile) {
  .preview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-9;
  }
  .preview-grid__item {
    height: 235px;
  }
}

@media (max-width: $breakpoint-small) {
  .preview-grid__item {
    height: 175px;
  }
}
</style>
