<template>
  <header
    ref="header"
    class="site-header"
    :style="{ '--measured-header-height': `${headerHeight}px` }"
    @keydown.esc="closeMenu">
    <div class="shell site-header__inner">
      <SiteBrand />

      <nav
        id="primary-nav"
        class="site-nav"
        :class="{ 'is-open': menuOpen }"
        :aria-label="t('site.explore')">
        <NuxtLink :to="localePath('/keola')" @click="menuOpen = false">
          {{ t('site.about') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/galerie')" @click="menuOpen = false">
          {{ t('site.gallery') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath({ path: '/', hash: '#mission' })"
          @click="menuOpen = false">
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
          <select
            :value="locale"
            :aria-label="t('site.language')"
            @change="changeLocale">
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
          <Icon
            class="site-header__live-icon"
            name="keo-icon:twitch-logo"
            mode="svg"
            size="20"
            aria-hidden="true" />
          <span class="site-header__live-label">{{ t('site.watch') }}</span>
        </a>
        <button
          ref="menuToggle"
          class="menu-toggle icon-button"
          type="button"
          :aria-label="menuOpen ? t('site.close_menu') : t('site.menu')"
          :title="menuOpen ? t('site.close_menu') : t('site.menu')"
          :aria-expanded="menuOpen"
          aria-controls="primary-nav"
          @click="menuOpen = !menuOpen">
          <Icon
            :name="menuOpen ? 'lucide:x' : 'lucide:menu'"
            aria-hidden="true" />
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
const menuToggle = ref<HTMLButtonElement | null>(null)
const header = ref<HTMLElement | null>(null)
const headerHeight = ref(0)
let headerObserver: ResizeObserver | undefined

onMounted(() => {
  document.addEventListener('pointerdown', handleOutsidePointer)
  if (!header.value) return
  headerHeight.value = header.value.offsetHeight
  headerObserver = new ResizeObserver(() => {
    headerHeight.value = header.value?.offsetHeight ?? 0
  })
  headerObserver.observe(header.value)
})

onBeforeUnmount(() => {
  headerObserver?.disconnect()
  document.removeEventListener('pointerdown', handleOutsidePointer)
})

function handleOutsidePointer(event: PointerEvent) {
  if (
    menuOpen.value &&
    event.target instanceof Node &&
    !header.value?.contains(event.target)
  ) {
    closeMenu()
  }
}

function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuToggle.value?.focus()
}

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
  z-index: $z-header;
  min-height: $header-height;
  background: $white;
  border-bottom: $border-width solid $header-border;

  &__inner {
    min-height: calc($header-height - $border-width);
    padding-block: $space-10;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $space-20;
    row-gap: $space-8;
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: $space-10;
    margin-left: auto;
  }
  &__live {
    min-height: $control-size;
    padding: $space-9 $space-13;
    font-size: 0.78rem;
    white-space: nowrap;

    .site-header__live-icon {
      color: $white-pure;
      width: 20px;
      height: 20px;
      flex: none;
    }
  }
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-left: auto;

  a {
    font-size: $font-size-nav;
    font-weight: $weight-bold;
    white-space: nowrap;
    transition: color $transition-ui;
  }
  a:hover,
  a.router-link-exact-active {
    color: $header-link-hover;
  }
}

.language-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-5;
  width: 75px;
  min-height: $control-size;
  padding-inline: $space-5;
  border-radius: $radius-control;
  color: $ink;

  &:has(select:focus-visible) {
    outline: $focus-width solid $orange;
    outline-offset: $focus-offset;
  }
  .iconify {
    position: absolute;
    left: $space-5;
    pointer-events: none;
    width: 17px;
    height: 17px;
    flex: none;
  }
  select {
    position: absolute;
    inset: 0;
    height: $control-size;
    width: 100%;
    padding-left: 27px;
    background: transparent;
    border: 0;
    color: inherit;
    font-size: $font-size-label;
    font-weight: $weight-heavy;
    cursor: pointer;

    &:focus-visible {
      outline: none;
    }
  }
}

.menu-toggle {
  display: none;
}

@media (max-width: $breakpoint-desktop) {
  .site-nav {
    gap: $space-15;
  }
}

@media (max-width: $breakpoint-tablet) {
  .site-header {
    min-height: $header-height-mobile;
  }
  .site-header__inner {
    min-height: calc($header-height-mobile - $border-width);
  }
  .site-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: $space-14 $space-24 $space-22;
    padding-bottom: max($space-22, env(safe-area-inset-bottom));
    max-height: calc(
      100dvh - var(--measured-header-height, #{$header-height-mobile})
    );
    overflow-y: auto;
    border-bottom: $border-width solid $line;
    background: $white;
    box-shadow: 0 16px 22px $header-menu-shadow;

    &.is-open {
      display: flex;
    }
    a {
      padding: $space-13 $space-7;
      border-bottom: $border-width solid $line;
      font-size: 0.95rem;
    }
  }
  .menu-toggle {
    display: inline-grid;
  }
}

@media (max-width: $breakpoint-mobile) {
  .site-header__live {
    width: $control-size;
    padding: 0;
  }
  .site-header__live-label {
    display: none;
  }
}

@media (max-width: $breakpoint-small) {
  .brand {
    font-size: $font-size-brand-mobile;
  }
  .brand__symbol {
    font-size: 1.85rem;
  }
  .brand__text span {
    font-size: $font-size-small;
  }
  .site-header__actions {
    gap: $space-4;
  }
  .language-control .iconify {
    display: none;
  }
  .language-control {
    width: $control-size;
  }
  .language-control select {
    padding-left: $space-5;
  }
}
</style>
