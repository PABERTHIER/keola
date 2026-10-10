<template>
  <section
    id="community"
    class="section community-section"
    aria-labelledby="community-title">
    <div class="shell community-section__grid">
      <div class="community-section__intro">
        <span class="eyebrow">
          {{ t('components.home_community.eyebrow') }}
        </span>
        <h2 id="community-title" ref="communityTitle" class="section-title">
          {{ t('components.home_community.title') }}
        </h2>
        <Image
          class="community-section__character"
          src="/images/keola/Keola_left_side_inclined_v1.webp"
          :alt="t('components.home_community.art_alt')"
          :style="{ height: `${characterHeight}px` }" />
        <p class="section-lead">{{ t('components.home_community.text') }}</p>
      </div>
      <div class="community-links">
        <a
          v-for="link in featuredSocialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer">
          <Icon
            :name="link.icon"
            mode="svg"
            class="social-icon"
            :style="{ color: link.color }"
            :size="26"
            aria-hidden="true" />
          <span class="community-links__copy">
            <strong>{{ link.name }}</strong>
            <small>{{ t(`social.${link.detail}`) }}</small>
          </span>
          <Icon
            class="community-links__arrow"
            name="lucide:arrow-up-right"
            size="20"
            aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { featuredSocialLinks } from '~/data/site'

const { t } = useI18n()
const communityTitle = ref<HTMLElement | null>(null)
const characterHeight = ref(36)
let titleObserver: ResizeObserver | undefined

onMounted(() => {
  if (!communityTitle.value) return

  const updateCharacterHeight = () => {
    if (!communityTitle.value) return
    const titleHeight = communityTitle.value.getBoundingClientRect().height
    const lineHeight = Number.parseFloat(
      window.getComputedStyle(communityTitle.value).lineHeight
    )
    const lineCount = lineHeight > 0 ? Math.round(titleHeight / lineHeight) : 1
    const scale = lineCount >= 4 ? 0.9 : 0.82
    const maxHeight = lineCount >= 4 ? 180 : 160

    characterHeight.value = Math.min(
      Math.max(40, titleHeight * scale),
      maxHeight
    )
  }

  updateCharacterHeight()
  titleObserver = new ResizeObserver(updateCharacterHeight)
  titleObserver.observe(communityTitle.value)
})

onBeforeUnmount(() => titleObserver?.disconnect())
</script>

<style lang="scss" scoped>
.community-section__character {
  grid-column: 1;
  grid-row: 2;
  width: auto;
  max-width: 120px;
  justify-self: start;
  object-fit: contain;
}

.community-section__intro {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: $space-12;
}

.community-section__intro > .section-title {
  grid-column: 2;
  grid-row: 2;
}

.community-section__intro > .eyebrow,
.community-section__intro > .section-lead {
  grid-column: 1 / -1;
}

.community-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: $space-110;
  overflow-wrap: anywhere;
}

.community-links {
  border-top: $border-width solid $line;

  a {
    display: flex;
    align-items: center;
    gap: $space-19;
    min-height: 82px;
    padding: $space-12 $space-7;
    border-bottom: $border-width solid $line;
    transition:
      padding $transition-ui,
      background-color $transition-ui;
  }

  a:hover {
    padding-left: $space-16;
    background: $community-background;
  }

  .social-icon {
    flex: 0 0 $control-size;
    width: $control-size;
    height: $control-size;
    padding: $space-9;
    border-radius: $radius-control;
    background: $plum-deep;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  strong {
    font-family: $display;
    font-size: 1.25rem;
    font-weight: $weight-semibold;
    line-height: 1.2;
  }

  small {
    color: $muted;
    font-size: $font-size-small;
  }

  &__arrow {
    flex: none;
    width: 20px;
    height: 20px;
  }
}

@media (max-width: $breakpoint-desktop) {
  .community-section__grid {
    gap: $space-60;
  }
}

@media (max-width: $breakpoint-tablet) {
  .community-section__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: $space-40;
  }
}

@media (max-width: $breakpoint-mobile) {
  .community-section__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: $space-33;
  }

  .community-section__intro > .eyebrow {
    justify-content: center;
  }

  .community-section__intro > .section-title {
    text-align: center;
  }
}

@media (max-width: $breakpoint-small) {
  .community-section__intro {
    grid-template-columns: minmax(0, 1fr);
  }

  .community-section__intro > .section-title {
    grid-column: 1;
  }

  .community-section__character {
    grid-column: 1;
    grid-row: 3;
  }
}
</style>
