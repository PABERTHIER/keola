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
  color: $white-pure;

  &__inner {
    min-height: clamp(560px, 72svh, 650px);
    display: grid;
    grid-template-columns: 55% 45%;
  }
  &__content {
    min-width: 0;
    align-self: center;
    position: relative;
    z-index: $z-content;
    padding: $space-38 $space-32 $space-42 0;
  }
  h1 {
    margin: 27px 0 $space-22;
    font-family: $signature;
    font-size: 6rem;
    font-weight: $weight-regular;
    line-height: 1.08;
    overflow-wrap: anywhere;
  }
  h1 span {
    display: block;
    color: $hero-accent;
  }
  &__lead {
    max-width: 500px;
    margin-bottom: 31px;
    color: $hero-text;
    font-size: 1.13rem;
    line-height: $line-height-copy;
  }
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-11;
  }
  &__visual {
    position: relative;
    min-height: 100%;
    margin-right: calc(
      (min(100vw - $shell-gutter * 2, $shell-max-width) - 100vw) / 2
    );
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
    right: $space-32;
    bottom: $space-24;
    max-width: 230px;
    padding: $space-8 $space-12;
    background: $plum-deep;
    color: $hero-note-text;
    font-size: $font-size-caption;
    font-weight: $weight-bold;
  }
}

@media (max-width: $breakpoint-desktop) {
  .hero h1 {
    font-size: 4.9rem;
  }
}

@media (max-width: $breakpoint-tablet) {
  .hero__visual {
    margin-right: -$shell-gutter-tablet;
  }
  .hero h1 {
    font-size: 4.3rem;
  }
  .hero__inner {
    min-height: clamp(520px, 72svh, 650px);
  }
}

@media (max-width: $breakpoint-mobile) {
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
    margin: $space-17 0 $space-15;
    font-size: 3.65rem;
  }
  .hero__lead {
    max-width: 550px;
    margin-bottom: $space-22;
    font-size: $font-size-intro-mobile;
    line-height: $line-height-compact;
  }
  .hero__actions {
    gap: $space-8;
  }
  .hero__actions .button {
    min-height: 43px;
    padding: $space-9 $space-12;
    font-size: $font-size-action-small;
  }
  .hero__visual {
    height: $hero-art-height-mobile;
    min-height: $hero-art-height-mobile;
    margin-left: -$shell-gutter-mobile;
    margin-right: -$shell-gutter-mobile;
  }
  .hero__visual img {
    object-position: center 19%;
  }
  .hero__caption {
    right: $space-15;
    bottom: $space-13;
    font-size: 0.62rem;
  }
}

@media (max-width: $breakpoint-small) {
  .hero h1 {
    font-size: 3rem;
  }
  .hero__actions .button {
    max-width: 100%;
  }
  .hero__visual {
    height: $hero-art-height-small;
    min-height: $hero-art-height-small;
  }
}

@media (max-width: $breakpoint-compact) and (max-height: $breakpoint-short-height) {
  .hero__content {
    padding: $space-24 0 $space-12;
  }
  .hero h1 {
    margin: $space-9 0 $space-8;
    font-size: 2.85rem;
  }
  .hero__lead {
    margin-bottom: $space-13;
    line-height: 1.45;
  }
  .hero__actions .button--light-outline {
    display: none;
  }
  .hero__visual {
    height: $hero-art-height-compact;
    min-height: $hero-art-height-compact;
  }
  .hero__caption {
    display: none;
  }
}
</style>
