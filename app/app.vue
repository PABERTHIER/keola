<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localeHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
</script>
