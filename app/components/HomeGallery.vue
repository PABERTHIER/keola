<template>
  <section class="section gallery-section" aria-labelledby="gallery-title">
    <div class="shell">
      <div class="section-heading">
        <div>
          <span class="eyebrow">
            {{ t('components.home_gallery.eyebrow') }}
          </span>
          <h2 id="gallery-title" class="section-title">
            {{ t('components.home_gallery.title') }}
          </h2>
          <div class="section-lead">
            <p>{{ t('components.home_gallery.text_1') }}</p>
            <p>{{ t('components.home_gallery.text_2') }}</p>
          </div>
        </div>
        <NuxtLink class="button button--outline" :to="localePath('/gallery')">
          {{ t('components.home_gallery.link') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="preview-grid">
        <NuxtLink
          v-for="number in homeGalleryFanartNumbers"
          :key="number"
          class="preview-grid__item"
          :to="localePath('/gallery')"
          :data-tooltip="`${t('components.home_gallery.link')} · ${t(`gallery.image_descriptions.${number}`)}`"
          :aria-label="`${t('components.home_gallery.link')} · ${t('gallery.image_alt', { number, description: t(`gallery.image_descriptions.${number}`) })}`">
          <span class="preview-grid__artwork">
            <Image
              class="preview-grid__image"
              :src="`/images/home-gallery/fanart-${number}.webp`"
              :alt="
                t('gallery.image_alt', {
                  number,
                  description: t(`gallery.image_descriptions.${number}`),
                })
              " />
            <span class="preview-grid__badge" aria-hidden="true">
              <Icon class="preview-grid__icon" name="lucide:arrow-up-right" />
            </span>
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

    &:nth-child(2) {
      background: $gallery-background-lilac;
    }

    &:nth-child(3) {
      background: $gallery-background-rose;
    }

    &:nth-child(4) {
      background: $gallery-background-sage;
    }
  }

  &__artwork {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  &__artwork &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center top;
  }

  &__badge {
    position: absolute;
    z-index: $z-artwork;
    right: 0;
    bottom: 0;
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
  .preview-grid {
    &__image {
      transition: transform $transition-artwork;
    }

    &__item:focus-visible &__image {
      transform: scale($artwork-hover-scale);
    }

    @media (hover: hover) and (pointer: fine) {
      &__item:hover &__image {
        transform: scale($artwork-hover-scale);
      }
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

    &__artwork {
      max-height: 150px;
    }
  }
}
</style>
