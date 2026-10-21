<template>
  <main id="main-content" class="nyuh-page" tabindex="-1">
    <h1 class="nyuh-page__title">{{ t('nyuh.heading') }}</h1>

    <div class="nyuh-page__stage">
      <button
        ref="card"
        class="nyuh-page__card"
        :class="{
          'nyuh-page__card--moving': isMoving,
          'nyuh-page__card--patted': isPatted,
        }"
        type="button"
        :aria-label="`${t('nyuh.pat')}. ${t('nyuh.image_alt')}`"
        @pointermove="onPointerMove"
        @pointerleave="onPointerLeave"
        @touchstart.passive="onTouchMove"
        @touchmove.passive="onTouchMove"
        @touchend="resetTilt"
        @touchcancel="resetTilt"
        @blur="resetTilt"
        @click="pat">
        <Image
          class="nyuh-page__image"
          src="/images/misc/Keola_license.webp"
          :alt="t('nyuh.image_alt')"
          :skeleton="false"
          loading="eager"
          fetchpriority="high"
          draggable="false" />
      </button>
    </div>

    <p class="nyuh-page__hint" aria-live="polite">
      {{ isPatted ? t('nyuh.patted') : t('nyuh.hint') }}
    </p>
  </main>
</template>

<script setup lang="ts">
import { imageDimensions } from '~/data/imageDimensions'
import { robotsContent } from '~/data/seo'
import { siteName } from '~/data/site'

definePageMeta({ layout: false })

const { t } = useI18n()

const localePath = useLocalePath()
const site = useSiteConfig()

const card = ref<HTMLElement | null>(null)
const isMoving = ref(false)
const isPatted = ref(false)

const imagePath = '/images/misc/Keola_license.webp'
const [imageWidth, imageHeight] = imageDimensions[imagePath]!
const title = computed(() => t('nyuh.title'))
const description = computed(() => t('nyuh.description'))

let motionPreference: MediaQueryList | undefined
let frame = 0
let patTimer: ReturnType<typeof setTimeout> | undefined

function resetTilt() {
  cancelAnimationFrame(frame)

  isMoving.value = false

  card.value?.style.removeProperty('--tilt-x')
  card.value?.style.removeProperty('--tilt-y')
  card.value?.style.removeProperty('--light-x')
  card.value?.style.removeProperty('--light-y')
  card.value?.style.removeProperty('--shadow-x')
  card.value?.style.removeProperty('--image-x')
  card.value?.style.removeProperty('--image-y')
}

function moveTilt(clientX: number, clientY: number) {
  if (motionPreference?.matches || !card.value) {
    return
  }

  const bounds = card.value.getBoundingClientRect()

  const x = Math.max(
    -1,
    Math.min(1, ((clientX - bounds.left) / bounds.width - 0.5) * 2)
  )
  const y = Math.max(
    -1,
    Math.min(1, ((clientY - bounds.top) / bounds.height - 0.5) * 2)
  )

  isMoving.value = true

  cancelAnimationFrame(frame)

  frame = requestAnimationFrame(() => {
    card.value?.style.setProperty('--tilt-x', `${-y * 7}deg`)
    card.value?.style.setProperty('--tilt-y', `${x * 9}deg`)
    card.value?.style.setProperty('--light-x', `${50 + x * 35}%`)
    card.value?.style.setProperty('--light-y', `${50 + y * 35}%`)
    card.value?.style.setProperty('--shadow-x', `${-x * 18}px`)
    card.value?.style.setProperty('--image-x', `${-x * 3}px`)
    card.value?.style.setProperty('--image-y', `${-y * 3}px`)
  })
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'touch') {
    moveTilt(event.clientX, event.clientY)
  }
}

function onPointerLeave(event: PointerEvent) {
  if (event.pointerType !== 'touch') {
    resetTilt()
  }
}

function onTouchMove(event: TouchEvent) {
  const touch = event.touches[0]

  if (touch) {
    moveTilt(touch.clientX, touch.clientY)
  }
}

function pat() {
  isPatted.value = true

  clearTimeout(patTimer)

  patTimer = setTimeout(() => {
    isPatted.value = false
  }, 1400)
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', resetTilt)
})

onBeforeUnmount(() => {
  resetTilt()
  motionPreference?.removeEventListener('change', resetTilt)
  clearTimeout(patTimer)
})

useSeoMeta({
  robots: robotsContent.blocked,
  description,
  ogTitle: title,
  ogDescription: description,
  ogSiteName: siteName,
  ogType: 'website',
  ogUrl: () => new URL(localePath('/nyuh'), site.url).href,
  ogImage: () => new URL(imagePath, site.url).href,
  ogImageAlt: () => t('nyuh.image_alt'),
  ogImageWidth: imageWidth,
  ogImageHeight: imageHeight,
  ogImageType: 'image/webp',
})
useHead(() => ({ title: title.value, titleTemplate: '%s' }))
</script>

<style lang="scss" scoped>
.nyuh-page {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  place-items: center;
  gap: $space-20;
  min-height: 100svh;
  min-height: 100dvh;
  padding: max($space-24, env(safe-area-inset-top))
    max($space-16, env(safe-area-inset-right))
    max($space-24, env(safe-area-inset-bottom))
    max($space-16, env(safe-area-inset-left));
  background:
    radial-gradient(ellipse at 50% 49%, #65425c 0, transparent 63%),
    radial-gradient(circle at 12% 12%, #55394f 0, transparent 30%), $plum-deep;
  color: #fff4e7;
  text-align: center;

  &__title {
    margin: 0;
    color: $eyebrow-light-text;
    font-family: $signature;
    font-size: clamp(1.35rem, 3.5vw, 2rem);
    font-weight: $weight-regular;
    letter-spacing: 0.02em;
  }

  &__stage {
    display: grid;
    place-items: center;
    width: 100%;
    perspective: 1100px;
  }

  &__card {
    --tilt-x: 0deg;
    --tilt-y: 0deg;
    --light-x: 50%;
    --light-y: 50%;
    --shadow-x: 0px;
    --image-x: 0px;
    --image-y: 0px;
    position: relative;
    display: block;
    width: min(91vw, 900px, 102dvh);
    aspect-ratio: 3231 / 1894;
    padding: 0;
    overflow: hidden;
    border: 0;
    border-radius: 8% / 13%;
    background: #e59751;
    box-shadow:
      var(--shadow-x) 28px 48px #130d1b8c,
      0 0 0 1px #ffdcba4d;
    cursor: pointer;
    transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
    transform-style: preserve-3d;
    transition:
      transform 480ms cubic-bezier(0.2, 0.8, 0.2, 1),
      box-shadow 480ms ease;

    &::after {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        circle at var(--light-x) var(--light-y),
        #fff9e745,
        transparent 48%
      );
      content: '';
      pointer-events: none;
    }

    &--moving {
      transition-duration: 70ms;

      .nyuh-page__image {
        transition-duration: 70ms;
      }
    }

    &--patted {
      box-shadow:
        var(--shadow-x) 28px 48px #130d1b8c,
        0 0 0 4px $eyebrow-light-text,
        0 0 54px rgba($eyebrow-light-text, 0.5);
    }
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    transform: translate(var(--image-x), var(--image-y)) scale(1.025);
    transition: transform 480ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &__hint {
    max-width: 34ch;
    min-height: 1.6em;
    margin: 0;
    color: #fff4e7;
    font-size: $font-size-secondary;
    font-weight: $weight-semibold;
    line-height: 1.6;
  }
}

@media (max-height: 450px) {
  .nyuh-page {
    gap: $space-8;
    padding-block: max($space-8, env(safe-area-inset-top))
      max($space-8, env(safe-area-inset-bottom));
  }

  .nyuh-page {
    &__card {
      width: min(84vw, 72dvh);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .nyuh-page {
    &__card {
      transform: none;
      transition: none;
    }

    &__image {
      transform: none;
      transition: none;
    }
  }
}
</style>
