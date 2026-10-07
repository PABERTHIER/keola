<template>
  <main id="main-content">
    <HomeHero />

    <section
      id="schedule"
      class="schedule-band"
      aria-labelledby="schedule-title">
      <div class="shell schedule-band__inner">
        <span class="schedule-band__icon" aria-hidden="true">
          <Icon name="lucide:calendar-days" />
        </span>
        <div class="schedule-band__copy">
          <span class="eyebrow">{{ t('home.schedule_eyebrow') }}</span>
          <h2 id="schedule-title">{{ t('home.schedule_title') }}</h2>
          <p>{{ t('home.schedule_text') }}</p>
        </div>
        <div class="schedule-band__actions">
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
            {{ t('home.schedule_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
          <a
            class="text-link"
            :href="externalLinks.twitch"
            target="_blank"
            rel="noopener noreferrer">
            <Icon
              name="keo-icon:twitch-logo"
              mode="svg"
              size="20"
              aria-hidden="true" />
            {{ t('home.schedule_watch') }}
          </a>
        </div>
      </div>
    </section>

    <section
      id="about"
      class="section about-section"
      aria-labelledby="about-title">
      <div class="shell about-section__grid">
        <NuxtLink
          :to="localePath('/keola')"
          class="about-section__art"
          :data-tooltip="t('home.about_discover')"
          :aria-label="t('home.about_discover')">
          <Image
            src="/images/fanarts/fanart-32-home.webp"
            :alt="t('home.about_alt')" />
          <span class="about-section__art-label">
            {{ t('home.about_discover') }}
            <Icon name="lucide:arrow-right" aria-hidden="true" />
          </span>
        </NuxtLink>
        <div class="about-section__copy">
          <span class="eyebrow">{{ t('home.about_eyebrow') }}</span>
          <h2 id="about-title" class="section-title">
            {{ t('home.about_title') }}
          </h2>
          <p class="section-lead">{{ t('home.about_text') }}</p>
          <p class="about-section__quote">{{ t('home.about_quote') }}</p>
          <a
            class="button button--dark"
            :href="externalLinks.discord"
            target="_blank"
            rel="noopener noreferrer">
            <Icon
              name="keo-icon:discord-logo"
              mode="svg"
              size="20"
              aria-hidden="true" />
            {{ t('home.discord_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <HomeGallery />

    <HomeMission />

    <HomeCommunity />

    <section class="section partners-section" aria-labelledby="partners-title">
      <div class="shell">
        <span class="eyebrow">{{ t('home.partners_eyebrow') }}</span>
        <h2 id="partners-title" class="section-title">
          {{ t('home.partners_title') }}
        </h2>
        <div class="partners-grid">
          <a
            class="partner"
            :href="externalLinks.safebear"
            :data-tooltip="`${t('home.partner_link')} · ${t('site.safebear')}`"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              src="/images/brands/safebear-brand-logo.webp"
              :alt="t('site.safebear')" />
            <span>
              <strong>{{ t('site.safebear') }}</strong>
              <small>{{ t('home.safebear_text') }}</small>
              <em>
                {{ t('home.partner_link') }}
                <Icon name="lucide:arrow-up-right" aria-hidden="true" />
              </em>
            </span>
          </a>
          <a
            class="partner"
            :href="externalLinks.holy"
            :data-tooltip="`${t('home.partner_link')} · ${t('site.holy')}`"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              src="/images/brands/holy-brand-logo.webp"
              :alt="t('site.holy')" />
            <span>
              <strong>{{ t('site.holy') }}</strong>
              <small>{{ t('home.holy_text') }}</small>
              <em>
                {{ t('home.partner_link') }}
                <Icon name="lucide:arrow-up-right" aria-hidden="true" />
              </em>
            </span>
          </a>
        </div>
      </div>
    </section>

    <section class="closing-section" aria-labelledby="closing-title">
      <div class="shell closing-section__inner">
        <Image
          class="closing-section__peek"
          src="/images/keola/Keola_Peak.webp"
          :alt="t('home.closing_art_alt')" />
        <div>
          <span class="eyebrow eyebrow--light">
            {{ t('home.community_eyebrow') }}
          </span>
          <h2 id="closing-title">{{ t('home.end_title') }}</h2>
          <p>{{ t('home.end_text') }}</p>
        </div>
        <a
          class="button button--light"
          :href="externalLinks.discord"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('home.end_link') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

useHead(usePageSeo('home'))
</script>

<style lang="scss" scoped>
.section-title {
  overflow-wrap: anywhere;
}

.schedule-band {
  background: $white;
  border-bottom: $border-width solid $line;

  &__inner {
    display: flex;
    align-items: center;
    gap: $space-24;
    padding-block: $space-28;
  }
  &__icon {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    flex: none;
    border-radius: $radius-control;
    background: $orange-pale;
    color: $schedule-icon;
    font-size: 25px;
  }
  &__copy {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  h2 {
    margin: 2px 0 3px;
    font-size: 1.6rem;
  }
  p {
    max-width: 630px;
    margin: 0;
    color: $muted;
    font-size: 0.84rem;
    line-height: $line-height-compact;
  }
  &__actions {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    align-items: center;
    gap: $space-19;
    flex: none;

    .text-link {
      gap: $space-8;
    }
  }
}

.about-section {
  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: min(8vw, 114px);
  }
  &__art {
    position: relative;
    display: block;
    height: 550px;
    overflow: hidden;
    border-radius: $radius-art;
    background: $about-art-background;
  }
  &__art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    transition: transform $transition-artwork;
  }
  &__art:hover img,
  &__art:focus-visible img {
    transform: scale($artwork-hover-scale);
  }
  @media (prefers-reduced-motion: reduce) {
    &__art:hover img,
    &__art:focus-visible img {
      transform: none;
    }
  }
  &__art-label {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: $space-8;
    max-width: 100%;
    padding: $space-12 $space-18;
    background: $orange;
    color: $plum-deep;
    font-size: $font-size-caption;
    font-weight: $weight-heavy;
  }
  &__copy .section-lead {
    margin-bottom: $space-30;
  }
  &__quote {
    max-width: 470px;
    margin-bottom: $space-30;
    padding-left: $space-20;
    border-left: 3px solid $orange;
    font-family: $display;
    font-size: 1.35rem;
    line-height: 1.3;
  }
}

.partners-section {
  background: $spirit;
}
.partners-section .section-title {
  margin-bottom: $space-34;
}
.partners-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $space-15;
}
.partner {
  display: flex;
  align-items: center;
  gap: $space-24;
  min-height: 200px;
  padding: $space-25;
  border: $border-width solid $partner-border;
  border-radius: $radius-control;
  background: $white;
  transition: transform $transition-ui;

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-3px);
    }
  }
  img {
    width: 96px;
    max-height: 110px;
    flex: none;
    object-fit: contain;
  }
  > span {
    min-width: 0;
    overflow-wrap: anywhere;
    display: flex;
    flex-direction: column;
    gap: $space-8;
  }
  strong {
    font-family: $display;
    font-size: 1.45rem;
    font-weight: $weight-semibold;
  }
  small {
    color: $muted;
    font-size: $font-size-note;
    line-height: $line-height-body;
  }
  em {
    display: inline-flex;
    align-items: center;
    gap: $space-6;
    font-size: $font-size-action-small;
    font-style: normal;
    font-weight: $weight-heavy;
  }
}

.closing-section {
  --focus-color: #{$white};
  overflow-wrap: anywhere;
  padding-block: $space-55;
  background: $closing-background;
  color: $white-pure;

  &__inner {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr) auto;
    align-items: center;
    gap: $space-24;
  }
  &__peek {
    width: 140px;
  }
  h2 {
    margin: $space-8 0;
    font-size: 2.45rem;
  }
  p {
    margin: 0;
  }
  .eyebrow {
    color: $closing-eyebrow;
  }
}

@media (max-width: $breakpoint-tablet) {
  .closing-section__inner {
    grid-template-columns: 54px minmax(0, 1fr);
    gap: $space-12;
  }
  .closing-section__inner > div {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  .closing-section__peek {
    grid-row: 2;
    width: 54px;
  }
  .closing-section__inner > a {
    grid-column: 2;
    grid-row: 2;
    width: fit-content;
    justify-self: end;
  }
  .schedule-band__inner {
    flex-wrap: wrap;
  }
  .schedule-band__actions {
    margin-left: 82px;
    max-width: calc(100% - 82px);
  }
  .about-section__grid {
    gap: $space-40;
  }
  .about-section__art {
    height: 460px;
  }
}

@media (max-width: $breakpoint-mobile) {
  .schedule-band__inner {
    gap: $space-14;
    padding-block: $space-22;
  }
  .schedule-band__icon {
    width: 44px;
    height: 44px;
    font-size: 21px;
  }
  .schedule-band__copy {
    flex-basis: calc(100% - 58px);
  }
  .schedule-band h2 {
    font-size: 1.3rem;
  }
  .schedule-band__actions {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    flex-wrap: wrap;
  }
  .about-section__grid {
    grid-template-columns: 1fr;
    gap: $space-33;
  }
  .about-section__art {
    height: 350px;
  }
  .about-section__art img {
    object-position: center 22%;
  }
  .partners-grid {
    grid-template-columns: 1fr;
  }
  .closing-section__inner {
    gap: $space-12;
  }
  .closing-section__peek {
    width: 54px;
  }
}

@media (max-width: $breakpoint-small) {
  .closing-section__inner {
    grid-template-columns: minmax(0, 1fr);
  }
  .closing-section__peek {
    grid-column: 1;
    grid-row: 3;
    width: 48px;
  }
  .closing-section__inner > a {
    grid-column: 1;
    grid-row: 2;
    width: fit-content;
    justify-self: start;
  }
  .partner {
    padding: $space-17;
    gap: $space-14;
  }
  .partner img {
    width: 70px;
  }
}
</style>
