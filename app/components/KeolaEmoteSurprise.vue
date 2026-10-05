<template>
  <div class="emote-surprise">
    <button
      class="emote-surprise__trigger"
      type="button"
      :aria-label="t('keola.more.egg_action')"
      :title="t('keola.more.egg_action')"
      @click="releaseEmotes">
      <Image src="/images/misc/NYUH.webp" :alt="t('keola.more.egg_nyuh_alt')" />
    </button>
    <p class="emote-surprise__caption" aria-live="polite" aria-atomic="true">
      {{ isActive ? t('keola.more.egg_result') : t('keola.more.egg_hint') }}
    </p>
    <div
      v-if="isActive && reducedMotion"
      class="emote-surprise__still"
      aria-hidden="true">
      <Image
        src="/images/emotes/keolaCandy.png"
        :alt="t('keola.more.egg_candy_alt')"
        loading="eager" />
      <Image
        src="/images/emotes/keolaHeart.png"
        :alt="t('keola.more.egg_heart_alt')"
        loading="eager" />
    </div>

    <Teleport to="body">
      <div v-if="emotes.length" class="emote-surprise__rain" aria-hidden="true">
        <span
          v-for="emote in emotes"
          :key="emote.id"
          class="emote-surprise__drop"
          :style="emote.style">
          <Image :src="emote.src" :alt="emote.alt" loading="eager" />
        </span>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

type Emote = {
  id: number
  src: string
  alt: string
  style: CSSProperties
}

const { t } = useI18n()

const emotes = ref<Emote[]>([])
const isActive = ref(false)
const reducedMotion = ref(false)

let clearSurpriseTimer: ReturnType<typeof setTimeout> | undefined

function releaseEmotes() {
  if (isActive.value) {
    return
  }

  isActive.value = true
  reducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!reducedMotion.value) {
    const count = window.innerWidth < 720 ? 150 : 600

    emotes.value = Array.from({ length: count }, (_, id) => ({
      id,
      src:
        id % 2 === 0
          ? '/images/emotes/keolaCandy.png'
          : '/images/emotes/keolaHeart.png',
      alt:
        id % 2 === 0
          ? t('keola.more.egg_candy_alt')
          : t('keola.more.egg_heart_alt'),
      style: {
        left: `${Math.random() * 100}%`,
        width: `${30 + Math.random() * 30}px`,
        animationDelay: `${Math.random() * 1.7}s`,
        animationDuration: `${3.2 + Math.random() * 1.8}s`,
        '--drift': `${Math.random() * 120 - 60}px`,
        '--spin': `${Math.random() * 540 - 270}deg`,
      } as CSSProperties,
    }))
  }

  clearSurpriseTimer = setTimeout(
    () => {
      emotes.value = []
      isActive.value = false
      clearSurpriseTimer = undefined
    },
    reducedMotion.value ? 2500 : 7000
  )
}

onUnmounted(() => {
  if (clearSurpriseTimer) {
    clearTimeout(clearSurpriseTimer)
  }
})
</script>

<style lang="scss" scoped>
.emote-surprise {
  display: grid;
  justify-items: center;
  gap: $space-10;
  padding-top: $space-40;
  text-align: center;

  &__trigger {
    display: block;
    width: clamp(52px, 16vw, 72px);
    aspect-ratio: 1;
    padding: 0;
    overflow: hidden;
    border: 2px solid $plum;
    border-radius: $radius-art;
    background: $paper;
    box-shadow: 4px 4px 0 $orange-pale;
    cursor: pointer;
    transition:
      transform $transition-ui,
      box-shadow $transition-ui;
  }

  &__trigger :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__caption {
    margin: 0;
    color: $plum;
    font-family: $display;
    font-size: $font-size-secondary;
    font-weight: $weight-bold;
  }

  &__still {
    display: flex;
    gap: $space-10;
  }

  &__still :deep(img) {
    width: 48px;
    height: 48px;
  }

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    &__trigger:hover {
      transform: rotate(-5deg) translateY(-3px);
      box-shadow: 6px 7px 0 $orange-pale;
    }
  }
}

.emote-surprise__rain {
  position: fixed;
  z-index: $z-skip-link - 1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.emote-surprise__drop {
  position: absolute;
  top: 0;
  display: block;
  aspect-ratio: 1;
  opacity: 0;
  animation-name: emote-fall;
  animation-timing-function: linear;
  animation-fill-mode: both;
}

.emote-surprise__drop :deep(img) {
  width: 100%;
  height: 100%;
}

@keyframes emote-fall {
  0% {
    opacity: 0;
    transform: translate3d(0, -80px, 0) rotate(0);
  }
  8% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(var(--drift), calc(100dvh + 80px), 0)
      rotate(var(--spin));
  }
}

@media (prefers-reduced-motion: reduce) {
  .emote-surprise__trigger {
    transition: none;
  }
  .emote-surprise__drop {
    display: none;
    animation: none;
  }
}
</style>
