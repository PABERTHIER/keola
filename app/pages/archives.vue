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
          <NuxtImg
            src="/images/red-panda-thon-2024-goals.webp"
            :alt="t('archives.redpandathon_alt')"
            width="550"
            sizes="xs:45vw md:24vw"
            loading="lazy" />
          <NuxtImg
            src="/images/red-panda-thon-2024-impossible-goals.webp"
            :alt="t('archives.redpandathon_alt')"
            width="550"
            sizes="xs:45vw md:24vw"
            loading="lazy" />
        </div>
      </article>
      <div class="archive-timeline">
        <article v-for="year in [2024, 2023]" :key="year" class="archive-timeline__item">
          <div class="archive-timeline__images">
            <NuxtImg
              :src="`/images/redebut-${year}-left-part.webp`"
              :alt="t('archives.redebut_alt', { year })"
              width="600"
              sizes="xs:45vw md:24vw"
              loading="lazy" />
            <NuxtImg
              :src="`/images/redebut-${year}-right-part.webp`"
              :alt="t('archives.redebut_alt', { year })"
              width="600"
              sizes="xs:45vw md:24vw"
              loading="lazy" />
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
  padding-block: 70px 110px;
}
.archive-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  align-items: center;
  padding: 45px;
  border-radius: 6px;
  background: $plum;
  color: white;
}
.archive-feature__copy {
  max-width: 520px;
}
.archive-feature__copy .eyebrow {
  color: #ffb76f;
}
.archive-feature h2,
.archive-timeline h2 {
  margin: 15px 0;
  font-size: 2.55rem;
}
.archive-feature p {
  color: #f4dfea;
  line-height: 1.75;
}
.archive-feature .button {
  margin-top: 13px;
  background: $orange;
  color: $plum-deep;
}
.archive-feature__images {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.archive-feature__images img {
  width: 48%;
  max-height: 345px;
  object-fit: contain;
}
.archive-timeline {
  margin-top: 70px;
}
.archive-timeline__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 36px 0;
  border-top: 1px solid $line;
}
.archive-timeline__images {
  display: flex;
  align-items: center;
  gap: 8px;
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
@media (max-width: 720px) {
  .archives-page {
    padding-block: 38px 70px;
  }
  .archive-feature,
  .archive-timeline__item {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  .archive-feature {
    padding: 25px;
  }
  .archive-feature h2,
  .archive-timeline h2 {
    font-size: 2rem;
  }
  .archive-timeline {
    margin-top: 40px;
  }
  .archive-timeline__item {
    gap: 10px;
  }
  .archive-timeline__images img {
    max-height: 260px;
  }
}
</style>
