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
            {{ t('home.schedule_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
          <a
            class="text-link"
            :href="externalLinks.twitch"
            target="_blank"
            rel="noopener noreferrer">
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
        <div class="about-section__art">
          <NuxtImg
            src="/images/slideshow-6.webp"
            :alt="t('home.about_alt')"
            width="1942"
            sizes="xs:100vw sm:80vw md:50vw lg:42vw"
            loading="lazy" />
          <span class="about-section__art-label">Keola Kumaneko / VTuber</span>
        </div>
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
            <Icon name="lucide:users-round" aria-hidden="true" />
            {{ t('home.about_link') }}
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
            target="_blank"
            rel="noopener noreferrer">
            <NuxtImg
              src="/images/safebear-brand-logo.webp"
              alt="Safebear"
              width="120"
              loading="lazy" />
            <span>
              <strong>Safebear</strong>
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
            target="_blank"
            rel="noopener noreferrer">
            <NuxtImg
              src="/images/holy-brand-logo.webp"
              alt="HOLY"
              width="120"
              loading="lazy" />
            <span>
              <strong>HOLY</strong>
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

useHead(usePageSeo('home'))
</script>

<style lang="scss" scoped>
.schedule-band {
  background: $white;
  border-bottom: 1px solid $line;

  &__inner {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-block: 28px;
  }
  &__icon {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    flex: none;
    border-radius: 6px;
    background: $orange-pale;
    color: #a95000;
    font-size: 25px;
  }
  &__copy {
    flex: 1;
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
    line-height: 1.55;
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 19px;
    flex: none;
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
    height: 550px;
    overflow: hidden;
    border-radius: 7px;
    background: #ddd4c6;
  }
  &__art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }
  &__art-label {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 12px 18px;
    background: $orange;
    color: $plum-deep;
    font-size: 0.72rem;
    font-weight: 800;
  }
  &__copy .section-lead {
    margin-bottom: 30px;
  }
  &__quote {
    max-width: 470px;
    margin-bottom: 30px;
    padding-left: 20px;
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
  margin-bottom: 34px;
}
.partners-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}
.partner {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 200px;
  padding: 25px;
  border: 1px solid #d8c7d9;
  border-radius: 6px;
  background: $white;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
  img {
    width: 96px;
    max-height: 110px;
    flex: none;
    object-fit: contain;
  }
  span {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  strong {
    font-family: $display;
    font-size: 1.45rem;
    font-weight: 600;
  }
  small {
    color: $muted;
    font-size: 0.82rem;
    line-height: 1.6;
  }
  em {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-style: normal;
    font-weight: 800;
  }
}

.closing-section {
  padding-block: 55px;
  background: #c65434;
  color: white;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  h2 {
    margin: 8px 0;
    font-size: 2.45rem;
  }
  p {
    margin: 0;
  }
  .eyebrow {
    color: #fff0c9;
  }
}

@media (max-width: 960px) {
  .schedule-band__inner {
    flex-wrap: wrap;
  }
  .schedule-band__actions {
    margin-left: 82px;
  }
  .about-section__grid {
    gap: 40px;
  }
  .about-section__art {
    height: 460px;
  }
}

@media (max-width: 720px) {
  .schedule-band__inner {
    gap: 14px;
    padding-block: 22px;
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
    margin-left: 0;
    flex-wrap: wrap;
  }
  .about-section__grid {
    grid-template-columns: 1fr;
    gap: 33px;
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
    flex-direction: column;
    align-items: start;
  }
}

@media (max-width: 420px) {
  .partner {
    padding: 17px;
    gap: 14px;
  }
  .partner img {
    width: 70px;
  }
}
</style>
