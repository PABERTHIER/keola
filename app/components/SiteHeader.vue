<template>
  <header
    ref="header"
    class="site-header"
    :style="{ '--measured-header-height': `${headerHeight}px` }"
    @focusout="handleFocusOut">
    <div class="shell site-header__inner">
      <SiteBrand />

      <nav
        id="primary-nav"
        ref="navigation"
        class="site-nav"
        :class="{ 'is-open': menuOpen, 'is-animated': menuAnimated }"
        :inert="mobileNavigation && !menuOpen"
        data-lenis-prevent
        :aria-label="t('site.explore')">
        <NuxtLink :to="localePath('/keola')" @click="closeMenu">
          {{ t('site.about') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/gallery')" @click="closeMenu">
          {{ t('site.gallery') }}
        </NuxtLink>
        <NuxtLink
          :to="localePath({ path: '/', hash: '#mission' })"
          :aria-current-value="route.hash === '#mission' ? 'location' : 'false'"
          @click="closeMenu">
          {{ t('site.mission') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/archives')" @click="closeMenu">
          {{ t('site.archives') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/credits')" @click="closeMenu">
          {{ t('site.credits') }}
        </NuxtLink>
      </nav>

      <div class="site-header__actions">
        <LanguageSwitcher />
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
          @click="toggleMenu">
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

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const menuOpen = ref(false)
const menuAnimated = ref(false)
const mobileNavigation = ref(false)
const navigation = ref<HTMLElement | null>(null)
const menuToggle = ref<HTMLButtonElement | null>(null)
const header = ref<HTMLElement | null>(null)
const headerHeight = ref(0)
let headerObserver: ResizeObserver | undefined

onMounted(() => {
  document.addEventListener('pointerdown', handleOutsidePointer)
  document.addEventListener('keydown', handleEscape)
  if (!header.value) return
  measureHeader()
  headerObserver = new ResizeObserver(measureHeader)
  headerObserver.observe(header.value)
})

onBeforeUnmount(() => {
  headerObserver?.disconnect()
  document.removeEventListener('pointerdown', handleOutsidePointer)
  document.removeEventListener('keydown', handleEscape)
  document.documentElement.style.removeProperty('--site-header-height')
})

function measureHeader() {
  headerHeight.value = header.value?.offsetHeight ?? 0
  document.documentElement.style.setProperty(
    '--site-header-height',
    `${headerHeight.value}px`
  )
  const mobile = menuToggle.value?.offsetParent !== null
  if (mobile !== mobileNavigation.value) menuAnimated.value = false
  mobileNavigation.value = mobile
  if (!mobileNavigation.value) menuOpen.value = false
}

async function toggleMenu() {
  menuAnimated.value = true
  if (menuOpen.value) {
    closeMenu()
    return
  }
  menuOpen.value = true
  await nextTick()
  navigation.value?.querySelector('a')?.focus({ preventScroll: true })
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault()
    closeMenu()
  }
}

function handleFocusOut(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    !header.value?.contains(event.relatedTarget)
  ) {
    menuOpen.value = false
  }
}

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
  menuToggle.value?.focus({ preventScroll: true })
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  }
)
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
    display: inline-flex;
    align-items: center;
    min-width: $control-size;
    min-height: $control-size;
    font-size: $font-size-nav;
    font-weight: $weight-bold;
    overflow-wrap: anywhere;
    transition: color $transition-ui;
  }
  a:hover,
  a.router-link-exact-active:not([href*='#']),
  a[aria-current='location'] {
    color: $header-link-hover;
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
    padding: $space-14 max(#{$space-24}, env(safe-area-inset-right)) $space-22
      max(#{$space-24}, env(safe-area-inset-left));
    padding-bottom: max($space-22, env(safe-area-inset-bottom));
    max-height: calc(
      100dvh - var(--measured-header-height, #{$header-height-mobile})
    );
    overflow-y: auto;
    overscroll-behavior: contain;
    border-bottom: $border-width solid $line;
    background: $white;
    box-shadow: 0 16px 22px $header-menu-shadow;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-$space-8);
    pointer-events: none;
    &.is-animated {
      transition:
        opacity $transition-ui,
        transform $transition-ui,
        visibility 0s 0.2s;
    }

    &.is-open {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      transition-delay: 0s;
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
  .site-header__actions {
    gap: $space-4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-nav.is-animated {
    transition: none;
  }
}
</style>
