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
      :aria-label="t('gallery.close')"
      :data-tooltip="t('gallery.close')"
      @click="close">
      <Icon name="lucide:x" aria-hidden="true" />
    </button>
    <div
      class="lightbox__image"
      @touchstart.passive="startSwipe"
      @touchmove.passive="trackSwipe"
      @touchend.passive="endSwipe"
      @touchcancel="swipeStart = null">
      <Image
        v-if="activeArtwork"
        :src="activeArtwork.src"
        :alt="activeArtwork.alt"
        loading="eager" />
    </div>
    <div class="lightbox__controls">
      <button
        class="icon-button"
        type="button"
        :aria-label="t('gallery.previous')"
        :data-tooltip="t('gallery.previous')"
        @click="move(-1)">
        <Icon name="lucide:arrow-left" aria-hidden="true" />
      </button>
      <span v-if="activeIndex !== null">
        {{
          t('gallery.count', {
            number: activeIndex + 1,
            total: artworks.length,
          })
        }}
      </span>
      <button
        class="icon-button"
        type="button"
        :aria-label="t('gallery.next')"
        :data-tooltip="t('gallery.next')"
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
const activeArtwork = computed(() =>
  activeIndex.value === null ? null : props.artworks[activeIndex.value]
)
let opener: HTMLElement | null = null
let swipeStart: {
  identifier: number
  x: number
  y: number
  time: number
} | null = null

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
  if (event.touches.length !== 1) swipeStart = null
}

function endSwipe(event: TouchEvent) {
  const start = swipeStart
  swipeStart = null
  if (!start || event.touches.length > 0) return
  const touch = Array.from(event.changedTouches).find(
    item => item.identifier === start.identifier
  )
  if (!touch) return
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
  if (!props.artworks[index]) return
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
  if (opener?.isConnected) opener.focus({ preventScroll: true })
  opener = null
}

onBeforeUnmount(() => {
  if (dialog.value?.open) $lenis.start()
})

function move(direction: -1 | 1) {
  if (activeIndex.value === null) return
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
</style>
