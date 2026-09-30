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
          <span class="eyebrow">2024 / Red Panda Network</span>
          <h2 id="redpandathon-title">{{ t('archives.redpandathon') }}</h2>
          <p>{{ t('archives.redpandathon_text') }}</p>
          <a
            class="button button--dark"
            :href="externalLinks.twitchSchedule"
            target="_blank"
            rel="noopener noreferrer">
            {{ t('archives.schedule_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <div class="archive-feature__images">
          <Image
            src="/images/red-panda-thon-2024-goals.webp"
            :alt="t('archives.redpandathon_alt')" />
          <Image
            src="/images/red-panda-thon-2024-impossible-goals.webp"
            :alt="t('archives.redpandathon_alt')" />
        </div>
      </article>
      <div class="archive-timeline">
        <article
          v-for="year in [2024, 2023]"
          :key="year"
          class="archive-timeline__item">
          <div class="archive-timeline__images">
            <Image
              :src="`/images/redebut-${year}-left-part.webp`"
              :alt="t('archives.redebut_alt', { year })" />
            <Image
              :src="`/images/redebut-${year}-right-part.webp`"
              :alt="t('archives.redebut_alt', { year })" />
          </div>
          <div class="archive-timeline__copy">
            <span class="eyebrow">{{ year }} / Keola Kumaneko</span>
            <h2>{{ t(`archives.redebut_${year}`) }}</h2>
            <p>{{ t('archives.redebut_text') }}</p>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()

useHead(usePageSeo('archives'))
</script>

<style lang="scss" scoped>
.archives-page {
  overflow-wrap: anywhere;
  padding-block: $space-70 $space-110;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $space-10;
}
.archive-feature__images img {
  width: 48%;
  max-height: 345px;
  object-fit: contain;
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
  display: flex;
  align-items: center;
  gap: $space-8;
  min-width: 0;
}
.archive-timeline__images img {
  width: calc(50% - 4px);
  max-height: 300px;
  object-fit: contain;
}
.archive-timeline__copy p {
  max-width: 440px;
  color: $muted;
}
@media (max-width: $breakpoint-mobile) {
  .archives-page {
    padding-block: $space-38 $space-70;
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
  .archive-timeline__images img {
    max-height: 260px;
  }
}
</style>
