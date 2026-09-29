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
          :aria-label="t('gallery.open', { number })"
          @click="openArtwork(index)">
          <Image
            class="gallery-item__image"
            :src="`/images/fanart/fanart-${number}.webp`"
            :alt="t('gallery.image_alt', { number })" />
          <span class="gallery-item__badge" aria-hidden="true">
            <Icon class="gallery-item__icon" name="lucide:expand" />
          </span>
        </button>
      </div>
      <p class="gallery-page__note">{{ t('gallery.credit_note') }}</p>
    </section>

    <FanartLightbox ref="viewer" :numbers="fanartNumbers" />
  </main>
</template>

<script setup lang="ts">
import { fanartNumbers } from '~/data/site'

const { t } = useI18n()
const viewer = ref<{ open: (index: number) => void } | null>(null)

useHead(usePageSeo('gallery'))

function openArtwork(index: number) {
  viewer.value?.open(index)
}
</script>

<style lang="scss" scoped>
.gallery-page {
  padding-block: 65px 100px;
}
.gallery-wall {
  columns: 16rem 4;
  column-gap: 13px;
}
.gallery-item {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 13px;
  padding: 0;
  overflow: hidden;
  break-inside: avoid;
  border: 1px solid $line;
  border-radius: 6px;
  background: $white;
  cursor: zoom-in;

  &__image {
    width: 100%;
    height: auto;
  }
  &__badge {
    position: absolute;
    z-index: 1;
    right: 10px;
    bottom: 10px;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 4px;
    background: $white;
    color: $ink;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  &__icon {
    width: 18px;
    height: 18px;
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
    transition: transform 0.35s ease;
  }
  .gallery-item:focus-visible .gallery-item__image {
    transform: scale(1.04);
  }
  @media (hover: hover) and (pointer: fine) {
    .gallery-item:hover .gallery-item__image {
      transform: scale(1.04);
    }
  }
}
.gallery-page__note {
  max-width: 650px;
  margin: 35px 0 0;
  color: $muted;
  font-size: 0.82rem;
}

@media (max-width: 720px) {
  .gallery-page {
    padding-block: 38px 70px;
  }
  .gallery-wall {
    column-gap: 9px;
  }
  .gallery-item {
    margin-bottom: 9px;
  }
}
</style>
