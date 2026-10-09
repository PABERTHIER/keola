<template>
  <main id="main-content" tabindex="-1">
    <PageIntro
      :eyebrow="t('gallery.eyebrow')"
      :title="t('gallery.title')"
      :intro="t('gallery.intro')" />
    <section class="gallery-page shell" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" class="sr-only">{{ t('site.gallery') }}</h2>
      <div ref="galleryWall" class="gallery-wall">
        <GalleryArtwork
          v-for="(number, index) in fanartNumbers"
          :key="number"
          :number="number"
          :revealed="!revealEnabled || revealedNumbers.has(number)"
          :intro="introNumbers.has(number)"
          @open="openArtwork(index, $event)" />
      </div>
      <p class="gallery-page__note">{{ t('gallery.credit_note') }}</p>
    </section>

    <ArtworkLightbox
      ref="viewer"
      :artworks="artworks"
      :label="t('site.gallery')" />
  </main>
</template>

<script setup lang="ts">
import { fanartNumbers } from '~/data/site'

const { t } = useI18n()

const viewer = ref<{
  open: (index: number, trigger?: HTMLElement) => void
} | null>(null)
const galleryWall = ref<HTMLElement | null>(null)
const revealEnabled = ref(false)

const revealedNumbers = shallowRef(new Set<number>())
const introNumbers = shallowRef(new Set<number>())

let revealObserver: IntersectionObserver | null = null

const artworks = computed(() =>
  fanartNumbers.map(number => ({
    src: `/images/fanarts/fanart-${number}.webp`,
    alt: t('gallery.image_alt', {
      number,
      description: t(`gallery.image_descriptions.${number}`),
    }),
  }))
)

useHead(usePageSeo('gallery'))

onMounted(() => {
  if (
    !galleryWall.value ||
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  const alreadyVisible = new Set<number>()
  const intro = new Set<number>()
  const waiting: HTMLElement[] = []

  for (const item of galleryWall.value.querySelectorAll<HTMLElement>(
    '[data-gallery-number]'
  )) {
    const number = Number(item.dataset.galleryNumber)
    const bounds = item.getBoundingClientRect()

    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      alreadyVisible.add(number)
      intro.add(number)
    } else if (bounds.top < window.innerHeight) {
      alreadyVisible.add(number)
    } else {
      waiting.push(item)
    }
  }

  revealedNumbers.value = alreadyVisible
  introNumbers.value = intro
  revealEnabled.value = true

  revealObserver = new IntersectionObserver(
    entries => {
      const next = new Set(revealedNumbers.value)

      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue
        }

        next.add(Number((entry.target as HTMLElement).dataset.galleryNumber))
        revealObserver?.unobserve(entry.target)
      }

      if (next.size !== revealedNumbers.value.size) {
        revealedNumbers.value = next
      }
    },
    { rootMargin: '0px 0px 40px 0px', threshold: 0.01 }
  )

  for (const item of waiting) {
    revealObserver.observe(item)
  }
})

onBeforeUnmount(() => revealObserver?.disconnect())

function openArtwork(index: number, event: MouseEvent) {
  viewer.value?.open(index, event.currentTarget as HTMLElement)
}
</script>

<style lang="scss" scoped>
.gallery-page {
  padding-block: 65px $space-100;
}

.gallery-wall {
  columns: $gallery-column-width 4;
  column-gap: $space-13;
}

.gallery-page__note {
  max-width: 650px;
  margin: 35px 0 0;
  color: $muted;
  font-size: $font-size-note;
}

@media (max-width: $breakpoint-mobile) {
  .gallery-page {
    padding-block: $space-38 $space-70;
  }

  .gallery-wall {
    column-gap: $space-9;
  }
}
</style>
