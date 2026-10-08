---
name: keola-layout
description: Design and implement Keola's mobile-first layouts, touch navigation and viewport-safe overlays, then adapt them to tablet and desktop. Use when changing page composition or responsive behavior.
---

# Keola Layout Skill

## Goal

Build layouts that remain intentional at every viewport size.
Mobile usability is a release requirement; follow the acceptance criteria in [AGENTS.md](../../../AGENTS.md#mobile-experience-acceptance-criteria).
Start composition with the small-screen visitor's main task and enhance it for wider screens.

## Container

Use a centered content container around 1180–1280px.

Default horizontal gutters:

- mobile: 16–20px
- tablet: 24–32px
- desktop: 32–48px

## Desktop

Use:

- asymmetric hero compositions
- 2–4 column content grids
- generous negative space
- artwork overlapping the grid when useful

## Tablet

Reduce column count before reducing readability.

## Mobile

Prefer:

- one main column
- occasional two-column micro layouts
- horizontal scrolling for selected media strips
- stacked CTAs
- compact metadata
- simplified decorative elements

Preserve core content and actions.
Horizontal media strips must be intentionally contained, visibly discoverable and usable without dragging as the only control; they must not make the whole page scroll sideways.
Do not conceal overflow bugs with a global `overflow-x: hidden` rule.

Let translated labels and enlarged text wrap.
Avoid fixed heights around text and do not shrink type or hit areas to force a crowded row to fit; reflow the row instead.
Use the existing Sass tokens and content-driven breakpoints, including widths between the named test sizes.
DOM reading and focus order must still match the visual flow.

## Hero

Desktop:

- text + artwork

Mobile:

- text first
- CTA
- artwork
- supporting details

Do not put critical text on top of busy character art.

## Grid rules

Cards should have consistent minimum widths.

Do not create layouts that depend on a precise viewport width.

## Schedule

Desktop:

- structured calendar/list

Mobile:

- vertical list grouped by date

Do not force a desktop calendar into a tiny screen.

## Gallery

Desktop:

- masonry-like or editorial grid is acceptable

Mobile:

- single-column or two-column depending on image ratio

## Navigation

Desktop:

- full navigation

Mobile:

- compact menu
- primary CTA visible
- social links grouped

Keep the menu toggle, language selector and primary action usable together at 320px.
Provide an obvious close action and a scrollable menu when its content exceeds the available height.
Sticky headers must not cover anchor destinations or focused controls.
Opening and closing navigation must not strand focus or leave page scrolling locked.

## Mobile Viewports And Overlays

Account for browser toolbars, landscape height and safe-area insets when placing fixed or sticky controls.
Use suitable `svh`/`dvh` sizing where needed instead of assuming `100vh` is always the visible area.
An overlay must keep its close and navigation controls reachable and allow its own content to scroll on short screens.

Preserve native touch scrolling and browser zoom.
Avoid page-wide gesture interception or scroll effects that fight the visitor.
Touch and reduced-motion users must retain the same access to content; hover effects are optional enhancements.

Reserve image space with known dimensions or aspect ratios and choose mobile-appropriate image sizes.
Keep the main action usable while lower artwork loads; decorations must not cause layout jumps or block interactions on slower devices.

## Spacing

Use a coherent spacing scale.

Prefer fewer, larger spacing decisions over dozens of tiny gaps.

Section spacing should generally feel generous.

## Responsive QA

Always inspect:

- 320px
- 375px
- 430px
- 768px
- 1024px
- 1280px+

Include 320x568, portrait and landscape, touch input and 200% text enlargement in FR/EN/JA.
Inspect the actual open menu and lightbox, not only their closed states.
Use [keola-review](../keola-review/SKILL.md) to exercise journeys and record mobile browser coverage; responsive screenshots alone do not establish mobile usability.
