<template>
  <main id="main-content">
    <PageIntro :eyebrow="t('media.eyebrow')" :title="t('media.title')" :intro="t('media.intro')" />
    <div class="media-page shell">
      <div class="media-page__sheet">
        <NuxtImg
          src="/images/mediakit.webp"
          :alt="t('media.preview_alt')"
          width="900"
          sizes="xs:100vw md:60vw"
          loading="lazy" />
        <a
          class="button button--dark"
          href="/images/mediakit.webp"
          download="keola-kumaneko-mediakit.webp">
          <Icon name="lucide:download" aria-hidden="true" />
          {{ t('media.download') }}
        </a>
      </div>
      <div class="media-page__aside">
        <div class="media-page__contact">
          <span class="eyebrow">{{ t('site.contact') }}</span>
          <h2>{{ t('media.contact_title') }}</h2>
          <p>{{ t('media.contact_text') }}</p>
          <a class="button button--primary" :href="externalLinks.email">
            <Icon name="lucide:mail" aria-hidden="true" />
            {{ t('media.email') }}
          </a>
        </div>
        <div class="media-page__links">
          <h2>{{ t('media.links_title') }}</h2>
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer">
            <img :src="`/icons/${link.icon}`" alt="" width="23" height="23" loading="lazy" />
            <span>{{ link.name }}</span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { externalLinks, socialLinks } from '~/data/site'

const { t } = useI18n()

useHead(usePageSeo('media'))
</script>

<style lang="scss" scoped>
.media-page {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 70px;
  padding-block: 70px 110px;
}
.media-page__sheet {
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 23px;
}
.media-page__sheet img {
  width: 100%;
  height: auto;
  border: 1px solid $line;
  border-radius: 6px;
}
.media-page__aside {
  min-width: 0;
}
.media-page__contact {
  padding: 34px;
  border-radius: 6px;
  background: $spirit;
}
.media-page__contact h2 {
  margin: 15px 0;
  font-size: 2.2rem;
}
.media-page__contact p {
  color: $muted;
  line-height: 1.7;
}
.media-page__contact .button {
  margin-top: 8px;
}
.media-page__links {
  margin-top: 45px;
}
.media-page__links h2 {
  margin-bottom: 18px;
  font-size: 1.65rem;
}
.media-page__links a {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 54px;
  padding: 10px 4px;
  border-top: 1px solid $line;
  font-size: 0.9rem;
  font-weight: 700;
}
.media-page__links a:hover {
  color: #a85012;
}
.media-page__links img {
  width: 23px;
  height: 23px;
  object-fit: contain;
}
.media-page__links a span {
  flex: 1;
}
@media (max-width: 720px) {
  .media-page {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-block: 40px 70px;
  }
  .media-page__contact {
    padding: 25px;
  }
}
</style>
