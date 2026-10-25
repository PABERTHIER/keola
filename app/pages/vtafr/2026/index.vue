<template>
  <main id="main-content" tabindex="-1">
    <PageIntro
      :eyebrow="t('vtafr_2026.eyebrow')"
      :title="t('vtafr_2026.title')"
      :intro="[t('vtafr_2026.intro_1'), t('vtafr_2026.intro_2')]" />

    <div class="vtafr-page shell">
      <section class="vtafr-status" aria-labelledby="vtafr-status-title">
        <div>
          <span class="eyebrow">{{ t('vtafr_2026.status_label') }}</span>
          <h2 id="vtafr-status-title">{{ t('vtafr_2026.status_title') }}</h2>
          <p>{{ t('vtafr_2026.status_text') }}</p>
        </div>
        <a
          class="button button--primary"
          :href="externalLinks.vtafr"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('vtafr_2026.official_site') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </a>
      </section>

      <section class="vtafr-section" aria-labelledby="vtafr-about-title">
        <div class="vtafr-section__heading">
          <span class="eyebrow">{{ t('vtafr_2026.about_eyebrow') }}</span>
          <h2 id="vtafr-about-title">{{ t('vtafr_2026.about_title') }}</h2>
          <Image
            class="vtafr-section__art"
            src="/images/keola/Keola_surprised.webp"
            :alt="t('vtafr_2026.about_art_alt')" />
        </div>
        <div class="vtafr-section__body">
          <p>{{ t('vtafr_2026.about_text') }}</p>
          <p>{{ t('vtafr_2026.organizers') }}</p>
          <p>{{ t('vtafr_2026.eligibility') }}</p>
          <a
            class="vtafr-text-link"
            :href="externalLinks.vtafrAbout"
            target="_blank"
            rel="noopener noreferrer">
            {{ t('vtafr_2026.rules_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="how-to-vote"
        class="vtafr-guide"
        aria-labelledby="vtafr-guide-title">
        <span class="eyebrow">{{ t('vtafr_2026.guide_eyebrow') }}</span>
        <h2 id="vtafr-guide-title">{{ t('vtafr_2026.guide_title') }}</h2>
        <p class="vtafr-guide__lead">{{ t('vtafr_2026.guide_intro_1') }}</p>
        <p class="vtafr-guide__lead">{{ t('vtafr_2026.guide_intro_2') }}</p>
        <ol class="vtafr-steps">
          <li v-for="step in steps" :key="step">
            <span class="vtafr-steps__number" aria-hidden="true">
              0{{ step }}
            </span>
            <div>
              <h3>{{ t(`vtafr_2026.steps.${step}.title`) }}</h3>
              <p>{{ t(`vtafr_2026.steps.${step}.text`) }}</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="vtafr-history" aria-labelledby="vtafr-history-title">
        <span class="eyebrow">{{ t('vtafr_2026.history_eyebrow') }}</span>
        <h2 id="vtafr-history-title">{{ t('vtafr_2026.history_title') }}</h2>
        <div class="vtafr-history__grid">
          <article
            v-for="edition in pastEditions"
            :key="edition.year"
            class="vtafr-history__edition">
            <div class="vtafr-history__top">
              <span class="vtafr-history__year">{{ edition.year }}</span>
              <Image
                class="vtafr-history__emote"
                :src="edition.emote"
                :alt="t(`vtafr_2026.history.${edition.year}.emote_alt`)" />
            </div>
            <h3>{{ t(`vtafr_2026.history.${edition.year}.title`) }}</h3>
            <p>{{ t(`vtafr_2026.history.${edition.year}.text_1`) }}</p>
            <p>{{ t(`vtafr_2026.history.${edition.year}.text_2`) }}</p>
            <p>{{ t(`vtafr_2026.history.${edition.year}.text_3`) }}</p>
            <a
              class="vtafr-text-link"
              :href="edition.replay"
              target="_blank"
              rel="noopener noreferrer">
              {{ t('vtafr_2026.replay_link', { year: edition.year }) }}
              <Icon name="lucide:arrow-up-right" aria-hidden="true" />
            </a>
          </article>
        </div>
        <a
          class="vtafr-text-link"
          :href="externalLinks.vtafrEditions"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('vtafr_2026.editions_link') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </a>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()

const steps = [1, 2, 3, 4] as const
const pastEditions = [
  {
    year: 2024,
    replay: externalLinks.vtafrReplay2024,
    emote: '/images/emotes/keolaQueen.png',
  },
  {
    year: 2025,
    replay: externalLinks.vtafrReplay2025,
    emote: '/images/emotes/keolaLurk.png',
  },
] as const

useHead(usePageSeo('vtafr_2026'))
</script>

<style lang="scss" scoped>
.vtafr-page {
  padding-block: $space-55;
}

.vtafr-status {
  display: grid;
  gap: $space-24;
  padding: $space-28;
  border-left: 5px solid $orange;
  border-radius: $radius-control;
  background: $plum;
  color: $white-pure;

  .eyebrow {
    color: $footer-link-hover;
  }

  h2 {
    margin: $space-10 0;
    font-size: clamp(1.5rem, 6vw, 2rem);
  }

  p {
    max-width: 65ch;
    margin: 0;
    line-height: $line-height-copy;
  }

  .button {
    justify-self: start;
    text-align: center;

    &:focus-visible {
      --focus-color: #{$white-pure};
    }
  }
}

.vtafr-section {
  display: grid;
  gap: $space-20;
  padding-block: $space-55;
  border-bottom: $border-width solid $line;

  h2 {
    margin: $space-12 0 0;
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }

  &__body {
    max-width: 68ch;
  }

  &__art {
    width: auto;
    max-height: 210px;
    margin: $space-24 auto 0;
  }

  p {
    margin: 0 0 $space-16;
    line-height: $line-height-copy;
  }
}

.vtafr-guide,
.vtafr-history {
  h2 {
    margin: $space-12 0 $space-16;
    font-size: clamp(1.8rem, 7vw, 2.5rem);
    overflow-wrap: anywhere;
  }
}

.vtafr-guide {
  padding-block: $space-55;

  &__lead {
    max-width: 70ch;
    line-height: $line-height-copy;
  }

  &__lead + &__lead {
    margin-top: $space-12;
  }
}

.vtafr-steps {
  display: grid;
  gap: $space-12;
  margin: $space-28 0 0;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: $space-16;
    padding: $space-20;
    border: $border-width solid $line;
    border-radius: $radius-control;
    background: $white;
  }

  li > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  &__number {
    color: $link-hover;
    font-size: 1.4rem;
    font-weight: $weight-heavy;
    line-height: 1.2;
  }

  h3 {
    margin: 0 0 $space-7;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: $muted;
    line-height: $line-height-copy;
  }
}

.vtafr-history {
  border-top: $border-width solid $line;
  padding-top: $space-55;

  &__grid {
    display: grid;
    gap: $space-14;
    margin-block: $space-28 $space-20;
  }

  &__edition {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: $space-24;
    border-radius: $radius-control;
    background: $spirit;
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-12;
  }

  &__emote {
    width: 72px;
    flex: none;
  }

  &__year {
    color: $plum-text;
    font-size: 2rem;
    font-weight: $weight-heavy;
  }

  h3 {
    margin: $space-8 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    line-height: $line-height-copy;
  }

  &__edition .vtafr-text-link {
    align-self: flex-start;
    margin-top: auto;
    padding-top: $space-16;
  }
}

.vtafr-text-link {
  display: inline-flex;
  min-height: $control-size;
  align-items: center;
  gap: $space-7;
  color: $link-hover;
  font-weight: $weight-bold;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

@media (min-width: $breakpoint-mobile) {
  .vtafr-status {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    padding: $space-38;
  }

  .vtafr-section {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
    gap: $space-45;

    &__art {
      max-height: 210px;
      margin-inline: 0;
    }
  }

  .vtafr-steps,
  .vtafr-history__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: $breakpoint-small) {
  .vtafr-status {
    padding: $space-20;
  }

  .vtafr-steps li {
    gap: $space-10;
    padding: $space-16;
  }

  .vtafr-history__emote {
    width: 56px;
  }
}
</style>
