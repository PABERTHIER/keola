<template>
  <main id="main-content" tabindex="-1">
    <PageIntro
      :eyebrow="t('archives.eyebrow')"
      :title="t('archives.title')"
      :intro="[
        t('archives.intro_1'),
        t('archives.intro_2'),
        t('archives.intro_3'),
      ]"
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
    titleKey: 'redpandathon_goals_title',
  },
  {
    src: '/images/redpanda/RedPandathon_2024_impossible_goals.webp',
    altKey: 'redpandathon_impossible_alt',
    titleKey: 'redpandathon_impossible_title',
  },
] as const

const redebutYears = [2024, 2023] as const
const redebutSides = ['left', 'right'] as const

const artworks = computed(() => [
  ...featuredArtworks.map(artwork => ({
    src: artwork.src,
    alt: t(`archives.${artwork.altKey}`),
    title: t(`archives.${artwork.titleKey}`),
  })),
  ...redebutYears.flatMap(year =>
    redebutSides.map(side => ({
      src: `/images/debut/Keola_Redebut_${year}_${side}_part.webp`,
      alt: t(`archives.redebut_${side}_alt`, { year }),
      title: t(`archives.redebut_${side}_title`, { year }),
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

  &__copy {
    max-width: 520px;
    margin-inline: auto;

    .eyebrow {
      color: $archive-accent;
    }
  }

  h2 {
    margin: $space-15 0;
    font-size: 2.55rem;
  }

  p {
    color: $archive-text;
    line-height: $line-height-copy;
  }

  .button {
    margin-top: $space-13;
    background: $orange;
    color: $plum-deep;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: $space-10;

    img {
      max-height: 345px;
    }
  }

  .archive-artwork {
    color: $white-pure;
  }
}

.archive-timeline {
  margin-top: $space-70;

  h2 {
    margin: $space-15 0;
    font-size: 2.55rem;
  }

  &__item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-60;
    align-items: center;
    padding: $space-36 0;
    border-top: $border-width solid $line;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: $space-8;
    min-width: 0;

    img {
      max-height: 300px;
    }
  }

  &__copy p {
    max-width: 440px;
    color: $muted;
  }
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

  img {
    width: 100%;
    border-radius: $radius-art;
  }

  span {
    display: grid;
    place-items: center;
    min-height: $control-size;
    font-size: $font-size-secondary;
    font-weight: $weight-bold;
    text-align: center;
  }

  &:hover span,
  &:focus-visible span {
    text-decoration: underline;
  }
}

@media (min-width: $breakpoint-mobile) and (max-width: $breakpoint-tablet) {
  .archive-feature {
    &__images {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .archives-page {
    padding-block: $space-38 $space-30;
  }

  .archive-feature {
    grid-template-columns: minmax(0, 1fr);
    gap: $space-25;
    padding: $space-25;

    &__copy {
      text-align: center;
    }

    h2 {
      font-size: 2rem;
    }
  }

  .archive-timeline {
    margin-top: $space-40;

    h2 {
      font-size: 2rem;
    }

    &__item {
      grid-template-columns: minmax(0, 1fr);
      gap: $space-10;
    }

    &__copy {
      text-align: center;
      order: -1;

      p {
        margin-inline: auto;
      }
    }

    &__images img {
      max-height: 260px;
    }
  }
}
</style>
