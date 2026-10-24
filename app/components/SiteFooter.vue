<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="site-footer__main">
        <div class="site-footer__identity">
          <SiteBrand inverse />
          <div class="site-footer__intro">
            <p>{{ t('components.site_footer.footer_intro') }}</p>
            <p>{{ t('components.site_footer.footer_welcome') }}</p>
          </div>
        </div>
        <nav class="site-footer__section" :aria-label="t('site.explore')">
          <h2>{{ t('site.explore') }}</h2>
          <div class="site-footer__links site-footer__links--explore">
            <NuxtLink :to="localePath('/keola')">
              {{ t('site.about') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/gallery')">
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
            <NuxtLink :to="localePath('/credits')">
              {{ t('site.credits') }}
            </NuxtLink>
          </div>
        </nav>
        <div class="site-footer__section site-footer__contact">
          <h2>{{ t('site.contact') }}</h2>
          <a class="footer-email" :href="externalLinks.email">
            <span class="footer-email__address">
              {{ externalLinks.email.slice('mailto:'.length) }}
            </span>
            <Icon
              class="footer-email__icon"
              name="lucide:arrow-up-right"
              aria-hidden="true" />
          </a>
          <NuxtLink :to="localePath('/media-kit')">
            {{ t('site.media') }}
          </NuxtLink>
        </div>
      </div>
      <div class="site-footer__extras">
        <div class="site-footer__socials">
          <h2 id="footer-socials-title">
            {{ t('components.site_footer.elsewhere') }}
          </h2>
          <nav class="footer-socials" aria-labelledby="footer-socials-title">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              :aria-label="`${link.name} · ${t(`social.${link.detail}`)}`"
              :data-tooltip="`${link.name} · ${t(`social.${link.detail}`)}`"
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
          </nav>
        </div>
        <div class="site-footer__causes">
          <h2>{{ t('components.site_footer.causes') }}</h2>
          <div class="site-footer__cause-links">
            <a
              :href="externalLinks.redPandaNetwork"
              target="_blank"
              rel="noopener noreferrer">
              {{ t('site.red_panda_network') }}
              <Icon name="lucide:arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© {{ year }} {{ t('components.site_footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { externalLinks, socialLinks } from '~/data/site'

const { t } = useI18n()

const localePath = useLocalePath()
const route = useRoute()

const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  --focus-color: #{$orange};
  padding-top: $space-20;
  background: $plum-deep;
  color: $footer-text;

  h2 {
    margin: 0 0 $space-10;
    color: $footer-heading-text;
    font-family: $body;
    font-size: $font-size-label;
    font-weight: $weight-heavy;
    line-height: $line-height-compact;
    text-transform: uppercase;
  }

  &__main {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.8fr) minmax(0, 1fr);
    gap: $space-20;
    padding-top: $space-20;
    padding-bottom: $space-10;
  }

  &__identity {
    min-width: 0;
  }

  &__intro {
    p {
      max-width: 32ch;
      margin: $space-12 0 0;
      color: $footer-description-text;
      font-size: $font-size-note;
      line-height: $line-height-compact;

      + p {
        margin-top: $space-5;
      }
    }
  }

  &__section {
    min-width: 0;
  }

  &__links {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: start;
    column-gap: $space-20;
  }

  &__links a,
  &__contact a,
  &__cause-links a {
    display: inline-flex;
    align-items: center;
    min-width: $control-size;
    min-height: 35px;
    max-width: 100%;
    font-size: $font-size-note;
    line-height: 1.35;
    overflow-wrap: anywhere;

    &:hover {
      color: $footer-link-hover;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .footer-email {
      gap: $space-5;
      font-weight: $weight-bold;

      &__address {
        min-width: 0;
        overflow-wrap: anywhere;
      }

      &__icon {
        flex: none;
      }
    }
  }

  &__extras {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: $space-20;
    padding: $space-20 0;
    border-top: $border-width solid $footer-border;
  }

  &__socials,
  &__causes {
    min-width: 0;
  }

  &__cause-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 $space-20;

    a {
      gap: $space-5;
      font-weight: $weight-bold;
    }
  }

  &__bottom {
    padding: $space-20 0;
    border-top: $border-width solid $footer-border;

    p {
      margin: 0;
      color: $footer-copyright-text;
      font-size: $font-size-caption;
      line-height: $line-height-compact;
    }
  }
}

.footer-socials {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: $space-8;

  a {
    width: $control-size;
    height: $control-size;
    display: grid;
    place-items: center;
    border: $border-width solid $footer-border;
    border-radius: $radius-social;
    transition: background-color $transition-ui;

    &:hover {
      background-color: $footer-social-hover;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .site-footer {
    &__main {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    }

    &__identity {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: max-content minmax(0, 1fr);
      align-items: center;
      gap: $space-20;
      width: min(100%, 560px);
      text-align: left;
    }

    &__intro p {
      margin-top: 0;
      text-wrap: balance;

      + p {
        margin-top: $space-5;
      }
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .site-footer {
    &__main {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding-bottom: $space-7;
    }

    &__extras {
      grid-template-columns: 1fr;
      padding-bottom: 0px;
    }

    &__socials,
    &__causes,
    &__bottom {
      text-align: center;
    }

    &__causes {
      padding-top: $space-20;
      border-top: $border-width solid $footer-border;
    }

    &__bottom {
      padding-top: $space-12;
    }

    &__cause-links {
      margin-left: $space-10;
      padding-bottom: $space-5;
      justify-content: center;
    }
  }

  .footer-socials {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-socials {
    display: grid;
    grid-template-columns: repeat(4, $control-size);
    justify-content: center;
    gap: $space-8 $space-10;
  }

  .site-footer {
    &__main {
      grid-template-columns: minmax(0, 1fr);
      width: min(100%, 350px);
      margin-inline: auto;
    }

    &__links {
      justify-content: start;
    }

    &__links--explore {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: min(100%, 200px);
    }

    &__bottom {
      padding-bottom: max(#{$space-20}, env(safe-area-inset-bottom));
    }
  }
}

@media (max-width: $breakpoint-small) {
  .site-footer {
    &__main {
      gap: $space-8;
    }

    &__main h2,
    &__causes h2 {
      margin-bottom: 0;
    }

    &__cause-links a {
      align-items: flex-start;
      padding-top: $space-4;
    }
  }
}

@media (max-width: $breakpoint-compact) {
  .site-footer {
    &__main {
      text-align: center;
    }

    &__identity {
      display: block;
      text-align: center;
    }

    &__intro {
      margin-top: $space-12;

      p {
        margin-inline: auto;
      }
    }

    &__links--explore {
      justify-items: center;
      width: min(100%, 172px);
      column-gap: $space-8;
      margin-inline: auto;
    }

    &__contact {
      align-items: center;
      text-align: center;
    }
  }
}
</style>
