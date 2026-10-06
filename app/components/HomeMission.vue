<template>
  <section
    id="mission"
    class="section mission-section"
    aria-labelledby="mission-title">
    <div class="shell mission-section__grid">
      <div>
        <span class="eyebrow eyebrow--light">
          {{ t('home.mission_eyebrow') }}
        </span>
        <h2 id="mission-title" class="section-title">
          {{ t('home.mission_title') }}
        </h2>
        <p class="section-lead">{{ t('home.mission_text') }}</p>
        <a
          class="button button--primary"
          :href="externalLinks.redPandaNetwork"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('home.mission_link') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </a>
      </div>
      <div class="mission-section__art">
        <Image
          src="/images/redpanda/RedPandaNetwork_logo.webp"
          :alt="t('site.red_panda_network')" />
        <span>
          {{ t('site.red_panda_network') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.mission-section {
  --focus-color: #{$orange};
  overflow: hidden;
  background: $mission-background;
  color: $white-pure;

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    overflow-wrap: anywhere;
    align-items: center;
    gap: $space-70;
  }
  .section-title {
    max-width: 660px;
  }
  .section-lead {
    color: $mission-text;
    margin-bottom: $space-30;
  }
  &__art {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 365px;
    border: $border-width solid $mission-art-border;
    border-radius: $radius-art;
    background: $mission-art-background;
  }
  &__art img {
    position: relative;
    z-index: $z-artwork;
    max-height: 210px;
    width: 60%;
    object-fit: contain;
  }
  &__art > span:last-child {
    position: absolute;
    bottom: $space-20;
    left: $space-24;
    right: $space-24;
    display: flex;
    gap: $space-8;
    align-items: center;
    font-size: $font-size-small;
    font-weight: $weight-bold;
  }
}

@media (max-width: $breakpoint-mobile) {
  .mission-section__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: $space-33;
  }
  .mission-section__art {
    min-height: 265px;
  }
}
</style>
