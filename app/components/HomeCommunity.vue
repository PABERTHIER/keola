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
          <Icon
            :name="link.icon"
            mode="svg"
            class="social-icon"
            :size="26"
            aria-hidden="true" />
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
  gap: $space-110;
}
.community-links {
  border-top: $border-width solid $line;

  a {
    display: flex;
    align-items: center;
    gap: $space-19;
    min-height: 82px;
    padding: $space-12 $space-7;
    border-bottom: $border-width solid $line;
    transition:
      padding $transition-ui,
      background-color $transition-ui;
  }
  a:hover {
    padding-left: $space-16;
    background: $community-background;
  }
  .social-icon {
    flex: 0 0 26px;
    color: $black;
  }
  span {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  strong {
    font-family: $display;
    font-size: 1.25rem;
    font-weight: $weight-semibold;
    line-height: 1.2;
  }
  small {
    color: $muted;
    font-size: $font-size-small;
  }
  .icon {
    font-size: 20px;
  }
}

@media (max-width: $breakpoint-desktop) {
  .community-section__grid {
    gap: $space-60;
  }
}

@media (max-width: $breakpoint-tablet) {
  .community-section__grid {
    gap: $space-40;
  }
}

@media (max-width: $breakpoint-mobile) {
  .community-section__grid {
    grid-template-columns: 1fr;
    gap: $space-33;
  }
}
</style>
