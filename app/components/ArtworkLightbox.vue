<template>
  <dialog
    ref="dialog"
    class="lightbox"
    data-lenis-prevent
    aria-labelledby="lightbox-title"
    @click.self="close"
    @touchmove.self.prevent
    @keydown="handleKeydown"
    @close="handleClose">
    <header class="lightbox__header">
      <div class="lightbox__identity">
        <p class="lightbox__eyebrow">{{ label }}</p>
        <h2 id="lightbox-title" class="lightbox__title">
          {{ activeArtwork?.title }}
        </h2>
        <p v-if="activeArtwork?.credit" class="lightbox__credit">
          {{ activeArtwork.credit }}
        </p>
      </div>
      <button
        class="lightbox__close icon-button"
        type="button"
        :aria-label="t('components.artwork_lightbox.close')"
        :data-tooltip="t('components.artwork_lightbox.close')"
        @click="close">
        <Icon name="lucide:x" aria-hidden="true" />
      </button>
    </header>
    <div
      class="lightbox__zoom"
      role="group"
      :aria-label="t('components.artwork_lightbox.zoom_group')">
      <button
        class="icon-button"
        data-cursor="precision"
        type="button"
        :aria-label="t('components.artwork_lightbox.zoom_out')"
        :data-tooltip="t('components.artwork_lightbox.zoom_out')"
        :disabled="zoom <= 1 || imageState !== 'loaded'"
        @click="changeZoom(-1)">
        <Icon name="lucide:minus" aria-hidden="true" />
      </button>
      <span class="lightbox__zoom-level">{{ Math.round(zoom * 100) }}%</span>
      <button
        class="icon-button"
        data-cursor="precision"
        type="button"
        :aria-label="t('components.artwork_lightbox.zoom_in')"
        :data-tooltip="t('components.artwork_lightbox.zoom_in')"
        :disabled="zoom >= 4 || imageState !== 'loaded'"
        @click="changeZoom(1)">
        <Icon name="lucide:plus" aria-hidden="true" />
      </button>
      <button
        class="icon-button"
        type="button"
        :aria-label="t('components.artwork_lightbox.zoom_reset')"
        :data-tooltip="t('components.artwork_lightbox.zoom_reset')"
        :disabled="zoom === 1 || imageState !== 'loaded'"
        @click="resetZoom">
        <Icon name="lucide:scan" aria-hidden="true" />
      </button>
    </div>
    <div
      ref="imageStage"
      class="lightbox__image"
      :data-cursor="zoom > 1 ? 'move' : undefined"
      :class="[
        `lightbox__image--${imageState}`,
        { 'lightbox__image--zoomed': zoom > 1 },
      ]"
      @touchstart.passive="startSwipe"
      @touchmove.passive="trackSwipe"
      @touchend.passive="endSwipe"
      @touchcancel="endGesture"
      @wheel="handleWheel"
      @dblclick="toggleZoom"
      @pointerdown="startPointerPan"
      @pointermove="movePointerPan"
      @pointerup="endPointerPan"
      @pointercancel="endPointerPan"
      @lostpointercapture="endPointerPan"
      @dragstart.prevent>
      <Image
        v-if="activeArtwork"
        :key="activeArtwork.src"
        :skeleton="false"
        :src="activeArtwork.src"
        :alt="activeArtwork.alt"
        :aria-hidden="imageState !== 'loaded'"
        :style="{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})` }"
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
      <span v-if="activeIndex !== null" aria-live="polite" aria-atomic="true">
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
  artworks: readonly {
    src: string
    alt: string
    title: string
    credit?: string
  }[]
  label: string
}>()

const { t } = useI18n()
const { $lenis } = useNuxtApp()

const dialog = ref<HTMLDialogElement | null>(null)
const imageStage = ref<HTMLElement | null>(null)
const activeIndex = ref<number | null>(null)
const imageState = ref<'loading' | 'loaded' | 'error'>('loading')
const showPlaceholder = ref(false)
const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)

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

let gesture: {
  distance: number
  zoom: number
  x: number
  y: number
  panX: number
  panY: number
} | null = null

let panStart: { x: number; y: number; panX: number; panY: number } | null = null

let pointerPan: {
  id: number
  x: number
  y: number
  panX: number
  panY: number
} | null = null

function resetZoom() {
  zoom.value = 1
  panX.value = 0
  panY.value = 0
  swipeStart = null
  gesture = null
  panStart = null
  pointerPan = null
}

function clampPan() {
  const stage = imageStage.value
  const image = currentImage()

  if (!stage || !image) {
    return
  }

  const xLimit = Math.max(
    (image.offsetWidth * zoom.value - stage.clientWidth) / 2,
    (image.offsetWidth * (zoom.value - 1)) / 2
  )
  const yLimit = Math.max(
    (image.offsetHeight * zoom.value - stage.clientHeight) / 2,
    (image.offsetHeight * (zoom.value - 1)) / 2
  )

  panX.value = Math.max(-xLimit, Math.min(xLimit, panX.value))
  panY.value = Math.max(-yLimit, Math.min(yLimit, panY.value))
}

function setZoom(value: number, clientX?: number, clientY?: number) {
  const nextZoom = Math.max(1, Math.min(4, value))
  const stage = imageStage.value

  if (stage && clientX !== undefined && clientY !== undefined) {
    const bounds = stage.getBoundingClientRect()
    const x = clientX - (bounds.left + bounds.width / 2)
    const y = clientY - (bounds.top + bounds.height / 2)
    const ratio = nextZoom / zoom.value

    panX.value = x - (x - panX.value) * ratio
    panY.value = y - (y - panY.value) * ratio
  }

  zoom.value = nextZoom

  if (zoom.value === 1) {
    panX.value = 0
    panY.value = 0
  } else {
    clampPan()
  }
}

function changeZoom(direction: -1 | 1) {
  if (imageState.value !== 'loaded') {
    return
  }

  setZoom(zoom.value + direction * 0.5)
}

function toggleZoom(event: MouseEvent) {
  if (imageState.value === 'loaded') {
    setZoom(zoom.value === 1 ? 2 : 1, event.clientX, event.clientY)
  }
}

function handleWheel(event: WheelEvent) {
  if (imageState.value !== 'loaded' || event.ctrlKey) {
    return
  }

  event.preventDefault()

  const unit =
    event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? 16
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? (imageStage.value?.clientHeight ?? 1)
        : 1

  const distance = Math.max(-120, Math.min(120, event.deltaY * unit))

  setZoom(
    zoom.value * Math.exp(-distance * 0.0015),
    event.clientX,
    event.clientY
  )
}

function startPointerPan(event: PointerEvent) {
  if (
    event.pointerType === 'touch' ||
    event.button !== 0 ||
    zoom.value <= 1 ||
    imageState.value !== 'loaded'
  )
    return
  pointerPan = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    panX: panX.value,
    panY: panY.value,
  }

  imageStage.value?.setPointerCapture(event.pointerId)
}

function movePointerPan(event: PointerEvent) {
  if (!pointerPan || event.pointerId !== pointerPan.id) {
    return
  }

  panX.value = pointerPan.panX + event.clientX - pointerPan.x
  panY.value = pointerPan.panY + event.clientY - pointerPan.y

  clampPan()
}

function endPointerPan(event: PointerEvent) {
  if (pointerPan?.id === event.pointerId) {
    pointerPan = null
  }
}

function touchDistance(a: Touch, b: Touch) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
}

function endGesture() {
  swipeStart = null
  gesture = null
  panStart = null
  pointerPan = null
}

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
    // A successful load can still be displayed when decode() is unavailable
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

function startSwipe(event: TouchEvent) {
  if (event.touches.length === 2 && imageState.value === 'loaded') {
    const [a, b] = Array.from(event.touches)

    if (!a || !b) {
      return
    }

    gesture = {
      distance: Math.max(1, touchDistance(a, b)),
      zoom: zoom.value,
      x: (a.clientX + b.clientX) / 2,
      y: (a.clientY + b.clientY) / 2,
      panX: panX.value,
      panY: panY.value,
    }

    swipeStart = null
    panStart = null

    return
  }

  const touch = event.touches[0]

  panStart =
    zoom.value > 1 && touch
      ? {
          x: touch.clientX,
          y: touch.clientY,
          panX: panX.value,
          panY: panY.value,
        }
      : null

  swipeStart =
    zoom.value === 1 && event.touches.length === 1 && touch
      ? {
          identifier: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
          time: event.timeStamp,
        }
      : null
}

// CSS touch-action handles scrolling and gestures; this listener stays passive
function trackSwipe(event: TouchEvent) {
  if (event.touches.length === 2 && gesture) {
    const [a, b] = Array.from(event.touches)

    if (!a || !b) {
      return
    }

    const bounds = imageStage.value?.getBoundingClientRect()

    if (!bounds) {
      return
    }

    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2

    const nextZoom = Math.max(
      1,
      Math.min(4, (gesture.zoom * touchDistance(a, b)) / gesture.distance)
    )

    const ratio = nextZoom / gesture.zoom

    zoom.value = nextZoom
    panX.value =
      (a.clientX + b.clientX) / 2 -
      centerX -
      (gesture.x - centerX - gesture.panX) * ratio
    panY.value =
      (a.clientY + b.clientY) / 2 -
      centerY -
      (gesture.y - centerY - gesture.panY) * ratio

    clampPan()
  } else if (event.touches.length === 1 && panStart && zoom.value > 1) {
    const touch = event.touches[0]

    if (!touch) {
      return
    }

    panX.value = panStart.panX + touch.clientX - panStart.x
    panY.value = panStart.panY + touch.clientY - panStart.y

    clampPan()
  } else if (event.touches.length !== 1) {
    swipeStart = null
  }
}

function endSwipe(event: TouchEvent) {
  if (event.touches.length === 1 && gesture) {
    const touch = event.touches[0]

    gesture = null
    swipeStart = null
    panStart = touch
      ? {
          x: touch.clientX,
          y: touch.clientY,
          panX: panX.value,
          panY: panY.value,
        }
      : null

    return
  }

  if (event.touches.length > 0) {
    endGesture()

    return
  }

  const start = swipeStart

  endGesture()

  if (!start) {
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

  resetZoom()

  activeIndex.value = index
  dialog.value?.showModal()
  $lenis.stop()
}

function close() {
  endGesture()

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

  if (event.key === '+' || event.key === '=') {
    changeZoom(1)
  }

  if (event.key === '-') {
    changeZoom(-1)
  }

  if (event.key === '0') {
    resetZoom()
  }
}

watch(
  activeIndex,
  async (index, _previous, onCleanup) => {
    clearPlaceholderTimer()
    imageState.value = 'loading'
    showPlaceholder.value = false
    resetZoom()

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

onBeforeUnmount(() => {
  clearPlaceholderTimer()
  window.removeEventListener('resize', clampPan)
  if (dialog.value?.open) {
    $lenis.start()
  }
})

onMounted(() => window.addEventListener('resize', clampPan))

defineExpose({ open })
</script>

<style lang="scss" scoped>
.lightbox {
  --focus-color: #{$orange};
  --lightbox-gutter: #{$shell-gutter-mobile};
  position: fixed;
  width: min(
    $lightbox-max-width,
    calc(
      100% - max(var(--lightbox-gutter), env(safe-area-inset-left)) - max(
          var(--lightbox-gutter),
          env(safe-area-inset-right)
        )
    )
  );
  max-width: none;
  height: min(
    $lightbox-max-height,
    calc(
      100dvh - max(var(--lightbox-gutter), env(safe-area-inset-top)) - max(
          var(--lightbox-gutter),
          env(safe-area-inset-bottom)
        )
    )
  );
  max-height: calc(
    100dvh - max(var(--lightbox-gutter), env(safe-area-inset-top)) - max(
        var(--lightbox-gutter),
        env(safe-area-inset-bottom)
      )
  );
  padding: $space-16;
  overflow: auto;
  overscroll-behavior: contain;
  border: 1px solid rgba($white-pure, 0.25);
  border-radius: $space-18;
  background: rgba($plum-deep, 0.91);
  box-shadow: 0 28px 80px rgba($black, 0.36);
  color: $white-pure;

  &[open] {
    display: grid;
    grid-template-rows: auto auto minmax(130px, 1fr) auto;
    gap: $space-10;
  }

  &::backdrop {
    background: rgba($plum-deep, 0.72);
    backdrop-filter: blur(15px);
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-12;
    min-width: 0;
  }

  &__identity {
    min-width: 0;
  }

  &__eyebrow {
    margin: 0 0 $space-4;
    color: $archive-accent;
    font-size: $font-size-label;
    font-weight: $weight-bold;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  &__title {
    margin: 0;
    font-family: $display;
    font-size: clamp(1.05rem, 2vw, 1.55rem);
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  &__credit {
    margin: $space-4 0 0;
    color: $footer-description-text;
    font-size: $font-size-note;
    overflow-wrap: anywhere;
  }

  &__close {
    flex: none;
  }

  &__zoom {
    display: flex;
    align-items: center;
    gap: $space-5;
    width: fit-content;
    max-width: 100%;
  }

  &__zoom-level {
    min-width: 4ch;
    color: $footer-text;
    font-size: $font-size-note;
    font-weight: $weight-bold;
    text-align: center;
  }

  .icon-button {
    border-color: rgba($white-pure, 0.35);
    background: rgba($white-pure, 0.08);
    color: $white-pure;

    &:hover:not(:disabled) {
      background: rgba($white-pure, 0.18);
    }

    &:disabled {
      opacity: 0.45;
    }
  }

  &__image {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 0;
    overflow: hidden;
    border: 1px solid rgba($white-pure, 0.16);
    border-radius: $radius-art;
    background: rgba($black, 0.16);
    touch-action: pan-y;

    &--zoomed {
      touch-action: none;
    }

    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      min-height: 0;
      object-fit: contain;
      opacity: 0;
      transform-origin: center;
      user-select: none;
      -webkit-user-drag: none;
    }

    &--loaded img {
      opacity: 1;
    }
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
    border-radius: $radius-art;
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

  &__error {
    :deep(svg) {
      width: $space-24;
      height: $space-24;
      margin-inline: auto;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-10;
    min-height: $control-size;

    span {
      font-size: $font-size-nav;
      font-weight: $weight-bold;
    }
  }
}

@media (min-width: $breakpoint-mobile) {
  .lightbox {
    --lightbox-gutter: #{$shell-gutter-tablet};
    padding: $space-22;
    gap: $space-13;
  }
}

@media (min-width: $breakpoint-tablet) {
  .lightbox {
    --lightbox-gutter: #{$shell-gutter};
  }
}

@media (max-height: 560px) {
  .lightbox {
    padding-block: $space-8;
    gap: $space-5;
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
