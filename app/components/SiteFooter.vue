<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="site-footer__main">
        <div class="site-footer__identity">
          <SiteBrand inverse />
          <p>{{ t('site.footer_intro') }}</p>
          <a class="footer-email" :href="externalLinks.email">
            kumaneko.keola@gmail.com
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <div class="site-footer__column">
          <h2>{{ t('site.explore') }}</h2>
          <NuxtLink :to="localePath({ path: '/', hash: '#about' })">{{ t('site.about') }}</NuxtLink>
          <NuxtLink :to="localePath('/galerie')">{{ t('site.gallery') }}</NuxtLink>
          <NuxtLink :to="localePath({ path: '/', hash: '#mission' })">
            {{ t('site.mission') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/archives')">{{ t('site.archives') }}</NuxtLink>
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
          <NuxtLink :to="localePath('/kit-media')">{{ t('site.media') }}</NuxtLink>
          <NuxtLink :to="localePath('/credits')">{{ t('site.credits') }}</NuxtLink>
          <a :href="externalLinks.redPandaNetwork" target="_blank" rel="noopener noreferrer">
            Red Panda Network
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
            <img :src="`/icons/${link.icon}`" alt="" width="19" height="19" loading="lazy" />
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
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  padding-top: 75px;
  background: $plum-deep;
  color: #fff3ec;

  &__main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 45px;
    padding-bottom: 70px;
  }
  &__identity p {
    max-width: 310px;
    margin: 22px 0;
    color: #e1cbd8;
    font-size: 0.88rem;
  }
  &__column {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;

    h2 {
      margin: 7px 0 8px;
      color: #ffad68;
      font-family: $body;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
    }
    a {
      font-size: 0.8rem;
    }
    a:hover {
      color: #ffae60;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 18px 0 24px;
    border-top: 1px solid #745469;
  }
  &__bottom p {
    margin: 0;
    color: #dcc2d1;
    font-size: 0.7rem;
  }
}

.footer-email {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  font-weight: 700;
  overflow-wrap: anywhere;

  &:hover {
    color: #ffae60;
  }
}

.footer-socials {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;

  a {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border: 1px solid #745469;
    border-radius: 5px;
  }
  a:hover {
    background: #67405c;
  }
  img {
    filter: invert(1);
  }
}

@media (max-width: 960px) {
  .site-footer__main {
    grid-template-columns: 1.5fr 1fr 1fr;
  }
  .site-footer__column:last-child {
    grid-column: 2 / 4;
  }
}

@media (max-width: 720px) {
  .site-footer {
    padding-top: 58px;
  }
  .site-footer__main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px 22px;
    padding-bottom: 45px;
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
