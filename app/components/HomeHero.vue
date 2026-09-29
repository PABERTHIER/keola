<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="shell hero__inner">
      <div class="hero__content">
        <span class="eyebrow eyebrow--light">
          <span class="eyebrow__mark" aria-hidden="true" />
          {{ t('home.hero_eyebrow') }}
        </span>
        <h1 id="hero-title">
          {{ t('home.hero_name') }}
          <span>{{ t('home.hero_surname') }}</span>
        </h1>
        <p class="hero__lead">{{ t('home.hero_text') }}</p>
        <div class="hero__actions">
          <a
            class="button button--primary"
            :href="externalLinks.twitch"
            target="_blank"
            rel="noopener noreferrer">
            <Icon name="lucide:radio" aria-hidden="true" />
            {{ t('site.watch') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
          <NuxtLink
            class="button button--light-outline"
            :to="localePath({ path: '/', hash: '#about' })">
            {{ t('home.hero_discover') }}
            <Icon name="lucide:arrow-down-right" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
      <div class="hero__visual">
        <Image
          src="/images/slideshow-1.webp"
          :alt="t('home.hero_alt')"
          loading="eager"
          fetchpriority="high" />
        <span class="hero__caption">{{ t('home.hero_caption') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.hero {
  overflow: hidden;
  background: $plum;
  color: white;

  &__inner {
    min-height: 560px;
    height: min(72svh, 650px);
    display: grid;
    grid-template-columns: 55% 45%;
  }
  &__content {
    align-self: center;
    position: relative;
    z-index: 2;
    padding: 38px 32px 42px 0;
  }
  h1 {
    margin: 27px 0 22px;
    font-family: $signature;
    font-size: 6rem;
    font-weight: 400;
    line-height: 1.08;
  }
  h1 span {
    display: block;
    color: #ffad53;
  }
  &__lead {
    max-width: 500px;
    margin-bottom: 31px;
    color: #f4e3ee;
    font-size: 1.13rem;
    line-height: 1.75;
  }
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 11px;
  }
  &__visual {
    position: relative;
    min-height: 100%;
    margin-right: calc((min(100vw - 72px, 1240px) - 100vw) / 2);
    overflow: hidden;
  }
  &__visual img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 16%;
  }
  &__caption {
    position: absolute;
    right: 32px;
    bottom: 24px;
    max-width: 230px;
    padding: 8px 12px;
    background: $plum-deep;
    color: #f9eee1;
    font-size: 0.72rem;
    font-weight: 700;
  }
}

@media (max-width: 1100px) {
  .hero h1 {
    font-size: 4.9rem;
  }
}

@media (max-width: 960px) {
  .hero__visual {
    margin-right: -24px;
  }
  .hero h1 {
    font-size: 4.3rem;
  }
  .hero__inner {
    min-height: 520px;
  }
}

@media (max-width: 720px) {
  .hero__inner {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 0;
  }
  .hero__content {
    align-self: stretch;
    padding: 43px 0 29px;
  }
  .hero h1 {
    margin: 17px 0 15px;
    font-size: 3.65rem;
  }
  .hero__lead {
    max-width: 550px;
    margin-bottom: 22px;
    font-size: 0.94rem;
    line-height: 1.55;
  }
  .hero__actions {
    gap: 8px;
  }
  .hero__actions .button {
    min-height: 43px;
    padding: 9px 12px;
    font-size: 0.76rem;
  }
  .hero__visual {
    height: 240px;
    min-height: 240px;
    margin-left: -18px;
    margin-right: -18px;
  }
  .hero__visual img {
    object-position: center 19%;
  }
  .hero__caption {
    right: 15px;
    bottom: 13px;
    font-size: 0.62rem;
  }
}

@media (max-width: 420px) {
  .hero h1 {
    font-size: 3rem;
  }
  .hero__actions .button {
    max-width: 100%;
  }
  .hero__visual {
    height: 190px;
    min-height: 190px;
  }
}

@media (max-width: 360px) and (max-height: 640px) {
  .hero__content {
    padding: 24px 0 12px;
  }
  .hero h1 {
    margin: 9px 0 8px;
    font-size: 2.85rem;
  }
  .hero__lead {
    margin-bottom: 13px;
    line-height: 1.45;
  }
  .hero__actions .button--light-outline {
    display: none;
  }
  .hero__visual {
    height: 128px;
    min-height: 128px;
  }
  .hero__caption {
    display: none;
  }
}
</style>
