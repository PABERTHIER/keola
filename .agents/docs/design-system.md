# Keola — Design System

This document records design direction and proposed options.
For the implemented palette, spacing, radii and breakpoints, use [`app/styles/variables.scss`](../../app/styles/variables.scss);
for global rule ownership, see [`default.scss`](../../app/styles/default.scss), [`shared.scss`](../../app/styles/shared.scss) and [`cursors.scss`](../../app/styles/cursors.scss).

## 1. Design direction

**Character-led creator identity + red-panda warmth + subtle spirit magic.**

The system is intentionally restrained:

- neutral surfaces do most of the work
- orange establishes identity
- plum gives dark surfaces a warm, expressive contrast
- lilac suggests spirits; nature colors remain small accents
- Keola's character artwork, not a forest theme, leads the page

## 2. Color system

### Brand anchor

**Keola Orange — `#FF7B00`**

- Status: confirmed brand reference.
- Use for primary brand accents, active states, key CTA moments and small identity details.
- Do not flood large surfaces with saturated orange.

### Proposed palette

These are **design proposals**, not a list of tokens currently implemented in SCSS.
Check `variables.scss` before using a value.

| Token                | Value     | Role                          |
| -------------------- | --------- | ----------------------------- |
| `brand.orange`       | `#FF7B00` | Confirmed identity anchor     |
| `brand.orange-soft`  | `#FFB15C` | Soft highlight                |
| `brand.orange-pale`  | `#F7DFC5` | CTA and metadata surface      |
| `surface.paper`      | `#FFF8F3` | Main background               |
| `surface.white`      | `#FFFDF9` | Content surface               |
| `surface.peach`      | `#F2E4D6` | Gallery section               |
| `spirit.lilac-pale`  | `#EEE8F3` | Secondary surface             |
| `contrast.plum`      | `#493047` | Hero and high-contrast action |
| `contrast.plum-deep` | `#302137` | Footer and gallery backdrop   |
| `ink`                | `#342630` | Primary text                  |
| `muted`              | `#665961` | Secondary text                |
| `border`             | `#D9DBD2` | Restrained borders            |
| `nature.sage`        | `#9BB79A` | Nature accent                 |
| `nature.teal`        | `#78B8B8` | Secondary accent              |
| `spirit.blue`        | `#86C8E8` | Magical light                 |
| `spirit.lilac`       | `#B79AD8` | Spirit accent                 |

### Color ratio

A useful default:

- warm paper and white should dominate the scroll
- orange anchors actions and small details
- plum supplies dark contrast without becoming the whole page
- lilac is a small spirit accent; green is reserved for relevant nature content

This prevents the site from becoming visually orange-heavy.

### Accessibility

Never use light orange, yellow, lilac or teal as body text on cream.

Primary text should use `ink`.

CTA text should have strong contrast against its button background.

## 3. Typography

### Recommendation

Use a deliberately limited three-role system (two UI faces and one signature face).

#### Display / headings

Recommended: Zen Maru Gothic

Characteristics:

- rounded and legible in Japanese
- friendly without turning every heading into a sticker
- supports the full FR/EN/JA presentation

**Signature: Kaushan Script** for the Keola wordmark and Latin hero name only.
This is the script used for her name on Carrd (<https://keola.tv/>); it is not a replacement for Japanese typography.

#### Body / UI

Recommended: Plus Jakarta Sans

Characteristics:

- clean
- modern
- highly readable
- professional
- works well for dense schedules and cards

Japanese body text falls back to Zen Maru Gothic.

### Typography rules

- Headings should feel friendly, not bubbly.
- Body copy should stay neutral and highly readable.
- Use weight contrast rather than huge size contrast.
- Keep the signature face restricted to the brand and hero so the UI remains readable.
- Avoid all-caps except for tiny metadata labels.
- Use sentence case for most navigation and buttons.

### Suggested scale

| Role    |    Size |  Weight | Line height |
| ------- | ------: | ------: | ----------: |
| Display | 56–72px |     700 |   0.95–1.05 |
| H1      | 44–56px |     700 |        1.05 |
| H2      | 32–40px |     700 |         1.1 |
| H3      | 24–30px |     700 |         1.2 |
| Lead    | 20–24px |     500 |        1.45 |
| Body    | 16–18px | 400–500 |        1.55 |
| Small   | 13–14px |     500 |         1.4 |
| Micro   | 11–12px |     600 |         1.3 |

On small screens, reduce display/H1 sizes rather than allowing awkward wrapping.

## 4. Shape language

### Base geometry

Use:

- rounded rectangles
- soft organic corners
- pill controls for tags/statuses
- occasional irregular illustrated shapes

Recommended radius tokens:

- `radius.sm`: 10px
- `radius.md`: 16px
- `radius.lg`: 24px
- `radius.xl`: 32px
- `radius.pill`: 999px

Do not use extreme rounding on every element.

## 5. Borders and shadows

Borders should be subtle and warm.

Default:

- 1px solid warm border
- low-contrast shadow

Avoid:

- black borders
- hard drop shadows
- glassmorphism everywhere
- excessive blur

Recommended shadow vocabulary:

- `shadow.soft`: barely visible elevation
- `shadow.card`: moderate elevation for featured cards
- `shadow.float`: reserved for menus/modals

## 6. Surfaces

Use layered paper-like surfaces:

1. page background — warm cream
2. section background — slightly darker cream/peach
3. card — near-white
4. featured card — orange/nature/spirit tint
5. overlay — white with opacity

Texture should be extremely subtle if used.

A flat clean implementation is preferable to a fake "paper texture" everywhere.

## 7. Buttons

### Primary

Orange background, dark/white text depending on contrast, rounded.

Use for:

- Watch on Twitch
- Join Discord
- View schedule
- Support / donate

### Secondary

Cream/white background + warm border.

### Tertiary

Text/link button with small arrow or spirit/paw marker.

### Playful

Use only for special moments:

- small sticker treatment
- slight rotation
- tiny sparkle
- mascot/illustration overlap

Never make core navigation look like stickers.

## 8. Cards

Card anatomy:

- optional eyebrow/category
- title
- short description
- image/illustration
- optional metadata
- optional CTA

Cards should feel like **objects in the sanctuary**, not generic SaaS cards.

Good:

- slightly organic image crop
- small icon
- warm border
- clear hierarchy

Bad:

- card nesting
- too many badges
- heavy shadows
- dense grids with no breathing room

## 9. Icons

Use simple rounded icons.

Preferred visual weight:

- 1.5–2px stroke
- rounded line endings
- small and supportive

Use brand motifs for decorative icons, but use familiar symbols for functional actions.

## 10. Illustration

Illustration is the best place for personality.

Use:

- character art
- chibi moments
- spirit mascots
- leaves
- tiny woodland objects

Decorative art should have a clear visual hierarchy:

1. character
2. major decorative element
3. micro-details

## 11. Motion

Motion should feel:

- soft
- playful
- alive
- optional

Recommended:

- 150–220ms UI transitions
- 250–450ms reveal animations
- small float/parallax for spirit elements
- gentle hover lift
- tiny sparkle/particle effects in hero sections

Avoid:

- constant animation
- excessive bouncing
- large parallax
- animations that block content
- motion on every card

Respect reduced-motion preferences.

## 12. Photography/art framing

Default image treatment:

- radius 20–32px
- optional warm border
- optional sticker overlap
- no generic white frame unless intentional

Hero artwork can break the grid slightly.

## 13. Navigation

Desktop:

- compact top navigation
- logo/identity left
- primary destinations center/right
- social/community actions at the edge

Mobile:

- simple menu
- no overcrowded icon row
- preserve one primary CTA
- keep social links accessible but secondary

## 14. Layout

Recommended maximum content width:

- 1180–1280px

Recommended horizontal gutter:

- desktop: 32–48px
- tablet: 24–32px
- mobile: 16–20px

Use a fluid grid.

Avoid:

- fixed-width layouts
- content touching viewport edges
- tiny text to fit desktop information on mobile

## 15. Hero composition

A strong homepage hero can use:

- left: short positioning statement
- CTA row
- right: character artwork
- background: subtle sanctuary/magic motif

The hero should immediately communicate:

1. who Keola is
2. what visitors can do
3. what makes her distinctive

## 16. Responsive philosophy

Design mobile as a first-class composition.

At small widths:

- stack artwork and text
- reduce decorative density
- turn grids into horizontal scroll or stacks where useful
- simplify schedules
- use bottom-sheet/modal navigation when appropriate
- preserve generous touch targets

Do not simply shrink desktop.

## 17. Accessibility

Minimum expectations:

- keyboard navigable controls
- visible focus states
- semantic headings
- alt text for meaningful artwork
- decorative artwork marked decorative
- sufficient color contrast
- reduced-motion support
- touch targets around 44px minimum
- no information conveyed only by color
