<template>
  <section
    id="community"
    class="section community-section"
    aria-labelledby="community-title">
    <div class="shell community-section__grid">
      <div>
        <span class="eyebrow">{{ t('home.community_eyebrow') }}</span>
        <h2 id="community-title" class="section-title">
          {{ t('home.community_title') }}
        </h2>
        <p class="section-lead">{{ t('home.community_text') }}</p>
      </div>
      <div class="community-links">
        <a
          v-for="link in featuredSocialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer">
          <img
            :src="`/icons/${link.icon}`"
            alt=""
            width="26"
            height="26"
            loading="lazy" />
          <span>
            <strong>{{ link.name }}</strong>
            <small>{{ t(`social.${link.detail}`) }}</small>
          </span>
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { featuredSocialLinks } from '~/data/site'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.community-section__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 110px;
}
.community-links {
  border-top: 1px solid $line;

  a {
    display: flex;
    align-items: center;
    gap: 19px;
    min-height: 82px;
    padding: 12px 7px;
    border-bottom: 1px solid $line;
    transition:
      padding 0.2s ease,
      background-color 0.2s ease;
  }
  a:hover {
    padding-left: 16px;
    background: #f8e9ee;
  }
  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
  span {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  strong {
    font-family: $display;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.2;
  }
  small {
    color: $muted;
    font-size: 0.77rem;
  }
  .icon {
    font-size: 20px;
  }
}

@media (max-width: 1100px) {
  .community-section__grid {
    gap: 60px;
  }
}

@media (max-width: 960px) {
  .community-section__grid {
    gap: 40px;
  }
}

@media (max-width: 720px) {
  .community-section__grid {
    grid-template-columns: 1fr;
    gap: 33px;
  }
}
</style>
