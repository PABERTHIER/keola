---
name: keola-review
description: Review Keola pages for brand consistency, mobile usability, responsive behavior and accessibility. Use for visual QA and mobile acceptance checks before considering UI work complete.
---

# Keola Review Skill

Run this checklist before considering a page finished.

## Brand

- Does it feel like Keola?
- Is the red-panda identity visible?
- Is the orange accent present but controlled?
- Are nature/spirit accents subtle?

## Typography

- Is there a clear heading hierarchy?
- Is body text comfortable to read?
- Are line lengths reasonable?
- Are headings too childish or too corporate?

## Layout

- Is the primary content obvious?
- Is whitespace generous?
- Are cards aligned?
- Does the layout work without the artwork?

## Personality

- Is there at least one small expressive detail where appropriate?
- Are decorative details supporting the content?
- Does the page feel warm?

## Professionalism

- Does it look custom rather than templated?
- Are shadows and borders restrained?
- Are components consistent?

## Mobile

Apply the [mobile acceptance criteria](../../../AGENTS.md#mobile-experience-acceptance-criteria).
Check 320px (including 320x568), 375px and 430px widths in FR/EN/JA, plus landscape and the tablet/desktop sizes in AGENTS.md.
Test touch input, enlarged text and open interaction states rather than judging only static screenshots.

| Journey or state       | Verify                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Arrive on home         | Identity and primary action are clear; no clipped text or page overflow                                                                    |
| Open menu and navigate | All links and close control are reachable on short screens; anchors and focus are not hidden behind the header                             |
| Switch FR/EN/JA        | Current page is preserved; labels reflow and controls remain usable                                                                        |
| Watch and join         | Twitch, schedule and community destinations can be activated by touch                                                                      |
| Browse artwork         | Open, previous, next and close work without hover or swipe-only controls; full artwork fits and dismissal restores focus and page position |
| Read supporting pages  | Credits, archives and media/contact actions remain readable and accessible                                                                 |
| Resize or rotate       | Menus, dialogs and sticky controls remain reachable; safe areas and browser toolbars do not obscure them                                   |
| Enlarge text           | At 200%, labels and content remain readable without losing actions; browser zoom is enabled                                                |
| Load on a slow device  | Throttled network/CPU reveals no blocked primary action, disruptive layout jumps or persistent scroll/interaction jank                     |

Check standalone controls for at least 44 by 44 CSS px hit areas and enough separation to avoid accidental taps.
Tooltips are supplementary; touch users must understand an action without needing hover.
Verify native scrolling and reduced motion, including any JavaScript scroll integration.

For a focused change, exercise affected journeys; shared navigation or layout changes require checks across their consuming pages.
Before release, verify iOS Safari and Android Chrome, preferably on real devices.
Record actual browser/device or emulation, locale, viewport and outcome.
If device testing is unavailable, identify that gap.

Clipped content, unreachable controls, lost functionality, disabled zoom or broken core journeys are unfinished work.
Fix issues within the task's scope and report remaining blockers; a successful build or desktop screenshot is not a mobile pass.

## Accessibility

- focus states
- contrast
- alt text
- semantic hierarchy
- reduced motion

## Anti-pattern detection

Reject if:

- everything is orange
- every component is a pill
- every card has a sticker
- every section is animated
- the interface resembles a generic SaaS dashboard
- decorative elements compete with the character
- lore replaces useful information
