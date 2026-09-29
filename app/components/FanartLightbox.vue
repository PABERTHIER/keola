<template>
  <dialog
    ref="dialog"
    class="lightbox"
    :aria-label="t('site.gallery')"
    @click.self="close"
    @keydown="handleKeydown"
    @close="activeIndex = null">
    <button
      class="lightbox__close icon-button"
      type="button"
      :aria-label="t('gallery.close')"
      :title="t('gallery.close')"
      @click="close">
      <Icon name="lucide:x" aria-hidden="true" />
    </button>
    <div class="lightbox__image">
      <Image
        v-if="activeNumber !== null"
        :src="`/images/fanart/fanart-${activeNumber}.webp`"
        :alt="t('gallery.image_alt', { number: activeNumber })"
        loading="eager" />
    </div>
    <div class="lightbox__controls">
      <button
        class="icon-button"
        type="button"
        :aria-label="t('gallery.previous')"
        :title="t('gallery.previous')"
        @click="move(-1)">
        <Icon name="lucide:arrow-left" aria-hidden="true" />
      </button>
      <span v-if="activeIndex !== null">
        {{
          t('gallery.count', { number: activeIndex + 1, total: numbers.length })
        }}
      </span>
      <button
        class="icon-button"
        type="button"
        :aria-label="t('gallery.next')"
        :title="t('gallery.next')"
        @click="move(1)">
        <Icon name="lucide:arrow-right" aria-hidden="true" />
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ numbers: readonly number[] }>()
const { t } = useI18n()
const dialog = ref<HTMLDialogElement | null>(null)
const activeIndex = ref<number | null>(null)
const activeNumber = computed(() =>
  activeIndex.value === null ? null : props.numbers[activeIndex.value]
)

function open(index: number) {
  activeIndex.value = index
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

function move(direction: -1 | 1) {
  if (activeIndex.value === null) return
  activeIndex.value =
    (activeIndex.value + direction + props.numbers.length) %
    props.numbers.length
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
  position: fixed;
  width: min($lightbox-max-width, calc(100% - $lightbox-inset * 2));
  max-width: none;
  height: min($lightbox-max-height, calc(100dvh - $lightbox-inset * 2));
  max-height: calc(100dvh - $lightbox-inset * 2);
  padding: $space-16;
  overflow: auto;
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
