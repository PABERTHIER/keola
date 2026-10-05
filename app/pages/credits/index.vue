<template>
  <main id="main-content">
    <PageIntro
      :eyebrow="t('credits.eyebrow')"
      :title="t('credits.title')"
      :intro="t('credits.intro')"
      tone="spirit" />
    <section class="credits-page shell" aria-labelledby="credits-heading">
      <h2 id="credits-heading" class="sr-only">{{ t('site.credits') }}</h2>
      <ul class="credits-list">
        <li v-for="person in credits" :key="person.name">
          <a
            v-if="'url' in person"
            :href="person.url"
            :aria-label="t('credits.visit', { name: person.name })"
            target="_blank"
            rel="noopener noreferrer">
            <span>
              <strong>{{ person.name }}</strong>
              <small>{{ t(`credits.roles.${person.role}`) }}</small>
            </span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
          <span v-else class="credits-list__plain">
            <span>
              <strong>{{ person.name }}</strong>
              <small>{{ t(`credits.roles.${person.role}`) }}</small>
            </span>
          </span>
        </li>
      </ul>
      <div class="credits-page__next">
        <Image
          src="/images/keola/Keola_magnifying_glass.webp"
          :alt="t('credits.magnifying_glass_alt')" />
        <NuxtLink
          class="button button--outline credits-page__link"
          :to="localePath('/gallery')">
          {{ t('site.gallery') }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { credits } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

useHead(usePageSeo('credits'))
</script>

<style lang="scss" scoped>
.credits-page {
  padding-block: $space-70 $space-100;
}
.credits-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 50px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.credits-list li {
  min-width: 0;
  border-top: $border-width solid $line;
}
.credits-list a,
.credits-list__plain {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-16;
  min-height: 95px;
  padding: $space-15 $space-5;
}
.credits-list a:hover {
  color: $link-hover;
}
.credits-list span span,
.credits-list a span {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.credits-list strong {
  font-family: $display;
  font-size: 1.28rem;
  font-weight: $weight-semibold;
  overflow-wrap: anywhere;
}
.credits-list small {
  color: $muted;
  font-size: 0.79rem;
}
.credits-list .iconify {
  flex: none;
  font-size: 21px;
}
.credits-page__next {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: $space-18;
  margin-top: $space-42;
}
.credits-page__next img {
  width: auto;
  height: $button-min-height;
}
@media (max-width: $breakpoint-mobile) {
  .credits-page {
    padding-block: $space-40 $space-70;
  }
  .credits-list {
    grid-template-columns: 1fr;
  }
}
@media (max-width: $breakpoint-small) {
  .credits-page__link {
    order: 0;
  }
  .credits-page__next img {
    order: 1;
  }
}
</style>
