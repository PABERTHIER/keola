<template>
  <NuxtLink
    :to="localePath('/')"
    class="brand"
    :class="{ 'brand--inverse': inverse }"
    aria-label="Keola Kumaneko">
    <Image src="/images/image01.webp" alt="" loading="eager" />
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
  align-items: center;
  gap: 8px;
  flex: none;
  color: $ink;
  font-family: $signature;
  font-size: 1.32rem;
  font-weight: 400;
  line-height: 0.93;

  &--inverse {
    color: white;
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
    font-size: 0.9rem;
  }
}

@media (max-width: 420px) {
  .brand {
    font-size: 1.1rem;
  }

  .brand img {
    width: 36px;
    height: 36px;
  }

  .brand__text span {
    font-size: 0.77rem;
  }
}
</style>
