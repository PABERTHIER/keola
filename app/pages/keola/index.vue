<template>
  <main id="main-content" class="keola-page">
    <section class="portrait-section" aria-labelledby="keola-title">
      <div class="shell portrait-section__grid">
        <div class="portrait-section__copy">
          <span class="eyebrow">{{ t('keola.eyebrow') }}</span>
          <h1 id="keola-title">{{ t('keola.title') }}</h1>
          <p class="portrait-section__welcome">
            <span>{{ t('keola.welcome') }}</span>
            <Image
              src="/images/misc/Esprit_violet.webp"
              alt=""
              class="portrait-section__spirit" />
          </p>
          <p class="section-lead">{{ t('keola.intro') }}</p>
          <a
            class="button button--primary"
            :href="externalLinks.twitch"
            target="_blank"
            rel="noopener noreferrer">
            <Icon name="lucide:radio" aria-hidden="true" />
            {{ t('site.watch') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <figure class="portrait-section__art">
          <Image
            src="/images/models/Keola_v3_portrait.webp"
            :alt="t('keola.portrait_alt')"
            loading="eager"
            fetchpriority="high" />
          <figcaption>{{ t('keola.portrait_caption') }}</figcaption>
        </figure>
      </div>
    </section>

    <nav class="chapter-nav shell" :aria-label="t('keola.contents')">
      <NuxtLink
        v-for="section in sections"
        :key="section"
        :to="localePath({ path: '/keola', hash: `#${section}` })">
        {{ t(`keola.nav.${section}`) }}
        <Icon name="lucide:arrow-down" aria-hidden="true" />
      </NuxtLink>
    </nav>

    <section class="section profile-section" aria-labelledby="profile-title">
      <div class="shell">
        <span class="eyebrow">{{ t('keola.profile.eyebrow') }}</span>
        <h2 id="profile-title" class="section-title">
          {{ t('keola.profile.title') }}
        </h2>
        <div class="profile-section__topics">
          <div v-for="topic in profileTopics" :key="topic.id">
            <Icon :name="topic.icon" aria-hidden="true" />
            <h3>{{ t(`keola.profile.${topic.id}_title`) }}</h3>
            <p>{{ t(`keola.profile.${topic.id}_text`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section
      id="video"
      class="section video-section"
      aria-labelledby="video-title">
      <div class="shell">
        <div class="section-heading">
          <div>
            <span class="eyebrow">{{ t('keola.video.eyebrow') }}</span>
            <h2 id="video-title" class="section-title">
              {{ t('keola.video.title') }}
            </h2>
          </div>
          <a
            class="text-link"
            :href="externalLinks.presentationVideo"
            target="_blank"
            rel="noopener noreferrer">
            {{ t('keola.video.youtube') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <div class="video-section__player">
          <iframe
            :src="externalLinks.presentationEmbed"
            :title="t('keola.video.frame_title')"
            width="960"
            height="540"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowfullscreen />
        </div>
      </div>
    </section>

    <section
      id="lore"
      class="section lore-section"
      aria-labelledby="lore-title">
      <div class="shell">
        <header class="lore-section__heading">
          <span class="eyebrow">{{ t('keola.lore.eyebrow') }}</span>
          <h2 id="lore-title" class="section-title">
            {{ t('keola.lore.title') }}
          </h2>
          <p class="section-lead">{{ t('keola.lore.intro') }}</p>
        </header>
        <article class="lore-story" aria-labelledby="lore-title">
          <section
            v-for="(chapter, index) in loreChapters"
            :key="chapter.id"
            class="lore-story__chapter"
            :aria-labelledby="`lore-${chapter.id}`">
            <span class="lore-story__number" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 :id="`lore-${chapter.id}`">
                {{ t(`keola.lore.${chapter.id}.title`) }}
              </h3>
              <Image
                v-if="chapter.id === 'guardian'"
                class="lore-story__guardian-art"
                src="/images/keola/Keola_left_side_inclined_v2.webp"
                :alt="t('keola.lore.guardian_alt')" />
              <p v-for="paragraph in chapter.paragraphs" :key="paragraph">
                {{ t(`keola.lore.${chapter.id}.${paragraph}`) }}
              </p>
              <div
                v-if="chapter.id === 'streaming'"
                class="lore-story__stream-art">
                <Image
                  src="/images/keola/Keola_chibi_looking.webp"
                  :alt="t('keola.lore.chibi_alt')" />
                <Image
                  src="/images/keola/Keola_pirate_sat_heart_eyes.webp"
                  :alt="t('keola.lore.pirate_heart_eyes_alt')" />
              </div>
              <figure
                v-if="chapter.id === 'origin'"
                class="lore-story__spirits">
                <Image
                  src="/images/misc/Petits_esprits.webp"
                  :alt="t('keola.lore.spirits_alt')" />
                <figcaption>{{ t('keola.lore.spirits_caption') }}</figcaption>
              </figure>
            </div>
          </section>
        </article>
      </div>
    </section>

    <section
      id="beginnings"
      class="section debut-section"
      aria-labelledby="debut-title">
      <div class="shell debut-section__grid">
        <div>
          <span class="eyebrow">{{ t('keola.debut.eyebrow') }}</span>
          <h2 id="debut-title" class="section-title">
            {{ t('keola.debut.title') }}
          </h2>
          <p class="section-lead">{{ t('keola.debut.text') }}</p>
          <figure class="debut-section__teaser">
            <Image
              src="/images/debut/Keola_Debut.webp"
              :alt="t('keola.debut.teaser_alt')" />
            <figcaption>{{ t('keola.debut.teaser_caption') }}</figcaption>
          </figure>
          <div class="debut-section__actions">
            <NuxtLink
              class="button button--outline"
              :to="localePath('/archives')">
              {{ t('keola.debut.archives') }}
              <Icon name="lucide:arrow-right" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
        <figure class="debut-section__poster">
          <Image
            src="/images/debut/Keola_Schedule_debut.webp"
            :alt="t('keola.debut.alt')" />
          <figcaption>{{ t('keola.debut.caption') }}</figcaption>
        </figure>
      </div>
    </section>

    <section
      id="models"
      class="section models-section"
      aria-labelledby="models-title">
      <div class="shell">
        <span class="eyebrow">{{ t('keola.models.eyebrow') }}</span>
        <h2 id="models-title" class="section-title">
          {{ t('keola.models.title') }}
        </h2>
        <p class="section-lead">{{ t('keola.models.text') }}</p>
        <figure class="models-section__evolution">
          <Image :src="evolutionImage" :alt="t('keola.models.evolution_alt')" />
          <figcaption>{{ t('keola.models.evolution') }}</figcaption>
        </figure>
        <div class="models-section__gallery">
          <figure v-for="(model, index) in models" :key="model.id">
            <button
              class="models-section__art"
              type="button"
              :aria-label="
                t('keola.models.open_image', {
                  name: t(`keola.models.${model.id}`),
                })
              "
              @click="openModelArtwork(index, $event)">
              <Image
                :src="model.src"
                :alt="t(`keola.models.${model.id}_alt`)" />
              <Icon
                class="models-section__expand"
                name="lucide:expand"
                aria-hidden="true" />
            </button>
            <figcaption>{{ t(`keola.models.${model.id}`) }}</figcaption>
          </figure>
        </div>
        <div class="models-section__references">
          <h3>{{ t('keola.models.references_title') }}</h3>
          <p>{{ t('keola.models.references_intro') }}</p>
          <div class="models-section__reference-grid">
            <figure
              v-for="(reference, index) in modelReferences"
              :key="reference.id"
              :class="{
                'models-section__reference--wide': reference.id === 'sheet2026',
              }">
              <button
                type="button"
                :aria-label="
                  t('keola.models.open_image', {
                    name: t(`keola.models.${reference.id}`),
                  })
                "
                @click="openModelArtwork(index + models.length, $event)">
                <Image
                  :src="reference.src"
                  :alt="t(`keola.models.${reference.id}_alt`)" />
                <span>
                  {{ t('keola.models.open') }}
                  <Icon name="lucide:expand" aria-hidden="true" />
                </span>
              </button>
              <figcaption>{{ t(`keola.models.${reference.id}`) }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <ArtworkLightbox
      ref="modelViewer"
      :artworks="modelArtworks"
      :label="t('keola.models.title')" />

    <section
      id="more"
      class="section more-section"
      aria-labelledby="more-title">
      <div class="shell">
        <span class="eyebrow">{{ t('keola.more.eyebrow') }}</span>
        <h2 id="more-title" class="section-title">
          {{ t('keola.more.title') }}
        </h2>
        <div class="more-section__links">
          <a
            class="illustrated-link"
            :href="externalLinks.creatorCredits"
            target="_blank"
            rel="noopener noreferrer">
            <div class="illustrated-link__art">
              <Image src="/images/misc/Credits.webp" alt="" />
            </div>
            <div class="illustrated-link__copy">
              <h3>{{ t('keola.more.credits_title') }}</h3>
              <p>{{ t('keola.more.credits_text') }}</p>
              <span>
                {{ t('keola.more.credits_link') }}
                <Icon name="lucide:arrow-up-right" aria-hidden="true" />
              </span>
            </div>
          </a>
          <a
            class="illustrated-link"
            :href="externalLinks.facts"
            target="_blank"
            rel="noopener noreferrer">
            <div class="illustrated-link__art">
              <Image src="/images/misc/Facts.webp" alt="" />
            </div>
            <div class="illustrated-link__copy">
              <h3>{{ t('keola.more.facts_title') }}</h3>
              <p>{{ t('keola.more.facts_text') }}</p>
              <span>
                {{ t('keola.more.facts_link') }}
                <Icon name="lucide:arrow-up-right" aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>
        <div class="more-section__community">
          <p>{{ t('keola.more.community') }}</p>
          <a
            class="button button--dark"
            :href="externalLinks.discord"
            target="_blank"
            rel="noopener noreferrer">
            <Icon name="lucide:users-round" aria-hidden="true" />
            {{ t('home.about_link') }}
            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { externalLinks } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()
const sections = ['video', 'lore', 'beginnings', 'models', 'more'] as const
const profileTopics = [
  { id: 'games', icon: 'lucide:gamepad-2' },
  { id: 'expression', icon: 'lucide:messages-square' },
  { id: 'cause', icon: 'lucide:heart-handshake' },
] as const
const loreChapters = [
  { id: 'origin', paragraphs: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] },
  { id: 'inheritance', paragraphs: ['p1', 'p2', 'p3', 'p4', 'p5'] },
  { id: 'guardian', paragraphs: ['p1', 'p2', 'p3', 'p4', 'p5'] },
  { id: 'streaming', paragraphs: ['p1', 'p2', 'p3'] },
] as const
const models = [
  { id: 'v3', src: '/images/models/Keola_v3.webp' },
  { id: 'v4', src: '/images/models/Keola_v4.webp' },
  { id: 'recent', src: '/images/models/Keola_v5.webp' },
] as const
const evolutionImage = '/images/models/Keola_models_evolution.webp'
const modelReferences = [
  { id: 'sheet2025', src: '/images/models/Keola_Refsheet_2025.webp' },
  { id: 'referenceV5', src: '/images/models/Keola_Ref_model_v5.webp' },
  { id: 'sheet2026', src: '/images/models/Keola_Refsheet_2026.webp' },
] as const
const modelViewer = ref<{
  open: (index: number, trigger?: HTMLElement) => void
} | null>(null)
const modelArtworks = computed(() => [
  ...models.map(model => ({
    src: model.src,
    alt: t(`keola.models.${model.id}_alt`),
  })),
  ...modelReferences.map(reference => ({
    src: reference.src,
    alt: t(`keola.models.${reference.id}_alt`),
  })),
])

function openModelArtwork(index: number, event: MouseEvent) {
  modelViewer.value?.open(index, event.currentTarget as HTMLElement)
}

useHead(usePageSeo('keola'))
</script>

<style lang="scss" scoped>
.keola-page {
  overflow-wrap: anywhere;

  figure {
    margin: 0;
  }
  figure.models-section__evolution {
    margin: $space-40 auto 0;
  }
  figure.debut-section__teaser {
    margin: 0 auto $space-24;
  }
  figcaption {
    margin-top: $space-16;
    color: $muted;
    font-size: $font-size-secondary;
    text-align: center;
  }
  .text-link {
    display: inline-flex;
    align-items: center;
    gap: $space-8;
    min-height: $control-size;
  }
}

.portrait-section {
  padding-block: $space-40 $space-30;
  background: linear-gradient(145deg, $white 35%, $community-background);

  &__grid {
    display: grid;
    gap: $space-28;
  }
  h1 {
    margin: $space-14 0 $space-16;
    font-size: 2.5rem;
    overflow-wrap: anywhere;
  }
  &__welcome {
    display: flex;
    align-items: center;
    gap: $space-10;
    color: $plum;
    font-family: $display;
    font-size: 1.3rem;
    margin-bottom: $space-16;

    span {
      min-width: 0;
    }
  }
  &__spirit {
    flex: 0 0 auto;
    width: 42px;
    object-fit: contain;
  }
  .section-lead {
    margin-bottom: $space-24;
  }
  &__art {
    min-width: 0;
    text-align: center;
  }
  &__art img {
    width: auto;
    height: 280px;
    margin-inline: auto;
    object-fit: contain;
  }
}

.chapter-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $space-8 $space-24;
  padding-block: $space-16;
  border-bottom: $border-width solid $line;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-10;
    min-height: $control-size;
    font-size: $font-size-secondary;
    font-weight: $weight-bold;
  }
  a:hover {
    color: $link-hover;
  }
}

.profile-section {
  &__topics {
    display: grid;
    gap: $space-32;
    margin-top: $space-36;
  }
  &__topics > div {
    padding-top: $space-24;
    border-top: 2px solid $orange-pale;
  }
  .iconify {
    font-size: 28px;
    color: $eyebrow-text;
    margin-bottom: $space-20;
  }
  h3 {
    font-size: 1.4rem;
    line-height: 1.3;
    margin-bottom: $space-16;
  }
  p {
    color: $muted;
    margin-bottom: 0;
    line-height: $line-height-copy;
  }
}

.video-section {
  padding-top: 0;

  &__player {
    max-width: 960px;
    margin-inline: auto;
    aspect-ratio: 16 / 9;
    background: $plum-deep;
    border-radius: $radius-art;
    overflow: hidden;
  }
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.lore-section {
  background: $white;
  border-block: $border-width solid $line;

  &__heading {
    max-width: 780px;
    margin: 0 auto $space-48;
  }
}

.lore-story {
  max-width: 850px;
  margin-inline: auto;

  &__chapter {
    display: grid;
    gap: $space-16;
    padding-bottom: $space-48;
  }
  &__chapter + &__chapter {
    padding-top: $space-36;
    border-top: $border-width solid $line;
  }
  &__chapter:last-child {
    padding-bottom: 0;
  }
  &__number {
    color: $eyebrow-text;
    font-family: $display;
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.65rem;
    margin-bottom: $space-24;
  }
  p {
    line-height: 1.9;
    margin-bottom: $space-22;
  }
  &__spirits {
    padding-top: $space-14;
  }
  &__spirits img {
    width: min(100%, 360px);
    margin-inline: auto;
  }
  &__guardian-art {
    float: left;
    width: clamp(105px, 22vw, 182px);
    margin: $space-12 $space-6 $space-12 0;
  }
  &__stream-art {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: end;
    gap: $space-16;
    max-width: 520px;
    margin: $space-30 auto 0;
    border-bottom: 2px solid $orange-pale;
  }
  &__stream-art .image {
    width: 100%;
    height: clamp(180px, 30vw, 300px);
    object-fit: contain;
    object-position: bottom;
  }
}

.debut-section {
  background: $community-background;

  &__grid {
    display: grid;
    align-items: center;
    gap: $space-40;
  }
  &__poster img {
    width: min(100%, 360px);
    margin-inline: auto;
    border-radius: $radius-art;
    box-shadow: 8px 8px 0 $orange-pale;
  }
  &__teaser {
    width: min(100%, 280px);
  }
  &__teaser img {
    width: 100%;
    border-radius: $radius-art;
    box-shadow: 5px 5px 0 $orange-pale;
  }
  &__teaser figcaption {
    margin-top: $space-10;
  }
  &__actions {
    display: flex;
    justify-content: center;
  }
  .section-lead {
    margin-bottom: $space-30;
  }
}

.models-section {
  > .shell > .section-lead {
    max-width: none;
  }
  &__evolution {
    max-width: 800px;
  }
  &__evolution img,
  &__reference-grid img {
    width: 100%;
    border-radius: $radius-art;
  }
  &__reference-grid button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: $link-hover;
    text-align: left;
    cursor: zoom-in;
  }
  &__reference-grid button > span {
    display: inline-flex;
    align-items: center;
    gap: $space-8;
    min-height: $control-size;
    font-size: $font-size-secondary;
    font-weight: $weight-bold;
  }
  &__evolution figcaption,
  &__reference-grid figcaption {
    margin-top: $space-4;
  }
  &__references {
    margin-top: $space-60;
  }
  &__references h3 {
    font-size: 1.5rem;
  }
  &__references > p {
    color: $muted;
  }
  &__reference-grid {
    display: grid;
    gap: $space-32;
    margin-top: $space-24;
  }
  &__reference-grid figure {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    min-width: 0;
  }
  &__reference-grid button {
    justify-content: center;
  }
  &__gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-32 $space-16;
    margin-top: $space-40;
  }
  &__gallery figure {
    min-width: 0;
  }
  &__gallery figure:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc(50% - $space-8);
  }
  &__art {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    place-items: center;
    width: 100%;
    height: clamp(180px, 38svh, 240px);
    padding: $space-16;
    border: 0;
    border-bottom: 2px solid $orange;
    background: linear-gradient(0deg, $orange-pale, transparent 75%);
    cursor: zoom-in;
  }
  &__expand {
    position: absolute;
    right: $space-10;
    bottom: $space-10;
    width: $gallery-badge-size;
    height: $gallery-badge-size;
    padding: $space-8;
    border-radius: $radius-small;
    background: $white;
    color: $ink;
  }
  &__art img {
    min-height: 0;
    max-height: 100%;
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: transform $transition-artwork;
  }
  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    &__art:hover img {
      transform: scale($artwork-hover-scale);
    }
  }
}

.more-section {
  background: $spirit;

  &__links {
    display: grid;
    gap: $space-24;
    margin-top: $space-36;
  }
  &__community {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $space-24;
    margin-top: $space-48;
    padding-top: $space-32;
    border-top: $border-width solid $button-light-outline-border;
  }
  &__community p {
    max-width: 620px;
    margin: 0;
    font-family: $display;
    font-size: 1.3rem;
  }
}

.illustrated-link {
  display: grid;
  gap: $space-20;
  padding: $space-24;
  border: $border-width solid $partner-border;
  border-radius: $radius-art;
  background: $white;

  &__art {
    display: grid;
    place-items: center;
    height: 180px;
  }
  img {
    width: 100%;
    max-width: 260px;
    height: 100%;
    object-fit: contain;
    transition: transform $transition-artwork;
  }
  h3 {
    font-size: 1.5rem;
    margin-bottom: $space-14;
  }
  p {
    color: $muted;
    margin-bottom: $space-20;
  }
  span {
    display: inline-flex;
    align-items: center;
    gap: $space-8;
    color: $link-hover;
    font-weight: $weight-bold;
    font-size: $font-size-secondary;
  }
  &:hover img,
  &:focus-visible img {
    transform: scale($artwork-hover-scale);
  }
}

@media (min-width: $breakpoint-mobile) {
  .portrait-section {
    padding-block: $space-55;

    &__grid {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: center;
      gap: $space-45;
    }
    h1 {
      font-size: 3.4rem;
    }
    &__art img {
      height: 420px;
    }
  }
  .lore-story__chapter {
    grid-template-columns: 60px minmax(0, 1fr);
    gap: $space-24;
  }
  .profile-section__topics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-30;
  }
  .debut-section__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-60;
  }
  .debut-section__actions {
    justify-content: flex-start;
  }
  .keola-page figure.debut-section__teaser {
    margin-left: 0;
  }
  .models-section__gallery {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-24;
  }
  .models-section__gallery figure:last-child:nth-child(odd) {
    grid-column: auto;
    justify-self: stretch;
    width: auto;
  }
  .models-section__art {
    height: 320px;
    padding: $space-20;
  }
  .illustrated-link {
    grid-template-columns: 160px minmax(0, 1fr);
    align-items: center;
  }
}

@media (min-width: $breakpoint-desktop) {
  .more-section__links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .models-section__art {
    height: 420px;
  }
  .models-section__reference-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
  .models-section__reference--wide {
    grid-column: 1 / -1;
  }
}

@media (max-width: $breakpoint-small) {
  .chapter-nav {
    justify-content: start;
  }
  .portrait-section h1 {
    font-size: 2.15rem;
  }
  .portrait-section__spirit {
    width: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .illustrated-link:hover img,
  .illustrated-link:focus-visible img {
    transform: none;
  }
}
</style>
