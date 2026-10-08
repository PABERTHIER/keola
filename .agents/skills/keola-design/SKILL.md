---
name: keola-design
description: Master visual-design rules for building a modern, warm, professional and subtly playful website for Keola Kumaneko.
---

# Keola Design Skill

## Mission

Create a brand-new web experience that feels unmistakably compatible with Keola Kumaneko's identity while being cleaner, more modern and more professional than the existing site.

## Non-negotiables

- Warm red-panda identity.
- Cream/paper foundation.
- Orange as the main brand accent.
- Subtle nature colors.
- Subtle spirit colors.
- Rounded but not childish geometry.
- Strong typography hierarchy.
- Generous whitespace.
- Character artwork as a major visual asset.
- Mobile-first composition and interaction, meeting the
  [mobile acceptance criteria](../../../AGENTS.md#mobile-experience-acceptance-criteria).
- Professional foundation with small moments of fun.

## Design hierarchy

When choosing between competing ideas, prioritize:

1. clarity
2. brand recognition
3. readability
4. visual hierarchy
5. personality
6. decoration

Decoration must never win over clarity.

## Visual formula

Use:

**clean layout + warm surfaces + expressive artwork + tiny magical details**

Do not use:

**busy layout + lots of gradients + excessive stickers + neon gamer UI**

## Color behavior

Use `#FF7B00` as the identity anchor.

Prefer warm neutrals for large surfaces.

Use warm plum/blue/teal for contrast and lilac for spirit/magic moments.
Green/teal are minor nature accents, never the dominant page color.

Never make the whole page orange.

## Typography behavior

Use a friendly display face for headings and a neutral sans-serif for body/UI.

Recommended roles:

- Kaushan Script for the Keola signature only
- Zen Maru Gothic for headings and Japanese
- Plus Jakarta Sans for body/UI, with Zen Maru Gothic as Japanese fallback

These three roles serve different scripts and hierarchy; do not add more fonts without a clear reason.

## Component behavior

Components should feel related through:

- radius
- spacing
- border treatment
- typography
- icon weight

Do not make every component visually unique.

## Art direction

Prefer character-led compositions.

Use illustrations to create emotional hierarchy, not merely decoration.

## Motion

Use subtle, purposeful motion.

If an animation makes the interface harder to scan, remove it.

Always support reduced motion.

## Responsive rule

Never “shrink desktop”.

Recompose the interface for mobile:

- stack
- simplify
- prioritize
- reduce decorative density
- preserve touch targets

## AI implementation behavior

When asked to design a new page:

1. Identify the page's primary user goal.
2. Select a single visual hero/anchor.
3. Establish content hierarchy and the primary journey on a small touch screen first.
4. Apply the Keola color system.
5. Apply typography.
6. Add only necessary decoration.
7. Validate mobile composition and the primary journey using [keola-review](../keola-review/SKILL.md).
8. Check accessibility.
9. Check whether the result still feels professional.

## Quality bar

A good result should look like a polished independent creator brand, not a template with orange colors applied to it.
