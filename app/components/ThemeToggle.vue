<template>
  <button
    class="icon-button"
    type="button"
    :aria-label="
      t(
        isDark
          ? 'components.theme_toggle.light'
          : 'components.theme_toggle.dark'
      )
    "
    :data-tooltip="
      t(
        isDark
          ? 'components.theme_toggle.light'
          : 'components.theme_toggle.dark'
      )
    "
    @click="toggleTheme">
    <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()

const { theme, setTheme } = useSiteTheme()

const systemDark = ref(false)

const isDark = computed(
  () => theme.value === 'dark' || (theme.value === null && systemDark.value)
)

let colorScheme: MediaQueryList | undefined

onMounted(() => {
  colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = colorScheme.matches
  colorScheme.addEventListener('change', handleSystemTheme)
})

onBeforeUnmount(() =>
  colorScheme?.removeEventListener('change', handleSystemTheme)
)

function handleSystemTheme(event: MediaQueryListEvent) {
  systemDark.value = event.matches
}

function toggleTheme() {
  setTheme(isDark.value ? 'light' : 'dark')
}
</script>
