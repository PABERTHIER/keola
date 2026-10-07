<template>
  <main id="main-content">
    <PageIntro
      :eyebrow="t('archives.eyebrow')"
      :title="t('archives.title')"
      :intro="t('archives.intro')"
      tone="spirit" />
    <div class="archives-page shell">
      <article class="archive-feature" aria-labelledby="redpandathon-title">
        <div class="archive-feature__copy">
          <span class="eyebrow">{{ t('archives.redpandathon_eyebrow') }}</span>
          <h2 id="redpandathon-title">{{ t('archives.redpandathon') }}</h2>
          <p>{{ t('archives.redpandathon_text') }}</p>
          <a
            class="button button--dark"
            :href="externalLinks.twitchSchedule"
            target="_blank"
            rel="noopener noreferrer">
            <Icon
              name="keo-icon:twitch-logo"
              mode="svg"
              size="20"
              aria-hidden="true" />
            {{ t('archives.schedule_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <div class="archive-feature__images">
          <button
            v-for="(artwork, index) in featuredArtworks"
            :key="artwork.src"
            class="archive-artwork"
            type="button"
            :data-tooltip="t('archives.enlarge_image')"
            @click="openArtwork(index, $event)">
            <Image :src="artwork.src" :alt="t(`archives.${artwork.altKey}`)" />
            <span>{{ t('archives.enlarge_image') }}</span>
          </button>
        </div>
      </article>
      <div class="archive-timeline">
        <article
          v-for="(year, yearIndex) in redebutYears"
          :key="year"
          class="archive-timeline__item">
          <div class="archive-timeline__images">
            <button
              v-for="(side, sideIndex) in redebutSides"
              :key="side"
              class="archive-artwork"
              type="button"
              :data-tooltip="t('archives.enlarge_image')"
              @click="
                openArtwork(
                  featuredArtworks.length +
                    yearIndex * redebutSides.length +
                    sideIndex,
                  $event
                )
              ">
              <Image
                :src="`/images/debut/Keola_Redebut_${year}_${side}_part.webp`"
                :alt="t(`archives.redebut_${side}_alt`, { year })" />
              <span>{{ t('archives.enlarge_image') }}</span>
            </button>
          </div>
          <div class="archive-timeline__copy">
            <span class="eyebrow">{{ year }} / Keola Kumaneko</span>
            <h2>{{ t(`archives.redebut_${year}`) }}</h2>
            <p>{{ t('archives.redebut_text') }}</p>
          </div>
        </article>
      </div>
    </div>
    <ArtworkLightbox
      ref="viewer"
      :artworks="artworks"
      :label="t('archives.title')" />
  </main>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()
const featuredArtworks = [
  {
    src: '/images/redpanda/RedPandathon_2024_goals.webp',
    altKey: 'redpandathon_goals_alt',
  },
  {
    src: '/images/redpanda/RedPandathon_2024_impossible_goals.webp',
    altKey: 'redpandathon_impossible_alt',
  },
] as const
const redebutYears = [2024, 2023] as const
const redebutSides = ['left', 'right'] as const
const artworks = computed(() => [
  ...featuredArtworks.map(artwork => ({
    src: artwork.src,
    alt: t(`archives.${artwork.altKey}`),
  })),
  ...redebutYears.flatMap(year =>
    redebutSides.map(side => ({
      src: `/images/debut/Keola_Redebut_${year}_${side}_part.webp`,
      alt: t(`archives.redebut_${side}_alt`, { year }),
    }))
  ),
])
const viewer = ref<{
  open: (index: number, trigger?: HTMLElement) => void
} | null>(null)

function openArtwork(index: number, event: MouseEvent) {
  viewer.value?.open(index, event.currentTarget as HTMLElement)
}

useHead(usePageSeo('archives'))
</script>

<style lang="scss" scoped>
.archives-page {
  overflow-wrap: anywhere;
  padding-block: $space-70 $space-40;
}
.archive-feature {
  --focus-color: #{$orange};
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: $space-45;
  align-items: center;
  padding: $space-45;
  border-radius: $radius-control;
  background: $plum;
  color: $white-pure;
}
.archive-feature__copy {
  max-width: 520px;
}
.archive-feature__copy .eyebrow {
  color: $archive-accent;
}
.archive-feature h2,
.archive-timeline h2 {
  margin: $space-15 0;
  font-size: 2.55rem;
}
.archive-feature p {
  color: $archive-text;
  line-height: $line-height-copy;
}
.archive-feature .button {
  margin-top: $space-13;
  background: $orange;
  color: $plum-deep;
}
.archive-feature__images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: $space-10;
}
.archive-feature__images img {
  max-height: 345px;
}
.archive-timeline {
  margin-top: $space-70;
}
.archive-timeline__item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: $space-60;
  align-items: center;
  padding: $space-36 0;
  border-top: $border-width solid $line;
}
.archive-timeline__images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: $space-8;
  min-width: 0;
}
.archive-timeline__images img {
  max-height: 300px;
}
.archive-artwork {
  display: grid;
  justify-items: center;
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: $link-hover;
}
.archive-artwork img {
  width: 100%;
  border-radius: $radius-art;
}
.archive-artwork span {
  display: grid;
  place-items: center;
  min-height: $control-size;
  font-size: $font-size-secondary;
  font-weight: $weight-bold;
  text-align: center;
}
.archive-artwork:hover span,
.archive-artwork:focus-visible span {
  text-decoration: underline;
}
.archive-feature .archive-artwork {
  color: $white-pure;
}
.archive-timeline__copy p {
  max-width: 440px;
  color: $muted;
}
@media (max-width: $breakpoint-mobile) {
  .archives-page {
    padding-block: $space-38 $space-30;
  }
  .archive-feature,
  .archive-timeline__item {
    grid-template-columns: minmax(0, 1fr);
    gap: $space-25;
  }
  .archive-feature {
    padding: $space-25;
  }
  .archive-feature h2,
  .archive-timeline h2 {
    font-size: 2rem;
  }
  .archive-timeline {
    margin-top: $space-40;
  }
  .archive-timeline__item {
    gap: $space-10;
  }
  .archive-timeline__copy {
    order: -1;
  }
  .archive-timeline__images img {
    max-height: 260px;
  }
}
</style>
