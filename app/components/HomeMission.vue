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
        <span class="mission-section__orbit" aria-hidden="true">✳</span>
        <NuxtImg
          src="/images/red-panda-network-logo.webp"
          alt="Red Panda Network"
          width="550"
          sizes="xs:65vw md:35vw"
          loading="lazy" />
        <span>
          Red Panda Network
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
  overflow: hidden;
  background: #643c52;
  color: white;

  &__grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    gap: 70px;
  }
  .section-title {
    max-width: 660px;
  }
  .section-lead {
    color: #f4e2e9;
    margin-bottom: 30px;
  }
  &__art {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 365px;
    border: 1px solid #ad829d;
    border-radius: 7px;
    background: #794b69;
  }
  &__art img {
    position: relative;
    z-index: 1;
    max-height: 210px;
    max-width: 60%;
    width: auto;
    object-fit: contain;
  }
  &__art > span:last-child {
    position: absolute;
    bottom: 20px;
    left: 24px;
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 0.77rem;
    font-weight: 700;
  }
  &__orbit {
    position: absolute;
    right: 24px;
    top: 2px;
    color: #dcb8d1;
    font-size: 6rem;
    line-height: 1;
  }
}

@media (max-width: 720px) {
  .mission-section__grid {
    grid-template-columns: 1fr;
    gap: 33px;
  }
  .mission-section__art {
    min-height: 265px;
  }
}
</style>
