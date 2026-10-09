---
name: keola-components
description: Component-level visual language for Keola's website.
---

# Keola Components Skill

## Touch And Mobile Behavior

Apply the [mobile acceptance criteria](../../../AGENTS.md#mobile-experience-acceptance-criteria) to every interactive component.
Standalone buttons, menu toggles, language controls and lightbox actions need at least 44 by 44 CSS px hit areas with separation between adjacent targets.
Icons may be smaller than their hit areas.

Keep essential labels and actions available without hover; tooltips and animation only supplement them.
`SiteTooltip` is mounted by the default layout.
Add localized `data-tooltip` text to controls when a supplemental pointer or keyboard-focus hint helps; retain an accessible name and a clear touch action without the tooltip.
Let translated labels wrap or stack controls instead of shrinking text.
Provide visible close and navigation controls for overlays; swipe gestures may enhance them but must not be the only way to operate them.

## Buttons

### Primary

Orange, high contrast, rounded, clear verb.

### Secondary

Light surface, warm border.

### Text

Minimal, often with arrow or tiny icon.

Do not create more than three button styles unless necessary.

## Cards

Cards use:

- warm border
- soft radius
- restrained shadow
- clear heading
- concise metadata

A card should communicate its purpose in under two seconds.

## Tags

Use pill tags for:

- LIVE
- upcoming
- category
- platform
- event

Use color sparingly.

## Social links

Use recognizable platform icons.

External links should visually distinguish themselves from internal navigation when useful.

## Schedule items

A schedule item should show:

- date
- time
- content
- platform
- optional status

Do not make users decode decorative symbols.

## Gallery items

Use artwork as the visual focus.

Hover:

- slight scale
- optional caption
- no aggressive zoom

## Section headings

Recommended pattern:

- eyebrow
- title
- one-sentence explanation
- optional action

Example:

`LES PETITS ESPRITS`
`Un petit coin pour se retrouver`
`Retrouve les prochains rendez-vous…`

## Decorative components

Good:

- spirit
- leaf
- sparkle
- paw
- tail motif

Use as small accents.

Avoid full-page decorative noise.

## Featured blocks

Use featured blocks for:

- Red Panda Network
- major events
- debut/redebut
- charity events
- important announcements

These can have more expressive art direction than standard cards.

## Footer

Footer should be rich but organized:

- logo/identity
- short description
- internal navigation
- social links
- partners
- credits
- legal/contact

Do not make the footer a second homepage.
