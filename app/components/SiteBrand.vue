<template>
  <NuxtLink
    :to="localePath('/')"
    class="brand"
    :class="{ 'brand--inverse': inverse }"
    :aria-label="`${t('components.site_brand.brand_name')} · ${t('site.back_home')}`"
    :data-tooltip="t('site.back_home')">
    <Image
      :skeleton="false"
      src="/images/logo.webp"
      :alt="t('components.site_brand.brand_logo_alt')"
      loading="eager" />
    <span class="brand__text">
      {{ t('components.site_brand.brand_first') }}
      <span>{{ t('components.site_brand.brand_last') }}</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ inverse?: boolean }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.brand {
  display: inline-flex;
  min-height: $control-size;
  align-items: center;
  gap: $space-8;
  flex: none;
  color: $ink;
  font-family: $signature;
  font-size: 1.32rem;
  font-weight: $weight-regular;
  line-height: 0.93;

  &--inverse {
    color: $white-pure;
  }

  img {
    width: 44px;
    height: 44px;
    flex: none;
    object-fit: contain;
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__text span {
    font-size: $font-size-secondary;
  }
}

@media (max-width: $breakpoint-small) {
  .brand {
    font-size: $font-size-brand-mobile;
  }

  .brand img {
    width: 36px;
    height: 36px;
  }

  .brand__text span {
    font-size: $font-size-small;
  }
}
</style>
