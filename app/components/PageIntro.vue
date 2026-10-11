<template>
  <section
    class="page-intro"
    :class="`page-intro--${tone}`"
    aria-labelledby="page-title">
    <div class="shell page-intro__inner">
      <NuxtLink :to="localePath('/')" class="page-intro__back">
        <Icon name="lucide:arrow-left" aria-hidden="true" />
        {{ t('site.back_home') }}
      </NuxtLink>
      <span class="eyebrow">{{ eyebrow }}</span>
      <h1 id="page-title">{{ title }}</h1>
      <p>{{ intro }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    intro: string
    tone?: 'peach' | 'spirit'
  }>(),
  { tone: 'peach' }
)

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>
.page-intro {
  padding: 44px 0 $space-75;
  border-bottom: $border-width solid $line;

  &--peach {
    background: $peach;
  }

  &--spirit {
    background: $spirit;
  }

  &__inner {
    display: flex;
    align-items: start;
    flex-direction: column;
  }

  &__back {
    display: inline-flex;
    min-height: $control-size;
    align-items: center;
    gap: $space-8;
    margin-bottom: 47px;
    font-size: $font-size-note;
    font-weight: $weight-bold;
  }

  &__back:hover {
    color: $page-intro-eyebrow;
  }

  h1 {
    max-width: 950px;
    margin: $space-17 0 $space-20;
    font-size: 3.8rem;
    overflow-wrap: anywhere;
  }

  p {
    max-width: 660px;
    margin: 0;
    color: $muted;
    font-size: 1.05rem;
    line-height: $line-height-copy;
  }
}

@media (max-width: $breakpoint-mobile) {
  .page-intro {
    padding: $space-24 0 $space-55;
  }

  .page-intro__inner {
    align-items: center;
    text-align: center;
  }

  .page-intro__back {
    align-self: flex-start;
    margin-bottom: $space-38;
  }

  .page-intro h1 {
    font-size: 2.5rem;
  }

  .page-intro p {
    font-size: $font-size-intro-mobile;
  }
}

@media (max-width: $breakpoint-small) {
  .page-intro h1 {
    font-size: 2.15rem;
  }
}
</style>
