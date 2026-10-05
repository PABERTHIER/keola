<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="site-footer__main">
        <div class="site-footer__identity">
          <SiteBrand inverse />
          <p>{{ t('site.footer_intro') }}</p>
          <a class="footer-email" :href="externalLinks.email">
            {{ externalLinks.email.slice('mailto:'.length) }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <div class="site-footer__column">
          <h2>{{ t('site.explore') }}</h2>
          <NuxtLink :to="localePath('/keola')">
            {{ t('site.about') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/galerie')">
            {{ t('site.gallery') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath({ path: '/', hash: '#mission' })"
            :aria-current-value="
              route.hash === '#mission' ? 'location' : 'false'
            ">
            {{ t('site.mission') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/archives')">
            {{ t('site.archives') }}
          </NuxtLink>
        </div>
        <div class="site-footer__column">
          <h2>{{ t('site.elsewhere') }}</h2>
          <a
            v-for="link in featuredSocialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer">
            {{ link.name }}
          </a>
        </div>
        <div class="site-footer__column">
          <h2>{{ t('site.contact') }}</h2>
          <NuxtLink :to="localePath('/kit-media')">
            {{ t('site.media') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/credits')">
            {{ t('site.credits') }}
          </NuxtLink>
          <a
            :href="externalLinks.redPandaNetwork"
            target="_blank"
            rel="noopener noreferrer">
            {{ t('site.red_panda_network') }}
          </a>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© {{ year }} {{ t('site.copyright') }}</p>
        <div class="footer-socials" :aria-label="t('site.elsewhere')">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            :aria-label="`${link.name} · ${t(`social.${link.detail}`)}`"
            :title="link.name"
            target="_blank"
            rel="noopener noreferrer">
            <Icon
              :name="link.icon"
              mode="svg"
              class="social-icon"
              :style="{ color: link.color }"
              :size="19"
              aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { externalLinks, featuredSocialLinks, socialLinks } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  --focus-color: #{$orange};
  padding-top: $space-75;
  background: $plum-deep;
  color: $footer-text;

  &__main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: $space-45;
    padding-bottom: $space-70;
  }
  &__identity p {
    max-width: 310px;
    margin: $space-22 0;
    color: $footer-description-text;
    font-size: 0.88rem;
  }
  &__identity {
    min-width: 0;
  }
  &__column {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: $space-12;
    min-width: 0;
    overflow-wrap: anywhere;

    h2 {
      max-width: 100%;
      margin: $space-7 0 $space-8;
      color: $footer-heading-text;
      font-family: $body;
      font-size: $font-size-label;
      font-weight: $weight-heavy;
      text-transform: uppercase;
    }
    a {
      display: inline-flex;
      align-items: center;
      min-width: $control-size;
      min-height: $control-size;
      max-width: 100%;
      font-size: 0.8rem;
    }
    a:hover {
      color: $footer-link-hover;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $space-20;
    padding: $space-18 0 $space-24;
    border-top: $border-width solid $footer-border;
  }
  &__bottom p {
    margin: 0;
    color: $footer-copyright-text;
    font-size: 0.7rem;
  }
}

.footer-email {
  display: inline-flex;
  min-height: $control-size;
  max-width: 100%;
  align-items: center;
  gap: $space-5;
  font-size: $font-size-note;
  font-weight: $weight-bold;
  overflow-wrap: anywhere;

  &:hover {
    color: $footer-link-hover;
  }
}

.footer-socials {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: $space-6;

  a {
    width: $control-size;
    height: $control-size;
    display: grid;
    place-items: center;
    border: $border-width solid $footer-border;
    border-radius: $radius-social;
  }
  a:hover {
    background: $footer-social-hover;
  }
}

@media (max-width: $breakpoint-tablet) {
  .site-footer__main {
    grid-template-columns: 1.5fr 1fr 1fr;
  }
  .site-footer__column:last-child {
    grid-column: 2 / 4;
  }
}

@media (max-width: $breakpoint-mobile) {
  .site-footer {
    padding-top: 58px;
  }
  .site-footer__main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-36 $space-22;
    padding-bottom: $space-45;
  }
  .site-footer__identity {
    grid-column: 1 / -1;
  }
  .site-footer__column:last-child {
    grid-column: auto;
  }
  .site-footer__bottom {
    align-items: start;
    flex-direction: column-reverse;
  }
}
</style>
