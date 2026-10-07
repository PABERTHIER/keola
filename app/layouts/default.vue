<template>
  <div>
    <a class="skip-link" href="#main-content">{{ t('site.skip') }}</a>
    <SiteHeader />
    <slot />
    <SiteFooter />
    <SiteTooltip />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
