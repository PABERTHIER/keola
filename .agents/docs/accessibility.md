# Accessibility maintenance

Keola's accessibility target is WCAG 2.2 AA across FR, EN and JA.
This document records implementation ownership and the checks needed before making a conformance claim.

## Source audit

The audit covered all six page sources, shared navigation, language switching, image viewing, carousel, image rendering, route scrolling and the standalone error page.
The main issues found and addressed were:

- skip links did not explicitly focus the main landmark;
- client route and anchor changes had no reliable focus destination;
- gallery reveal animation could hide artwork reached by keyboard;
- failed gallery images had no exposed status text;
- image changes in the lightbox did not announce position;
- the mobile menu could return focus to its toggle after an unrelated pointer action;
- the carousel group lacked a programmatic role;
- JavaScript route scrolling did not honor reduced motion.

The color palette was left unchanged.

Source and SSR checks found one main landmark, one H1 and a skip link on every FR/EN/JA page.
Rendered images had `alt` attributes and the video iframe had a title.
Formatting, type checking, lint and production build passed.
These checks do not establish contrast, focus behavior in a real browser, or screen reader quality.
The release audit below is therefore still required before claiming full WCAG 2.2 AA conformance.

## Current implementation

- Each page has one main landmark and H1.
  The shared layout supplies a skip link; page mains accept programmatic focus.
  Client navigation moves focus to the new main, and same-page anchors move focus to their destination.
  `app/plugins/navigation-focus.client.ts` listens for completed route changes and schedules one focus update; it does not run on scrolling or animation frames continuously.
- Buttons and links use native elements.
  Icon-only controls have localized accessible names.
  The mobile menu exposes its expanded state and keeps closed navigation inert.
- Artwork uses localized alt text and intrinsic dimensions.
  The gallery and archives use a native modal dialog with visible controls, keyboard navigation and focus return.
- The language chooser uses a menu button and radio menu items with arrow-key navigation.
  Site tooltips supplement labels; they are not required to understand an action.
- CSS and JavaScript scrolling honor reduced motion.
  The hero carousel stops automatic playback on focus and when reduced motion is requested.
- Focus outlines and 44px standalone control targets are defined in shared styles.

## Audit before release

Check each page in FR, EN and JA with keyboard only and a screen reader.
Start at the skip link, traverse the header, page, footer and every interactive state.
Verify that focus follows route and anchor navigation, never enters closed menus, enters and leaves the image viewer predictably, and stays visible at 200% zoom.
Check names, roles, states, headings, image descriptions, video controls and any loading or error announcements.

Check 320x568, 375, 430, 768, 1024 and 1280px or wider, including landscape and enlarged text.
Inspect open menus and dialogs.
Test touch on iOS Safari and Android Chrome and check that browser zoom and native scrolling remain available.
Run a screen reader pass with VoiceOver on Safari and TalkBack on Chrome; add a desktop NVDA/Firefox or NVDA/Chrome pass.
Record the device, browser, locale, viewport, journey and outcome.
A desktop emulation pass cannot replace these checks.

Measure text, icon and focus-indicator contrast against their actual backgrounds, including hover, selected, disabled and image-backed states.
A palette change requires the owner's review before implementation.
Fix confirmed failures with the smallest brand-consistent adjustment and recheck the affected states.

Automated tools can catch missing names, invalid ARIA, contrast failures and structural mistakes.
They cannot establish keyboard usability, screen reader clarity, motion comfort or real-device behavior.
Record any untested coverage and observed failures instead of describing the site as fully accessible.

## Change rules

- Keep semantic HTML and DOM reading order aligned with the visible order.
  Use `sr-only` for useful spoken text, never to hide an essential visual label.
  Do not add hidden text to every page by default: existing visible H1s and labeled sections already provide that context, and duplicate hidden headings make screen reader navigation noisier.
- Give every interactive control a visible focus state and a name that describes its action.
  Keep localized labels, alt text and status text aligned across all three locale files.
- Use native links for navigation and buttons for actions.
  If a widget needs ARIA roles, implement its complete keyboard and focus behavior.
- Do not use `aria-hidden` on focusable content.
  Keep focus out of collapsed UI, move it deliberately after navigation, and restore it after dismissing overlays.
- Announce meaningful changes without making passive animation or decorative content noisy.
  Honor reduced motion in CSS and JavaScript.
- Verify the affected journey after each interaction change, then run the repository's formatting, type, lint and build checks.
