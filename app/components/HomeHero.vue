<template>
  <section
    class="hero"
    :class="{ 'hero--offscreen': !heroInView }"
    aria-labelledby="hero-title">
    <div class="shell hero__inner">
      <div class="hero__content">
        <span class="eyebrow eyebrow--light">
          <span class="eyebrow__mark" aria-hidden="true" />
          {{ t('components.home_hero.eyebrow') }}
        </span>
        <h1 id="hero-title">
          <span class="hero__name">{{ t('components.home_hero.name') }}</span>
          <span>{{ t('components.home_hero.surname') }}</span>
        </h1>
        <p class="hero__lead">
          {{ t('components.home_hero.text') }}
          <span class="hero__welcome">
            {{ t('components.home_hero.welcome') }}
          </span>
        </p>
        <div class="hero__actions">
          <a
            class="button button--primary"
            :href="externalLinks.twitch"
            target="_blank"
            rel="noopener noreferrer">
            <Icon
              name="keo-icon:twitch-logo"
              mode="svg"
              size="20"
              aria-hidden="true" />
            {{ t('site.watch') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
          <NuxtLink
            class="button button--light-outline"
            :to="localePath({ path: '/', hash: '#about' })">
            {{ t('components.home_hero.discover') }}
            <Icon name="lucide:arrow-down-right" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
      <div
        ref="heroVisual"
        class="hero__visual"
        role="group"
        :aria-label="t('components.home_hero.slideshow')"
        @pointerenter="handlePointerEnter"
        @pointerleave="hovered = false"
        @pointerdown="handlePointerDown"
        @focusin="handleFocusIn"
        @focusout="handleFocusOut">
        <Transition name="hero-slide">
          <Image
            :key="activeSlide"
            :src="`/images/slideshows/slideshow-${slides[activeSlide]}.webp`"
            :alt="t(`components.home_hero.alts.${slides[activeSlide]}`)"
            loading="eager"
            :fetchpriority="activeSlide === 0 ? 'high' : 'auto'" />
        </Transition>
        <div class="hero__carousel-controls">
          <button
            class="icon-button"
            type="button"
            :aria-label="t('components.home_hero.previous')"
            :data-tooltip="t('components.home_hero.previous')"
            @click="moveSlide(-1)">
            <Icon name="lucide:chevron-left" aria-hidden="true" />
          </button>
          <span class="hero__slide-count" aria-live="off">
            <span aria-hidden="true">
              {{ activeSlide + 1 }} / {{ slides.length }}
            </span>
            <span class="sr-only">
              {{
                t('components.home_hero.count', {
                  number: activeSlide + 1,
                  total: slides.length,
                })
              }}
            </span>
          </span>
          <button
            class="icon-button"
            type="button"
            :aria-label="t('components.home_hero.next')"
            :data-tooltip="t('components.home_hero.next')"
            @click="moveSlide(1)">
            <Icon name="lucide:chevron-right" aria-hidden="true" />
          </button>
          <button
            class="icon-button"
            type="button"
            :aria-label="
              t(
                autoplayPaused
                  ? 'components.home_hero.play'
                  : 'components.home_hero.pause'
              )
            "
            :data-tooltip="
              t(
                autoplayPaused
                  ? 'components.home_hero.play'
                  : 'components.home_hero.pause'
              )
            "
            :disabled="reducedMotion"
            @click="togglePlayback">
            <Icon
              :name="autoplayPaused ? 'lucide:play' : 'lucide:pause'"
              aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const
const activeSlide = ref(0)
const playback = ref<'auto' | 'paused' | 'playing'>('auto')
const reducedMotion = ref(false)
const hovered = ref(false)
const focused = ref(false)
const pageHidden = ref(false)
const heroInView = ref(true)
const heroVisual = ref<HTMLElement | null>(null)

const autoplayPaused = computed(
  () =>
    playback.value === 'paused' ||
    reducedMotion.value ||
    (playback.value === 'auto' && (hovered.value || focused.value))
)
const canAutoplay = computed(
  () => !autoplayPaused.value && !pageHidden.value && heroInView.value
)
const preloads = new Map<number, Promise<void>>()

let timer: ReturnType<typeof setTimeout> | undefined
let motionPreference: MediaQueryList | undefined
let visibilityObserver: IntersectionObserver | undefined

let mounted = false
let slideRequest = 0
let autoplayRequest = 0
let touchInteraction = false

function preloadSlide(index: number) {
  const cached = preloads.get(index)

  if (cached) {
    return cached
  }

  const image = new window.Image()
  image.src = `/images/slideshows/slideshow-${slides[index]}.webp`

  const decoded = image.decode().catch(error => {
    preloads.delete(index)
    throw error
  })

  preloads.set(index, decoded)

  return decoded
}

function preloadNextSlide() {
  void preloadSlide((activeSlide.value + 1) % slides.length).catch(
    () => undefined
  )
}

function scheduleNextSlide() {
  clearTimeout(timer)

  if (!mounted || !canAutoplay.value) {
    return
  }

  timer = setTimeout(() => {
    void selectSlide((activeSlide.value + 1) % slides.length, true)
  }, 4000)
}

async function selectSlide(index: number, automatic = false) {
  clearTimeout(timer)

  const request = ++slideRequest
  const autoplayAtStart = autoplayRequest

  try {
    await preloadSlide(index)
  } catch {
    if (
      request === slideRequest &&
      (!automatic || autoplayAtStart === autoplayRequest)
    ) {
      scheduleNextSlide()
    }
    return
  }

  if (
    !mounted ||
    request !== slideRequest ||
    (automatic && autoplayAtStart !== autoplayRequest)
  ) {
    return
  }

  activeSlide.value = index

  if (canAutoplay.value) {
    preloadNextSlide()
  }

  scheduleNextSlide()
}

function moveSlide(direction: -1 | 1) {
  void selectSlide(
    (activeSlide.value + direction + slides.length) % slides.length
  )
}

function togglePlayback() {
  if (autoplayPaused.value) {
    playback.value = 'playing'
    preloadNextSlide()
  } else {
    playback.value = 'paused'
    slideRequest++
  }
}

function handlePointerEnter(event: PointerEvent) {
  hovered.value = event.pointerType === 'mouse'
}

function handlePointerDown(event: PointerEvent) {
  touchInteraction = event.pointerType === 'touch'

  if (touchInteraction) {
    hovered.value = false
    focused.value = false
  }
}

function resetTouchInteraction() {
  touchInteraction = false
}

function handleFocusIn(event: FocusEvent) {
  focused.value =
    !touchInteraction &&
    event.target instanceof HTMLElement &&
    event.target.matches(':focus-visible')
}

function handleFocusOut(event: FocusEvent) {
  const next = event.relatedTarget
  const staysInside =
    next instanceof HTMLElement &&
    (event.currentTarget as HTMLElement).contains(next)

  focused.value =
    !touchInteraction && staysInside && next.matches(':focus-visible')

  if (!staysInside) {
    touchInteraction = false
  }
}

function updateMotionPreference() {
  reducedMotion.value = motionPreference?.matches ?? false
}

function updateVisibility() {
  pageHidden.value = document.hidden
}

watch(
  canAutoplay,
  playing => {
    if (!playing) {
      autoplayRequest++
    }

    scheduleNextSlide()
  },
  { flush: 'sync' }
)

onMounted(() => {
  mounted = true
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotionPreference()
  updateVisibility()
  motionPreference.addEventListener('change', updateMotionPreference)
  document.addEventListener('visibilitychange', updateVisibility)
  document.addEventListener('keydown', resetTouchInteraction)

  if ('IntersectionObserver' in window && heroVisual.value) {
    const bounds = heroVisual.value.getBoundingClientRect()
    heroInView.value = bounds.top < window.innerHeight && bounds.bottom > 0

    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView.value = entry?.isIntersecting ?? true
      },
      { threshold: 0.1 }
    )

    visibilityObserver.observe(heroVisual.value)
  }

  if (canAutoplay.value) {
    preloadNextSlide()
  }

  scheduleNextSlide()
})

onBeforeUnmount(() => {
  mounted = false
  slideRequest++
  clearTimeout(timer)
  visibilityObserver?.disconnect()
  motionPreference?.removeEventListener('change', updateMotionPreference)
  document.removeEventListener('visibilitychange', updateVisibility)
  document.removeEventListener('keydown', resetTouchInteraction)
})
</script>

<style lang="scss" scoped>
.hero {
  --focus-color: #{$orange};
  isolation: isolate;
  overflow: hidden;
  background: $plum;
  color: $white-pure;

  &__inner {
    min-height: clamp(560px, 72svh, 650px);
    display: grid;
    grid-template-columns: 55% 45%;
  }

  &__content {
    min-width: 0;
    align-self: center;
    position: relative;
    z-index: $z-content;
    padding: $space-38 $space-32 $space-42 0;
  }

  h1 {
    position: relative;
  }

  h1::before,
  h1::after,
  &__name::before,
  &__name::after {
    content: '';
    position: absolute;
    pointer-events: none;
    background: $hero-accent;
    clip-path: polygon(
      50% 0,
      59% 41%,
      100% 50%,
      59% 59%,
      50% 100%,
      41% 59%,
      0 50%,
      41% 41%
    );
  }

  h1::before {
    top: 0.12em;
    left: min(3.25em, calc(100% - 14px));
    width: 14px;
    height: 14px;
    opacity: 0.55;
  }

  h1::after {
    top: 0.52em;
    left: min(3.7em, calc(100% - 7px));
    width: 7px;
    height: 7px;
    opacity: 0.35;
  }

  h1 {
    margin: 27px 0 $space-22;
    font-family: $signature;
    font-size: 6rem;
    font-weight: $weight-regular;
    line-height: 1.08;
    overflow-wrap: anywhere;
  }

  h1 span {
    display: block;
    color: $hero-accent;
  }

  h1 .hero__name {
    position: relative;
    color: inherit;
  }

  &__name::before,
  &__name::after {
    display: none;
  }

  &__lead {
    max-width: 500px;
    margin-bottom: 31px;
    color: $hero-text;
    font-size: 1.13rem;
    line-height: $line-height-copy;
  }

  &__welcome {
    display: block;
    margin-top: $space-8;
    font-family: $display;
    font-weight: $weight-bold;
    color: $white-pure;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-11;
  }

  &__visual {
    position: relative;
    min-height: 100%;
    margin-right: calc(
      (min(100vw - $shell-gutter * 2, $shell-max-width) - 100vw) / 2
    );
    overflow: hidden;
  }

  &__visual img {
    position: absolute;
    inset: 0 0 0 auto;
    width: min(100%, 800px);
    height: 100%;
    object-fit: cover;
    object-position: center 16%;
  }

  &__carousel-controls {
    position: absolute;
    right: $space-20;
    bottom: $space-10;
    z-index: $z-content;
    display: flex;
    align-items: center;
    gap: $space-6;
    padding: $space-10;
    border-radius: $radius-control;
    background: $plum-deep;
    transform: translateY(calc(0px - var(--hero-control-lift, 0px)));

    .icon-button {
      color: $white-pure;
      border-color: $lightbox-border;
    }
    .icon-button:disabled {
      opacity: 0.5;
    }
  }

  &__slide-count {
    min-width: 48px;
    text-align: center;
    font-size: $font-size-label;
    font-variant-numeric: tabular-nums;
  }
}

.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: opacity 550ms ease;
}

.hero-slide-enter-active {
  z-index: 1;
}

.hero-slide-enter-from {
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .hero h1::before,
  .hero h1::after,
  .hero__name::before,
  .hero__name::after {
    animation: hero-sparkle 5s ease-in-out infinite;
  }

  .hero h1::after,
  .hero__name::after {
    animation-delay: -2.5s;
  }

  .hero--offscreen h1::before,
  .hero--offscreen h1::after,
  .hero--offscreen .hero__name::before,
  .hero--offscreen .hero__name::after {
    animation-play-state: paused;
  }
}

@keyframes hero-sparkle {
  0% {
    opacity: 0.35;
    transform: scale(0.85) rotate(-8deg);
  }
  12% {
    opacity: 0.9;
    transform: scale(1.2) rotate(8deg);
  }
  28%,
  100% {
    opacity: 0.35;
    transform: scale(0.85) rotate(-8deg);
  }
}

@media (max-width: $breakpoint-desktop) {
  .hero h1 {
    font-size: 4.9rem;
  }
}

@media (max-width: $breakpoint-tablet) {
  .hero__visual {
    margin-right: -$shell-gutter-tablet;
  }

  .hero h1 {
    font-size: 4.3rem;
  }

  .hero__inner {
    min-height: clamp(520px, 72svh, 650px);
  }
}

@media (max-width: $breakpoint-mobile) {
  .hero__inner {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 0;
  }

  .hero__content {
    align-self: stretch;
    padding: 43px 0 29px;
    text-align: center;
  }

  .hero h1 {
    margin: $space-17 0 $space-15;
    font-size: 3.65rem;
  }

  .hero h1::before,
  .hero h1::after {
    display: none;
  }

  .hero__name {
    width: fit-content;
    max-width: 100%;
    margin-inline: auto;
    padding-right: $control-size;
  }

  .hero__name::before {
    display: block;
    top: 0.12em;
    right: $space-8;
    width: 14px;
    height: 14px;
    opacity: 0.55;
  }

  .hero__name::after {
    display: block;
    top: 0.52em;
    right: 0px;
    width: 7px;
    height: 7px;
    opacity: 0.35;
  }

  .hero__lead {
    max-width: 550px;
    margin-inline: auto;
    margin-bottom: $space-22;
    font-size: $font-size-intro-mobile;
    line-height: $line-height-compact;
  }

  .hero__actions {
    justify-content: center;
    gap: $space-8;
  }

  .hero__actions .button {
    min-height: $control-size;
    padding: $space-9 $space-12;
    font-size: $font-size-action-small;
  }

  .hero__visual {
    --hero-art-height: clamp(300px, 85vw, 480px);
    display: grid;
    grid-template-rows: var(--hero-art-height) auto;
    justify-items: center;
    gap: $space-12;
    height: auto;
    min-height: 0;
    padding-bottom: $space-16;
    margin-left: -$shell-gutter-mobile;
    margin-right: -$shell-gutter-mobile;
  }

  .hero__visual img {
    right: auto;
    left: 50%;
    width: min(calc(100% - #{$shell-gutter-mobile * 2}), 520px);
    height: var(--hero-art-height);
    object-position: center 19%;
    border-radius: $radius-art;
    transform: translateX(-50%);
  }

  .hero__carousel-controls {
    position: static;
    grid-row: 2;
    flex-wrap: wrap;
    justify-content: center;
    max-width: calc(100% - #{$shell-gutter-mobile * 2});
    transform: none;
  }
}

@media (max-width: $breakpoint-small) {
  .hero h1 {
    font-size: 3rem;
  }

  .hero__actions .button {
    max-width: 100%;
  }
}

@media (max-width: $breakpoint-compact) and (max-height: $breakpoint-short-height) {
  .hero__content {
    padding: $space-24 0 $space-12;
  }

  .hero h1 {
    margin: $space-9 0 $space-8;
    font-size: 2.85rem;
  }

  .hero__lead {
    margin-bottom: $space-13;
    line-height: 1.45;
  }
}
</style>
