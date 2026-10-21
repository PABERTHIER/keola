<template>
  <section
    id="mission"
    class="section mission-section"
    aria-labelledby="mission-title">
    <div class="shell mission-section__grid">
      <div>
        <span class="eyebrow eyebrow--light">
          {{ t('components.home_mission.eyebrow') }}
        </span>
        <h2 id="mission-title" class="section-title">
          {{ t('components.home_mission.title') }}
        </h2>
        <div class="section-lead">
          <p>{{ t('components.home_mission.text_1') }}</p>
          <p>{{ t('components.home_mission.text_2') }}</p>
          <p>{{ t('components.home_mission.text_3') }}</p>
        </div>
        <a
          class="button button--primary"
          :href="externalLinks.redPandaNetwork"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('components.home_mission.link') }}
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

    img {
      position: relative;
      z-index: $z-artwork;
      max-height: 210px;
      width: 60%;
      object-fit: contain;
    }

    > span:last-child {
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
}

@media (max-width: $breakpoint-mobile) {
  .mission-section {
    &__grid {
      grid-template-columns: minmax(0, 1fr);
      gap: $space-33;
    }

    .eyebrow {
      display: flex;
      justify-content: center;
    }

    .section-title {
      margin-inline: auto;
      text-align: center;
    }

    .button {
      display: flex;
      width: fit-content;
      margin-inline: auto;
    }

    &__art {
      min-height: 265px;
    }
  }
}
</style>
