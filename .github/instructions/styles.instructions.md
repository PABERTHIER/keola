---
description: "Use when editing Keola's Vue UI or SCSS styling; apply the warm red-panda brand and responsive visual system."
applyTo: 'app/**/*.vue,app/styles/**/*.scss'
---

# Styling And Design

- Treat the [mobile acceptance criteria](../../AGENTS.md#mobile-experience-acceptance-criteria) as required for UI completion.
  Compose for small touch screens first, then enhance for wider viewports; preserve core functionality in every locale.
- Use `<style lang="scss" scoped>` for page and component rules.
  `app/styles/default.scss` holds resets and base element rules, `shared.scss` holds reusable classes, and `cursors.scss` holds cursor rules.
  `variables.scss` contains Sass tokens injected by `nuxt.config.ts`.
- Keep the character-led paper/plum/orange direction in [.agents/skills/keola-design/SKILL.md](../../.agents/skills/keola-design/SKILL.md).
  Nature colors are small supporting accents, not full-width surfaces.
  Use [.agents/skills/keola-components/SKILL.md](../../.agents/skills/keola-components/SKILL.md) for controls and [.agents/skills/keola-layout/SKILL.md](../../.agents/skills/keola-layout/SKILL.md) for breakpoints.
- Avoid decorative card nesting and excessive orange.
  Keep artwork visible without destructive crops in galleries, and preserve readable contrast and 44px touch targets.
- Check 320x568 and the other widths in [.agents/skills/keola-review/SKILL.md](../../.agents/skills/keola-review/SKILL.md).
  Keep the hero concise without shrinking text or controls to force the next section above the fold; keyboard focus and reduced motion must work.
- Reflow crowded controls and translated text instead of shrinking them.
  Keep standalone touch hit areas at least 44 by 44 CSS px, preserve browser zoom, and handle short viewports, safe areas and enlarged text.
  Do not hide page overflow to mask layout bugs; validate open menus and dialogs as well as resting layouts.
