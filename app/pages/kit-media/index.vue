<template>
  <main id="main-content">
    <PageIntro
      :eyebrow="t('media.eyebrow')"
      :title="t('media.title')"
      :intro="t('media.intro')" />
    <div class="media-page shell">
      <div class="media-page__sheet">
        <Image src="/images/mediakit.webp" :alt="t('media.preview_alt')" />
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
            <Icon
              :name="link.icon"
              mode="svg"
              class="social-icon"
              :size="23"
              aria-hidden="true" />
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
  gap: $space-70;
  padding-block: $space-70 $space-110;
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
  border: $border-width solid $line;
  border-radius: $radius-control;
}
.media-page__aside {
  min-width: 0;
}
.media-page__contact {
  padding: $space-34;
  border-radius: $radius-control;
  background: $spirit;
}
.media-page__contact h2 {
  margin: $space-15 0;
  font-size: 2.2rem;
}
.media-page__contact p {
  color: $muted;
  line-height: 1.7;
}
.media-page__contact .button {
  margin-top: $space-8;
}
.media-page__links {
  margin-top: $space-45;
}
.media-page__links h2 {
  margin-bottom: $space-18;
  font-size: 1.65rem;
}
.media-page__links a {
  display: flex;
  align-items: center;
  gap: $space-16;
  min-height: 54px;
  padding: $space-10 $space-4;
  border-top: $border-width solid $line;
  font-size: $font-size-secondary;
  font-weight: $weight-bold;
}
.media-page__links a:hover {
  color: $link-hover;
}
.media-page__links .social-icon {
  flex: 0 0 23px;
  color: $black;
}
.media-page__links a span {
  flex: 1;
}
@media (max-width: $breakpoint-mobile) {
  .media-page {
    grid-template-columns: 1fr;
    gap: $space-48;
    padding-block: $space-40 $space-70;
  }
  .media-page__contact {
    padding: $space-25;
  }
}
</style>
