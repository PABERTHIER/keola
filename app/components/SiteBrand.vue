<template>
  <NuxtLink
    :to="localePath('/')"
    class="brand"
    :class="{ 'brand--inverse': inverse }"
    aria-label="Keola Kumaneko">
    <Image src="/images/logo.webp" alt="" loading="eager" />
    <span class="brand__text">
      Keola
      <span>Kumaneko</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ inverse?: boolean }>()

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
