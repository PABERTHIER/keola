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
      <NuxtLink class="button button--outline credits-page__link" :to="localePath('/galerie')">
        {{ t('site.gallery') }}
        <Icon name="lucide:arrow-up-right" aria-hidden="true" />
      </NuxtLink>
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
  padding-block: 70px 100px;
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
  border-top: 1px solid $line;
}
.credits-list a,
.credits-list__plain {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 95px;
  padding: 15px 5px;
}
.credits-list a:hover {
  color: #a85012;
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
  font-weight: 600;
  overflow-wrap: anywhere;
}
.credits-list small {
  color: $muted;
  font-size: 0.79rem;
}
.credits-list .icon {
  flex: none;
  font-size: 21px;
}
.credits-page__link {
  margin-top: 42px;
}
@media (max-width: 720px) {
  .credits-page {
    padding-block: 40px 70px;
  }
  .credits-list {
    grid-template-columns: 1fr;
  }
}
</style>
