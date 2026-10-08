---
name: nuxt-vue-patterns
description: Implement or refactor Keola's Nuxt 4 and Vue 3 pages, components, composables and client integrations using its SSR, TypeScript and scoped SCSS patterns. Use for application code and behavior, not copy-only or visual-direction work.
---

# Keola Nuxt And Vue Patterns

Use [AGENTS.md](../../../AGENTS.md) for shared rules, page workflow and validation.
Read the nearest working component before introducing a new abstraction.
Check [nuxt.config.ts](../../../nuxt.config.ts) and [package.json](../../../package.json) for installed capabilities rather than importing another project's architecture.

## Existing Building Blocks

| Concern             | Local pattern                                                                          |
| ------------------- | -------------------------------------------------------------------------------------- |
| Page shell          | `app/layouts/default.vue` owns skip link, `SiteHeader`, `SiteFooter` and `SiteTooltip` |
| Page introduction   | `PageIntro` accepts eyebrow, title and intro; its title is the H1                      |
| Page metadata       | `useHead(usePageSeo('gallery'))`, with a supported page identity                       |
| Shared content data | Explicit imports from `~/data/site`                                                    |
| Artwork viewer      | `ArtworkLightbox` exposes `open(index)` through a typed template ref                   |
| Local artwork       | `Image`; public asset paths start with `/images/`                                      |
| Interface icons     | `Icon` with `lucide:` names; social logos use `keo-icon:`                              |
| Browser integration | `app/plugins/smooth-scroll.client.ts` owns Lenis                                       |
| Route scrolling     | `app/router.options.ts` restores history and handles anchors through Lenis             |

## Component And Page Implementation

- Use `<template>`, `<script setup lang="ts">`, then `<style lang="scss" scoped>`.
  Prefer Nuxt auto-imports for registered components and composables.
  Import data, library dependencies and types explicitly; use `import type` for type-only imports.
- Component registration uses `pathPrefix: false`.
  Check name collisions before adding same-named components in subdirectories.
  Follow PascalCase component names and the existing `usePageSeo.ts` naming pattern for composables.
- Pages supply one `<main id="main-content">` and one H1.
  Reuse `PageIntro` when appropriate; do not add a second H1 above it or duplicate the shared layout.
- Type props, emits and exposed component methods.
  Preserve readonly inputs such as the lightbox's number sequence; derive display state without mutating shared data.
- Keep shared URLs, credits and fanart ordering in `app/data/site.ts`.
  Translate reactive display values at their consumer, using [i18n](../i18n/SKILL.md) when needed.
- New routes need matching locale keys, a `PageName` entry in `usePageSeo.ts` and relevant navigation updates.
  Use the page workflow in AGENTS.md and the [seo skill](../seo/SKILL.md) for metadata changes.

## Server Rendering And Lifecycle

Render stable initial markup on the server and client.
Prefer CSS for responsive layout; do not read viewport size during setup to choose initial page content.
Use mounted hooks, event handlers or client plugins for browser-only APIs.
Keep essential content server-rendered rather than wrapping whole pages in `ClientOnly`.

Keep component state local unless it must be shared.
Do not introduce mutable module-level visitor state that can leak between server requests.
If a task adds data fetching, use the installed Nuxt data composables and inspect their existing project usage before choosing cache keys or fetching separately on mount.

For listeners, observers or animation loops added by a component, clean up on unmount.
Extend the existing scroll integration when appropriate instead of creating a second Lenis instance; handle reduced motion for JavaScript animation as well as CSS.
When editing overlays, preserve Escape handling, keyboard navigation and focus return.

## Styles And Images

Sass variables are injected through Vite; use tokens from [variables.scss](../../../app/styles/variables.scss) without repeating its import.
Page/component rules stay scoped; `default.scss` holds base rules, `shared.scss` reusable classes and `cursors.scss` cursor styling.
Consult [keola-layout](../keola-layout/SKILL.md) when changing responsive composition and [keola-components](../keola-components/SKILL.md) for visual component choices.

Use the shared `Image` component, which renders one native `img` and serves original public assets.
Keep intrinsic artwork dimensions in `app/data/imageDimensions.ts` when adding or replacing files, or pass both `width` and `height` for other assets.
Its defaults are lazy loading, asynchronous decoding and proportional sizing.
Use eager loading for the brand, hero and opened lightbox, with high fetch priority for the hero.
Pages own CSS layout; no resize observers or generated image variants are needed.
Preserve full gallery images and direct media-kit downloads.
Keep Vercel on `nuxt build` for the server-rendered app; images need no server processor.

## Verification

Mobile interaction is part of completion:
apply the [mobile acceptance criteria](../../../AGENTS.md#mobile-experience-acceptance-criteria) and exercise affected journeys with touch input, open menus/dialogs and all three locales.
Preserve native zoom and scrolling; keep controls reachable on short screens.

Run the format, type, lint and build checks listed in AGENTS.md for application changes.
Exercise affected interactions, route navigation and locale switching, and inspect hydration warnings and asset requests.
UI changes also need the prescribed viewport, keyboard and reduced-motion checks;
use [keola-review](../keola-review/SKILL.md) for a visual review when the task calls for one.
