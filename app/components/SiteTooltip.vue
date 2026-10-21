<template>
  <Teleport :to="container">
    <div
      v-if="visible"
      ref="tooltip"
      class="site-tooltip"
      :class="{ 'site-tooltip--dialog': container !== 'body' }"
      role="tooltip"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: position.above
          ? 'translate(-50%, -100%)'
          : 'translateX(-50%)',
      }">
      {{ label }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const route = useRoute()

const visible = ref(false)
const label = ref('')
const container = shallowRef<HTMLElement | 'body'>('body')
const tooltip = ref<HTMLElement | null>(null)
const position = ref({ x: 0, y: 0, above: true })

let activeTarget: HTMLElement | null = null
let openedByFocus = false
let pendingTarget: HTMLElement | null = null
let delayTimer: ReturnType<typeof setTimeout> | undefined
let positionFrame = 0
let hoverMedia: MediaQueryList | null = null

function tooltipTarget(event: Event) {
  if (!(event.target instanceof Element)) {
    return null
  }

  const target = event.target.closest<HTMLElement>('[data-tooltip]')

  return target?.matches(':disabled, [aria-disabled="true"]') ? null : target
}

function hide() {
  if (delayTimer) {
    clearTimeout(delayTimer)
  }

  delayTimer = undefined
  pendingTarget = null
  activeTarget = null
  openedByFocus = false
  visible.value = false
  container.value = 'body'

  if (positionFrame) {
    cancelAnimationFrame(positionFrame)
    positionFrame = 0
  }
}

function updatePosition(target: HTMLElement) {
  if (!target.isConnected) {
    hide()
    return
  }

  const rect = target.getBoundingClientRect()
  const dialog = container.value === 'body' ? null : container.value
  const containerRect = dialog?.getBoundingClientRect()

  if (
    rect.bottom < (containerRect?.top ?? 0) ||
    rect.top > (containerRect?.bottom ?? window.innerHeight) ||
    rect.right < (containerRect?.left ?? 0) ||
    rect.left > (containerRect?.right ?? window.innerWidth)
  ) {
    hide()
    return
  }

  const left = containerRect?.left ?? 0
  const top = containerRect?.top ?? 0
  const width = containerRect?.width ?? window.innerWidth
  const bottom = containerRect?.bottom ?? window.innerHeight

  const halfWidth = dialog
    ? Math.min((tooltip.value?.offsetWidth ?? 280) / 2, (width - 24) / 2)
    : Math.min(140, (width - 24) / 2)

  const above =
    rect.top - top >= 112 ||
    (rect.bottom + 112 > bottom && rect.top - top > bottom - rect.bottom)

  position.value = {
    x:
      Math.max(
        halfWidth + 12,
        Math.min(rect.left + rect.width / 2 - left, width - halfWidth - 12)
      ) + (dialog?.scrollLeft ?? 0),
    y:
      (above ? rect.top - 18 : rect.bottom + 18) -
      top +
      (dialog?.scrollTop ?? 0),
    above,
  }
}

function show(target: HTMLElement, fromFocus = false) {
  const text = target.dataset.tooltip?.trim()

  if (!text || !target.isConnected) {
    return
  }

  pendingTarget = null
  activeTarget = target
  openedByFocus = fromFocus
  label.value = text
  container.value = target.closest('dialog[open]') ?? 'body'

  updatePosition(target)

  if (activeTarget !== target) {
    return
  }

  visible.value = true

  void nextTick(() => {
    if (activeTarget === target) {
      updatePosition(target)
    }
  })
}

function schedulePosition() {
  if (!visible.value || !activeTarget || positionFrame) {
    return
  }

  positionFrame = requestAnimationFrame(() => {
    positionFrame = 0

    if (activeTarget) {
      updatePosition(activeTarget)
    }
  })
}

function handlePointerOver(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !hoverMedia?.matches) {
    return
  }

  const target = tooltipTarget(event)

  if (!target || target === activeTarget || target === pendingTarget) {
    return
  }

  hide()
  pendingTarget = target
  delayTimer = setTimeout(() => show(target), 450)
}

function handlePointerOut(event: PointerEvent) {
  if (event.pointerType !== 'mouse') {
    return
  }

  const target = tooltipTarget(event)

  if (
    target &&
    ((target === activeTarget && !openedByFocus) || target === pendingTarget) &&
    !(
      event.relatedTarget instanceof Node &&
      target.contains(event.relatedTarget)
    )
  ) {
    hide()
  }
}

function handleFocusIn(event: FocusEvent) {
  const target = tooltipTarget(event)

  if (!target?.matches(':focus-visible')) {
    return
  }

  const previousDialog =
    event.relatedTarget instanceof Element
      ? event.relatedTarget.closest('dialog')
      : null

  // Opening and closing a modal move focus automatically
  if (target.closest('dialog') !== previousDialog) {
    return
  }

  hide()
  show(target, true)
}

function handleFocusOut(event: FocusEvent) {
  const target = tooltipTarget(event)

  if (
    target &&
    target === activeTarget &&
    !(
      event.relatedTarget instanceof Node &&
      target.contains(event.relatedTarget)
    )
  ) {
    hide()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    hide()
  }
}

onMounted(() => {
  hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)')

  document.addEventListener('pointerover', handlePointerOver)
  document.addEventListener('pointerout', handlePointerOut)
  document.addEventListener('focusin', handleFocusIn)
  document.addEventListener('focusout', handleFocusOut)
  document.addEventListener('pointerdown', hide)
  document.addEventListener('keydown', handleKeydown)

  window.addEventListener('scroll', schedulePosition, {
    capture: true,
    passive: true,
  })
  window.addEventListener('resize', schedulePosition)
})

onBeforeUnmount(() => {
  hide()

  hoverMedia = null

  document.removeEventListener('pointerover', handlePointerOver)
  document.removeEventListener('pointerout', handlePointerOut)
  document.removeEventListener('focusin', handleFocusIn)
  document.removeEventListener('focusout', handleFocusOut)
  document.removeEventListener('pointerdown', hide)
  document.removeEventListener('keydown', handleKeydown)

  window.removeEventListener('scroll', schedulePosition, true)
  window.removeEventListener('resize', schedulePosition)
})

watch(() => route.fullPath, hide)
</script>

<style lang="scss" scoped>
.site-tooltip {
  position: fixed;
  z-index: $z-tooltip;
  width: max-content;
  max-width: min(280px, calc(100vw - 24px));
  padding: $space-8 $space-12;
  border: $border-width solid $tooltip-border;
  border-radius: $radius-control;
  background: $tooltip-background;
  color: $tooltip-text;
  box-shadow: 0 8px 22px #30213733;
  font-family: $body;
  font-size: $font-size-note;
  font-weight: $weight-semibold;
  line-height: 1.4;
  text-align: center;
  overflow-wrap: anywhere;
  pointer-events: none;

  &--dialog {
    position: absolute;
    max-width: min(280px, calc(100% - 24px));
  }
}
</style>
