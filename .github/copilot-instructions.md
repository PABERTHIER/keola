# GitHub Copilot Instructions

[AGENTS.md](../AGENTS.md) is the single source of truth for architecture, content boundaries, verification and the prohibition on **all** git commands.

## Copilot-Specific Conventions

- Mobile usability is a release requirement.
  Follow the [mobile acceptance criteria](../AGENTS.md#mobile-experience-acceptance-criteria), implement with the layout skill and verify affected journeys with the review skill; narrow-screen appearance alone is insufficient.
- Follow the nearest page/component pattern: `<script setup lang="ts">`, Nuxt auto-imports, a focused template and `<style lang="scss" scoped>`.
- Import shared data and types explicitly.
  Put verified external destinations in `app/data/site.ts`; use `useLocalePath()` for internal links and `useHead(usePageSeo('pageName'))` for translated page metadata.
  Follow [SEO.md](../.agents/docs/SEO.md) and the SEO skill when registering a page or changing images, structured data, URLs or indexing.
- Use the applicable skill from the shared map below for visual direction, component behavior, copy, responsive layout or technical implementation.

## Shared Skills

| Skill      | File                                                              | When to consult                          |
| ---------- | ----------------------------------------------------------------- | ---------------------------------------- |
| Design     | [keola-design](../.agents/skills/keola-design/SKILL.md)           | Palette, artwork and typography          |
| Layout     | [keola-layout](../.agents/skills/keola-layout/SKILL.md)           | Navigation and responsive pages          |
| Components | [keola-components](../.agents/skills/keola-components/SKILL.md)   | Controls, tooltip, gallery and footer    |
| Content    | [keola-content](../.agents/skills/keola-content/SKILL.md)         | Microcopy and localization               |
| Review     | [keola-review](../.agents/skills/keola-review/SKILL.md)           | Visual and accessibility QA              |
| i18n       | [i18n](../.agents/skills/i18n/SKILL.md)                           | Translation parity and locale navigation |
| Nuxt/Vue   | [nuxt-vue-patterns](../.agents/skills/nuxt-vue-patterns/SKILL.md) | SSR, components and client integrations  |
| SEO        | [seo](../.agents/skills/seo/SKILL.md)                             | Metadata, social previews and indexing   |

## Scoped Instructions

| Instruction | File                                          | Applied to                         |
| ----------- | --------------------------------------------- | ---------------------------------- |
| Nuxt/Vue    | [nuxt](instructions/nuxt.instructions.md)     | Vue pages, components, composables |
| SCSS        | [styles](instructions/styles.instructions.md) | Vue styles and SCSS tokens         |
| i18n        | [i18n](instructions/i18n.instructions.md)     | FR/EN/JA locale JSON               |
