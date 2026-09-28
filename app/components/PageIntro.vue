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
  padding: 44px 0 75px;
  border-bottom: 1px solid $line;

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
    align-items: center;
    gap: 8px;
    margin-bottom: 47px;
    font-size: 0.82rem;
    font-weight: 700;
  }
  &__back:hover {
    color: #a64d10;
  }
  h1 {
    max-width: 950px;
    margin: 17px 0 20px;
    font-size: 3.8rem;
    overflow-wrap: anywhere;
  }
  p {
    max-width: 660px;
    margin: 0;
    color: $muted;
    font-size: 1.05rem;
    line-height: 1.75;
  }
}

@media (max-width: 720px) {
  .page-intro {
    padding: 24px 0 55px;
  }
  .page-intro__back {
    margin-bottom: 38px;
  }
  .page-intro h1 {
    font-size: 2.5rem;
  }
  .page-intro p {
    font-size: 0.94rem;
  }
}

@media (max-width: 420px) {
  .page-intro h1 {
    font-size: 2.15rem;
  }
}
</style>
