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
          <NuxtImg
            :src="`/images/fanart/fanart-${number}.webp`"
            :alt="t('gallery.image_alt', { number })"
            width="650"
            sizes="xs:92vw sm:46vw md:31vw lg:23vw"
            loading="lazy" />
          <span aria-hidden="true"><Icon name="lucide:expand" /></span>
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
  columns: 4;
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

  img {
    width: 100%;
    height: auto;
  }
  span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 4px;
    background: $white;
    color: $ink;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  &:hover span,
  &:focus-visible span {
    opacity: 1;
  }
}
.gallery-page__note {
  max-width: 650px;
  margin: 35px 0 0;
  color: $muted;
  font-size: 0.82rem;
}

@media (max-width: 1024px) {
  .gallery-wall {
    columns: 3;
  }
}
@media (max-width: 720px) {
  .gallery-page {
    padding-block: 38px 70px;
  }
  .gallery-wall {
    columns: 2;
    column-gap: 9px;
  }
  .gallery-item {
    margin-bottom: 9px;
  }
  .gallery-item span {
    opacity: 1;
  }
}
@media (max-width: 375px) {
  .gallery-wall {
    columns: 1;
  }
}
</style>
