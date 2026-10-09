<template>
  <dialog
    ref="dialog"
    class="lightbox"
    data-lenis-prevent
    :aria-label="label"
    @click.self="close"
    @keydown="handleKeydown"
    @close="handleClose">
    <button
      class="lightbox__close icon-button"
      type="button"
      :aria-label="t('components.artwork_lightbox.close')"
      :data-tooltip="t('components.artwork_lightbox.close')"
      @click="close">
      <Icon name="lucide:x" aria-hidden="true" />
    </button>
    <div
      class="lightbox__image"
      :class="`lightbox__image--${imageState}`"
      @touchstart.passive="startSwipe"
      @touchmove.passive="trackSwipe"
      @touchend.passive="endSwipe"
      @touchcancel="swipeStart = null">
      <Image
        v-if="activeArtwork"
        :key="activeArtwork.src"
        :skeleton="false"
        :src="activeArtwork.src"
        :alt="activeArtwork.alt"
        :aria-hidden="imageState !== 'loaded'"
        loading="eager"
        @load="handleImageLoad"
        @error="handleImageError" />
      <div
        v-if="imageState === 'loading' && showPlaceholder"
        class="lightbox__placeholder"
        role="status">
        {{ t('components.artwork_lightbox.loading') }}
      </div>
      <p v-if="imageState === 'error'" class="lightbox__error" role="status">
        <Icon name="lucide:image-off" aria-hidden="true" />
        {{ t('components.artwork_lightbox.unavailable') }}
      </p>
    </div>
    <div class="lightbox__controls">
      <button
        class="icon-button"
        type="button"
        :aria-label="t('components.artwork_lightbox.previous')"
        :data-tooltip="t('components.artwork_lightbox.previous')"
        @click="move(-1)">
        <Icon name="lucide:arrow-left" aria-hidden="true" />
      </button>
      <span v-if="activeIndex !== null">
        {{
          t('components.artwork_lightbox.count', {
            number: activeIndex + 1,
            total: artworks.length,
          })
        }}
      </span>
      <button
        class="icon-button"
        type="button"
        :aria-label="t('components.artwork_lightbox.next')"
        :data-tooltip="t('components.artwork_lightbox.next')"
        @click="move(1)">
        <Icon name="lucide:arrow-right" aria-hidden="true" />
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  artworks: readonly { src: string; alt: string }[]
  label: string
}>()

const { t } = useI18n()
const { $lenis } = useNuxtApp()

const dialog = ref<HTMLDialogElement | null>(null)
const activeIndex = ref<number | null>(null)
const imageState = ref<'loading' | 'loaded' | 'error'>('loading')
const showPlaceholder = ref(false)

const activeArtwork = computed(() =>
  activeIndex.value === null ? null : props.artworks[activeIndex.value]
)

let opener: HTMLElement | null = null
let placeholderTimer: ReturnType<typeof setTimeout> | null = null
let swipeStart: {
  identifier: number
  x: number
  y: number
  time: number
} | null = null

function clearPlaceholderTimer() {
  if (placeholderTimer !== null) {
    clearTimeout(placeholderTimer)
  }

  placeholderTimer = null
}

function currentImage() {
  return dialog.value?.querySelector<HTMLImageElement>('.lightbox__image img')
}

async function revealImage(image: HTMLImageElement) {
  try {
    await image.decode()
  } catch {
    // A successful load can still be displayed when decode() is unavailable.
  }

  if (currentImage() !== image) {
    return
  }

  clearPlaceholderTimer()
  imageState.value = 'loaded'
  showPlaceholder.value = false
}

function handleImageLoad(event: Event) {
  const image = event.target

  if (image instanceof HTMLImageElement) {
    void revealImage(image)
  }
}

function markImageError(image: HTMLImageElement) {
  if (currentImage() !== image) {
    return
  }

  clearPlaceholderTimer()
  imageState.value = 'error'
  showPlaceholder.value = false
}

function handleImageError(event: Event) {
  if (event.target instanceof HTMLImageElement) {
    markImageError(event.target)
  }
}

watch(
  activeIndex,
  async (index, _previous, onCleanup) => {
    clearPlaceholderTimer()
    imageState.value = 'loading'
    showPlaceholder.value = false

    if (index === null) {
      return
    }

    let stale = false

    onCleanup(() => {
      stale = true
      clearPlaceholderTimer()
    })

    placeholderTimer = setTimeout(() => {
      if (!stale && imageState.value === 'loading') {
        showPlaceholder.value = true
      }
    }, 300)

    await nextTick()

    if (stale) {
      return
    }

    const image = currentImage()

    if (image?.complete && image.currentSrc) {
      if (image.naturalWidth) {
        void revealImage(image)
      } else {
        markImageError(image)
      }
    }
  },
  { flush: 'sync' }
)

function startSwipe(event: TouchEvent) {
  const touch = event.touches[0]
  swipeStart =
    event.touches.length === 1 && touch
      ? {
          identifier: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
          time: event.timeStamp,
        }
      : null
}

function trackSwipe(event: TouchEvent) {
  if (event.touches.length !== 1) {
    swipeStart = null
  }
}

function endSwipe(event: TouchEvent) {
  const start = swipeStart
  swipeStart = null

  if (!start || event.touches.length > 0) {
    return
  }

  const touch = Array.from(event.changedTouches).find(
    item => item.identifier === start.identifier
  )

  if (!touch) {
    return
  }

  const distanceX = touch.clientX - start.x
  const distanceY = touch.clientY - start.y

  if (
    Math.abs(distanceX) >= 50 &&
    Math.abs(distanceX) > Math.abs(distanceY) * 1.5 &&
    event.timeStamp - start.time < 800
  ) {
    move(distanceX < 0 ? 1 : -1)
  }
}

function open(index: number, trigger?: HTMLElement) {
  if (!props.artworks[index]) {
    return
  }

  opener = trigger ?? (document.activeElement as HTMLElement | null)
  swipeStart = null
  activeIndex.value = index
  dialog.value?.showModal()
  $lenis.stop()
}

function close() {
  swipeStart = null
  dialog.value?.close()
}

function handleClose() {
  activeIndex.value = null
  $lenis.start()

  if (opener?.isConnected) {
    opener.focus({ preventScroll: true })
  }

  opener = null
}

onBeforeUnmount(() => {
  clearPlaceholderTimer()
  if (dialog.value?.open) {
    $lenis.start()
  }
})

function move(direction: -1 | 1) {
  if (activeIndex.value === null) {
    return
  }

  activeIndex.value =
    (activeIndex.value + direction + props.artworks.length) %
    props.artworks.length
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()

    return
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.lightbox {
  --focus-color: #{$orange};
  position: fixed;
  width: min($lightbox-max-width, calc(100% - $lightbox-inset * 2));
  max-width: none;
  height: min($lightbox-max-height, calc(100dvh - $lightbox-inset * 2));
  max-height: calc(100dvh - $lightbox-inset * 2);
  padding: max(#{$space-16}, env(safe-area-inset-top))
    max(#{$space-16}, env(safe-area-inset-right))
    max(#{$space-16}, env(safe-area-inset-bottom))
    max(#{$space-16}, env(safe-area-inset-left));
  overflow: auto;
  overscroll-behavior: contain;
  border: 0;
  border-radius: $radius-control;
  background: $plum-deep;
  color: $white-pure;

  &[open] {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: $space-10;
  }

  &::backdrop {
    background: $lightbox-backdrop;
  }

  &__close {
    display: grid;
    margin-left: auto;
    border-color: $lightbox-border;
    color: $white-pure;
  }

  &__image {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 0;
    touch-action: pan-y pinch-zoom;
  }

  &__image img {
    width: 100%;
    height: 100%;
    min-height: 0;
    object-fit: contain;
    opacity: 0;
  }

  &__image--loaded img {
    opacity: 1;
  }

  &__placeholder,
  &__error {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    gap: $space-10;
    margin: 0;
    padding: $space-16;
    border: $border-width solid $lightbox-border;
    border-radius: $radius-control;
    color: $footer-text;
    font-size: $font-size-note;
    font-weight: $weight-semibold;
    text-align: center;
  }

  &__placeholder {
    background: linear-gradient(
      110deg,
      $plum-deep 20%,
      $plum 50%,
      $plum-deep 80%
    );
    background-size: 200% 100%;
  }

  &__error :deep(svg) {
    width: $space-24;
    height: $space-24;
    margin-inline: auto;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-10;
  }

  &__controls .icon-button {
    border-color: $lightbox-border;
    color: $white-pure;
  }

  &__controls span {
    font-size: $font-size-nav;
    font-weight: $weight-bold;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .lightbox__image img {
    transition: opacity 0.28s ease;
  }

  .lightbox__placeholder {
    animation: artwork-skeleton 1.8s ease-in-out infinite;
  }
}
</style>
