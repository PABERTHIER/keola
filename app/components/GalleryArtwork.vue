<template>
  <button
    ref="button"
    class="gallery-item"
    :class="[
      `gallery-item--${imageState}`,
      {
        'gallery-item--enhanced': enhanced,
        'gallery-item--awaiting-view': !revealed,
        'gallery-item--intro': intro,
      },
    ]"
    type="button"
    :disabled="imageState === 'error'"
    :aria-label="
      imageState === 'error'
        ? t('gallery.image_unavailable')
        : `${t('gallery.open', { number })} : ${t(`gallery.image_descriptions.${number}`)}`
    "
    :data-tooltip="
      imageState === 'error'
        ? t('gallery.image_unavailable')
        : t('gallery.open', { number })
    "
    @click="emit('open', $event)">
    <Image
      class="gallery-item__image"
      :src="`/images/fanarts/fanart-${number}.webp`"
      :alt="
        t('gallery.image_alt', {
          number,
          description: t(`gallery.image_descriptions.${number}`),
        })
      "
      @load="imageState = 'loaded'"
      @error="imageState = 'error'" />
    <span
      v-if="imageState === 'error'"
      class="gallery-item__error"
      aria-hidden="true">
      <Icon name="lucide:image-off" aria-hidden="true" />
      {{ t('gallery.image_unavailable') }}
    </span>
    <span class="gallery-item__badge" aria-hidden="true">
      <Icon class="gallery-item__icon" name="lucide:expand" />
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ number: number; revealed: boolean; intro: boolean }>()

const emit = defineEmits<{ open: [event: MouseEvent] }>()

const { t } = useI18n()

const button = ref<HTMLButtonElement | null>(null)
const imageState = ref<'loading' | 'loaded' | 'error'>('loading')
const enhanced = ref(false)

onMounted(() => {
  const image = button.value?.querySelector('img')

  if (image?.complete && image.currentSrc) {
    imageState.value = image.naturalWidth ? 'loaded' : 'error'
  }

  enhanced.value = true
})
</script>

<style lang="scss" scoped>
.gallery-item {
  position: relative;
  display: block;
  width: 100%;
  min-height: $control-size;
  padding: 0;
  overflow: hidden;
  border: $border-width solid $line;
  border-radius: $radius-control;
  background: $peach;

  &--loaded {
    background: $white;
  }

  &::before {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, $peach 20%, $spirit 50%, $peach 80%);
    background-size: 200% 100%;
    content: '';
    pointer-events: none;
  }

  &__image {
    width: 100%;
    height: auto;
  }

  &--loaded::before {
    content: none;
  }

  &--error &__image {
    visibility: hidden;
  }

  &__error {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: $space-8;
    padding: $space-16;
    color: $muted;
    font-size: $font-size-note;
    text-align: center;
  }

  &__error :deep(svg) {
    width: $space-24;
    height: $space-24;
  }

  &__badge {
    position: absolute;
    z-index: $z-artwork;
    right: $space-10;
    bottom: $space-10;
    width: $gallery-badge-size;
    height: $gallery-badge-size;
    display: grid;
    place-items: center;
    border-radius: $radius-small;
    background: $white;
    color: $ink;
    opacity: 0;
    pointer-events: none;
    transition: opacity $transition-ui;
  }

  &__icon {
    width: $gallery-icon-size;
    height: $gallery-icon-size;
  }
}

.gallery-item--enhanced.gallery-item--loading .gallery-item__image {
  opacity: 0;
}

@media (hover: none), (pointer: coarse) {
  .gallery-item--loaded .gallery-item__badge {
    opacity: 1;
  }
}

.gallery-item:focus-visible .gallery-item__badge {
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .gallery-item--loaded:hover .gallery-item__badge {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .gallery-item--loading:not(.gallery-item--awaiting-view)::before {
    animation: artwork-skeleton 1.8s ease-in-out infinite;
  }

  .gallery-item__image {
    transition:
      opacity 0.55s ease,
      transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .gallery-item--awaiting-view .gallery-item__image {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }

  .gallery-item--intro {
    animation: gallery-intro 0.5s ease-out both;
  }

  .gallery-item--loaded:focus-visible .gallery-item__image {
    transform: scale($artwork-hover-scale);
  }

  @media (hover: hover) and (pointer: fine) {
    .gallery-item--loaded:hover .gallery-item__image {
      transform: scale($artwork-hover-scale);
    }
  }
}

@keyframes gallery-intro {
  from {
    opacity: 0.6;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
