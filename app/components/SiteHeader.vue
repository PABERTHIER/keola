<template>
  <header class="site-header" @keydown.esc="menuOpen = false">
    <div class="shell site-header__inner">
      <SiteBrand />

      <nav
        id="primary-nav"
        class="site-nav"
        :class="{ 'is-open': menuOpen }"
        :aria-label="t('site.explore')">
        <NuxtLink :to="localePath({ path: '/', hash: '#about' })" @click="menuOpen = false">
          {{ t('site.about') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/galerie')" @click="menuOpen = false">
          {{ t('site.gallery') }}
        </NuxtLink>
        <NuxtLink :to="localePath({ path: '/', hash: '#mission' })" @click="menuOpen = false">
          {{ t('site.mission') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/archives')" @click="menuOpen = false">
          {{ t('site.archives') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/credits')" @click="menuOpen = false">
          {{ t('site.credits') }}
        </NuxtLink>
      </nav>

      <div class="site-header__actions">
        <label class="language-control">
          <span class="sr-only">{{ t('site.language') }}</span>
          <Icon name="lucide:languages" aria-hidden="true" />
          <select :value="locale" :aria-label="t('site.language')" @change="changeLocale">
            <option v-for="item in locales" :key="item.code" :value="item.code">
              {{ item.code === 'ja' ? 'JP' : item.code.toUpperCase() }}
            </option>
          </select>
        </label>
        <a
          class="button button--primary site-header__live"
          :href="externalLinks.twitch"
          :aria-label="t('site.watch')"
          :title="t('site.watch')"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="lucide:radio" aria-hidden="true" />
          <span>{{ t('site.watch') }}</span>
        </a>
        <button
          class="menu-toggle icon-button"
          type="button"
          :aria-label="menuOpen ? t('site.close_menu') : t('site.menu')"
          :aria-expanded="menuOpen"
          aria-controls="primary-nav"
          @click="menuOpen = !menuOpen">
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const menuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  }
)

function changeLocale(event: Event) {
  const selectedLocale = locales.value.find(
    item => item.code === (event.target as HTMLSelectElement).value
  )
  menuOpen.value = false
  if (selectedLocale) void navigateTo(switchLocalePath(selectedLocale.code))
}
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 74px;
  background: $white;
  border-bottom: 1px solid #e6e4dc;

  &__inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__live {
    min-height: 42px;
    padding: 9px 13px;
    font-size: 0.78rem;
    white-space: nowrap;
  }
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-left: auto;

  a {
    font-size: 0.81rem;
    font-weight: 700;
    white-space: nowrap;
    transition: color 0.2s ease;
  }
  a:hover,
  a.router-link-exact-active {
    color: #a54a00;
  }
}

.language-control {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding-left: 5px;
  color: $ink;

  .icon {
    font-size: 17px;
  }
  select {
    height: 40px;
    width: 48px;
    background: transparent;
    border: 0;
    color: inherit;
    font-size: 0.75rem;
    font-weight: 800;
    cursor: pointer;
  }
}

.menu-toggle {
  display: none;
}

@media (max-width: 1100px) {
  .site-nav {
    gap: 15px;
  }
}

@media (max-width: 960px) {
  .site-header {
    height: 68px;
  }
  .site-nav {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: 14px 24px 22px;
    border-bottom: 1px solid $line;
    background: $white;
    box-shadow: 0 16px 22px #102d2a18;

    &.is-open {
      display: flex;
    }
    a {
      padding: 13px 7px;
      border-bottom: 1px solid $line;
      font-size: 0.95rem;
    }
  }
  .menu-toggle {
    display: inline-grid;
  }
}

@media (max-width: 720px) {
  .site-header__live {
    width: 44px;
    padding: 0;
  }
  .site-header__live span {
    display: none;
  }
}

@media (max-width: 420px) {
  .brand {
    font-size: 1.1rem;
  }
  .brand__symbol {
    font-size: 1.85rem;
  }
  .brand__text span {
    font-size: 0.77rem;
  }
  .site-header__actions {
    gap: 4px;
  }
  .language-control .icon {
    display: none;
  }
  .language-control select {
    width: 43px;
  }
}
</style>
