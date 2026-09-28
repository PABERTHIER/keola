<template>
  <section class="section gallery-section" aria-labelledby="gallery-title">
    <div class="shell">
      <div class="section-heading">
        <div>
          <span class="eyebrow">{{ t('home.gallery_eyebrow') }}</span>
          <h2 id="gallery-title" class="section-title">{{ t('home.gallery_title') }}</h2>
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
          <NuxtImg
            :src="`/images/fanart/fanart-${number}.webp`"
            :alt="t('gallery.image_alt', { number })"
            width="600"
            sizes="xs:75vw sm:40vw lg:22vw"
            loading="lazy" />
          <span aria-hidden="true"><Icon name="lucide:arrow-up-right" /></span>
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
  gap: 12px;

  &__item {
    position: relative;
    height: 295px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 6px;
    background: #e7d7c8;
  }
  &__item:nth-child(2) {
    background: #e8dceb;
  }
  &__item:nth-child(3) {
    background: #e1d6df;
  }
  &__item:nth-child(4) {
    background: #dbe3e2;
  }
  &__item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.35s ease;
  }
  &__item:hover img {
    transform: scale(1.04);
  }
  &__item > span {
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 4px;
    background: $white;
    color: $ink;
  }
}

@media (max-width: 720px) {
  .preview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }
  .preview-grid__item {
    height: 235px;
  }
}

@media (max-width: 420px) {
  .preview-grid__item {
    height: 175px;
  }
}
</style>
