<template>
  <div>
    <a class="skip-link" href="#main-content" @click="focusMain">
      {{ t('site.skip') }}
    </a>
    <SiteHeader />
    <slot />
    <SiteFooter />
    <SiteTooltip />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

function focusMain() {
  document.getElementById('main-content')?.focus({ preventScroll: true })
}
</script>

<style lang="scss" scoped>
.skip-link {
  position: fixed;
  z-index: $z-skip-link;
  top: $space-8;
  left: $space-16;
  padding: $space-12 $space-18;
  background: $white;
  transform: translateY(-160%);
}

.skip-link:focus {
  transform: translateY(0);
}
</style>
