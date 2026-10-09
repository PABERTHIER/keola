---
name: accessibility
description: Audit or improve accessibility of Keola's Nuxt pages, components and interactions across FR/EN/JA; use for accessibility implementation and review, not copy-only edits.
---

# Keola accessibility

Read [the accessibility maintenance guide](../../docs/accessibility.md) and the applicable scoped instructions before editing.
Aim for WCAG 2.2 AA while preserving the character-led design and mobile journeys.
Ask the user before a substantial palette change.

Inspect the actual component, its visible and keyboard states, and all pages that consume it.
Prefer native semantics, useful translated names, a logical focus path and reduced-motion behavior.
Keep status messages concise.
Follow the existing i18n, Nuxt/Vue and layout skills when those concerns change.

Verify with keyboard, zoom, responsive viewports, and available screen readers and touch devices.
Run automated checks as supporting evidence, never as a conformance certificate.
Record exact coverage and remaining gaps in the handoff; do not claim full accessibility without a complete manual and contrast pass.
