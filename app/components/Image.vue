<template>
  <img
    class="image"
    :src="src"
    :alt="alt"
    :width="width ?? dimensions?.[0]"
    :height="height ?? dimensions?.[1]"
    :loading="loading"
    decoding="async" />
</template>

<script setup lang="ts">
import { imageDimensions } from '~/data/imageDimensions'

const {
  src,
  alt,
  width = undefined,
  height = undefined,
  loading = 'lazy',
} = defineProps<{
  src: string
  alt: string
  width?: number | string
  height?: number | string
  loading?: 'lazy' | 'eager'
}>()

const dimensions = computed(() => imageDimensions[src])
</script>

<style lang="scss" scoped>
.image {
  display: block;
  min-width: 0;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
