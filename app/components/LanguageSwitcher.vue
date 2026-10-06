<template>
  <div
    ref="root"
    class="language-switcher"
    @keydown="handleKeydown"
    @focusout="handleFocusOut">
    <Icon name="lucide:languages" aria-hidden="true" />
    <button
      ref="trigger"
      class="language-switcher__trigger"
      type="button"
      :aria-label="`${t('site.language')}: ${currentLocale?.name ?? locale}`"
      aria-haspopup="menu"
      :aria-expanded="menuOpen"
      aria-controls="language-options"
      @click="toggleMenu">
      <span aria-hidden="true">{{ localeCode }}</span>
      <Icon name="lucide:chevron-down" aria-hidden="true" />
    </button>
    <ul
      v-show="menuOpen"
      id="language-options"
      class="language-switcher__menu"
      role="menu"
      :aria-label="t('site.language')">
      <li v-for="item in locales" :key="item.code" role="none">
        <button
          type="button"
          role="menuitemradio"
          class="language-switcher__option"
          :aria-label="item.name"
          :aria-checked="item.code === locale"
          :tabindex="item.code === locale ? 0 : -1"
          @click="changeLocale(item.code)">
          <span class="language-switcher__name">{{ item.name }}</span>
          <span class="language-switcher__code" aria-hidden="true">
            {{ item.code === 'ja' ? 'JP' : item.code.toUpperCase() }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const menuOpen = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const currentLocale = computed(() =>
  locales.value.find(item => item.code === locale.value)
)
const localeCode = computed(() =>
  locale.value === 'ja' ? 'JP' : locale.value.toUpperCase()
)

onMounted(() => {
  document.addEventListener('pointerdown', handleOutsidePointer)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsidePointer)
  document.removeEventListener('keydown', handleDocumentKeydown)
})

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  }
)

function toggleMenu() {
  if (menuOpen.value) {
    closeMenu()
    return
  }
  menuOpen.value = true
  void nextTick(() => focusSelectedOption())
}

function closeMenu(restoreFocus = false) {
  menuOpen.value = false

  if (restoreFocus) {
    trigger.value?.focus({ preventScroll: true })
  }
}

function focusSelectedOption() {
  root.value
    ?.querySelector<HTMLButtonElement>('[aria-checked="true"]')
    ?.focus({ preventScroll: true })
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault()
    closeMenu(true)
  }
}

function handleFocusOut(event: FocusEvent) {
  if (
    event.relatedTarget instanceof Node &&
    !root.value?.contains(event.relatedTarget)
  ) {
    menuOpen.value = false
  }
}

function handleOutsidePointer(event: PointerEvent) {
  if (
    menuOpen.value &&
    event.target instanceof Node &&
    !root.value?.contains(event.target)
  ) {
    menuOpen.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    return
  }

  event.preventDefault()
  const options = Array.from(
    root.value?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ??
      []
  )

  if (!menuOpen.value) {
    menuOpen.value = true

    void nextTick(() => {
      const openedOptions = Array.from(
        root.value?.querySelectorAll<HTMLButtonElement>(
          '[role="menuitemradio"]'
        ) ?? []
      )

      const target =
        event.key === 'ArrowUp' || event.key === 'End'
          ? openedOptions.at(-1)
          : openedOptions[0]
      target?.focus({ preventScroll: true })
    })

    return
  }

  const activeIndex = options.indexOf(
    document.activeElement as HTMLButtonElement
  )

  const nextIndex =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? options.length - 1
        : (activeIndex +
            (event.key === 'ArrowDown' ? 1 : -1) +
            options.length) %
          options.length

  options[nextIndex]?.focus({ preventScroll: true })
}

function changeLocale(code: string) {
  const selectedLocale = locales.value.find(item => item.code === code)
  closeMenu(true)

  if (selectedLocale) {
    void navigateTo(switchLocalePath(selectedLocale.code))
  }
}
</script>

<style lang="scss" scoped>
.language-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-height: $control-size;
  border-radius: $radius-control;
  color: $ink;

  &:has(> .language-switcher__trigger:focus-visible) {
    outline: $focus-width solid $orange;
    outline-offset: $focus-offset;
  }
  > .iconify {
    position: absolute;
    left: $space-5;
    pointer-events: none;
    width: 17px;
    height: 17px;
    flex: none;
  }
  &__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: $space-5;
    min-width: 4.7rem;
    min-height: $control-size;
    padding: 0 $space-7 0 27px;
    border: 0;
    border-radius: $radius-control;
    background: transparent;
    color: inherit;
    font-size: 1rem;
    font-weight: $weight-heavy;
  }
  &__trigger:focus-visible {
    outline: none;
  }
  button {
    cursor:
      url('/images/cursors/Location.cur') 0 0,
      pointer;
  }
  &__trigger .iconify {
    position: static;
    width: 14px;
    height: 14px;
  }
  &__menu {
    position: absolute;
    z-index: 1;
    top: calc(100% + $space-5);
    right: 0;
    min-width: max(100%, 9rem);
    margin: 0;
    padding: $space-6;
    list-style: none;
    border: $border-width solid $line;
    border-radius: $radius-control;
    background: $white;
    box-shadow: 0 10px 24px $header-menu-shadow;
  }
  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-20;
    width: 100%;
    min-height: $control-size;
    padding: $space-9 $space-11;
    border: 0;
    border-radius: $radius-small;
    background: transparent;
    color: $ink;
    font: inherit;
    text-align: left;
  }
  &__option:hover,
  &__option[aria-checked='true'] {
    background: $selection-background;
  }
  &__option:focus-visible {
    outline: $focus-width solid $orange;
    outline-offset: -$focus-width;
  }
  &__code {
    display: none;
    font-size: $font-size-small;
    font-weight: $weight-bold;
  }
}

@media (max-width: $breakpoint-mobile) {
  .language-switcher > .iconify {
    display: none;
  }
  .language-switcher__trigger {
    min-width: max(#{$control-size}, 3.1rem);
    padding-left: $space-5;
  }
  .language-switcher__menu {
    min-width: max(100%, 4.5rem);
  }
  .language-switcher__name {
    display: none;
  }
  .language-switcher__code {
    display: inline;
  }
}
</style>
