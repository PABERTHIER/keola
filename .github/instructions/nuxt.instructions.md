---
description: 'Use when editing Nuxt 4 Vue pages, components, layouts, composables, or configuration for the Keola website.'
applyTo: 'app/**/*.vue,app/composables/**/*.ts,nuxt.config.ts'
---

# Nuxt And Vue

- Apply the [mobile acceptance criteria](../../AGENTS.md#mobile-experience-acceptance-criteria) to interactive work.
  Preserve touch scrolling, zoom, route navigation and focus restoration; no essential action may require hover or a custom gesture.
  Check affected journeys using [.agents/skills/keola-review/SKILL.md](../../.agents/skills/keola-review/SKILL.md).
- Use the local SFC order: `<template>`, `<script setup lang="ts">`, `<style lang="scss" scoped>`.
  Prefer Nuxt auto-imports for composables and explicit imports for shared data or types.
- Pages render inside the shared layout, have one `<main id="main-content">` and one H1, and call `useHead(usePageSeo('pageName'))` with their matching translated SEO keys.
- Route internal links through `useLocalePath()`.
  Keep external URLs in `app/data/site.ts` when shared across pages, and mark new-tab links with `rel="noopener noreferrer"`.
- Use the shared `Image` component for artwork with localized alt text.
  Keep intrinsic artwork dimensions in `app/data/imageDimensions.ts`, or supply both `width` and `height`.
  It serves original public assets, defaults to lazy loading and shrinks to its container; use eager loading and high fetch priority for the hero.
  Preserve full artworks in the gallery.
- Do not synthesize schedule dates or live status; use the official Twitch schedule.
- Run `yarn format:check`, `yarn typecheck`, `yarn lint`, and `yarn build` after behavior or configuration changes.
