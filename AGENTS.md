# Keola Website Guidance

Keola Kumaneko's French-first Nuxt 4 website replaces `keola.tv`.
It is an original, character-led design, not a Carrd remake or a nature/conservation campaign site.
The site uses Vue 3, TypeScript 6, Yarn 4, server rendering on Vercel, and FR/EN/JA routes.
This file is the shared entry point for coding agents. Keep guidance specific to this repository and verify implementation details against the source before documenting them.

## Non-Negotiables

- Do not run **any** git command unless the user explicitly lifts this restriction for the task.
  This includes read-only commands such as `git status`, `git diff`, and `git log`.
  Use filesystem inspection and direct file comparisons instead; preserve unrelated user changes.
- Mobile usability is a release requirement.
  Design and implement the small-screen, touch experience first, then enhance it for tablet and desktop.
  A page is not finished merely because it fits a narrow viewport; its core journeys must be comfortable and reliable.
- Use tokens in `app/styles/variables.scss`, resets and base rules in `app/styles/default.scss`, shared animation definitions in `app/styles/keyframes.scss`, reusable classes in `app/styles/shared.scss`, cursor rules in `app/styles/cursors.scss`, and scoped SCSS beside each Vue component.
  No `main.css`.
- French is the default locale.
  Add translation keys to all three locale files together, preserving placeholders.
  Never use `|` in translated copy: Vue I18n treats it as plural syntax.
- New-tab links need `target="_blank"` and `rel="noopener noreferrer"`.
  Icon-only controls need accessible names and tooltips.
  Informative images need localized, meaningful alt text; decorative images cannot use empty alt text.
  Interactive artwork must be keyboard accessible.
  Respect reduced motion, including JavaScript-driven scrolling and animation.

## Setup And Commands

Use Node.js 24 (as in CI) and the Yarn version pinned in `package.json`.
Run `corepack enable` once when setting up Node.js so `yarn` uses that pinned version.
Use `yarn` directly for routine commands below.
If the Yarn launcher is unavailable, use `corepack yarn <command>`; if PowerShell blocks `yarn.ps1`, use `yarn.cmd <command>`.
The project uses the `node-modules` linker in `.yarnrc.yml`.
Keep Yarn as the package manager; do not introduce npm or pnpm lockfiles.
Change dependencies only when the task requires it, do not update manually `yarn.lock`.

| Task                       | Command                           | Notes                                             |
| -------------------------- | --------------------------------- | ------------------------------------------------- |
| Install dependencies       | `yarn install --immutable`        | Reproduce the existing lockfile                   |
| Start development server   | `yarn dev`                        | Local Nuxt server, normally port 3000             |
| Check formatting           | `yarn format:check`               | Checks the paths listed in `package.json`         |
| Format application files   | `yarn format`                     | Broad write operation; prefer changed-file scope  |
| Check types                | `yarn typecheck`                  | Nuxt and Vue TypeScript checks                    |
| Lint                       | `yarn lint`                       | ESLint with the repository's Prettier integration |
| Fix lint findings          | `yarn lint:fix`                   | Review fixes and avoid unrelated rewrites         |
| Build for production       | `yarn build`                      | Server-rendered Nuxt build                        |
| Preview a production build | `yarn preview`                    | Run after building                                |
| Generate static output     | `yarn generate`                   | Available, but not the Vercel SSR build target    |
| Profile a build            | `yarn profile`                    | Nuxt build with profiling                         |
| Prepare Nuxt types         | `yarn postinstall`                | Runs automatically after install                  |
| Check this guide           | `yarn prettier --check AGENTS.md` | Not included in `format:check`                    |

The `generate` script exists, but Vercel must use `build` for this server-rendered app.
Images are static public assets rendered by the shared `Image` component; they do not require a server-side image processor or a hosting-specific provider.
Do not edit generated `.nuxt/`, `.output/`, or dependency files.

## Direct Dependencies

These are the direct entries in `package.json`; consult that file for versions.
The last row identifies entries whose current necessity should be checked before a future dependency cleanup.

| Dependency                                                                                               | Purpose in this repository                                                                                                 |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `nuxt`                                                                                                   | SSR framework, routing, build and preview commands                                                                         |
| `@nuxtjs/i18n`                                                                                           | FR/EN/JA routes and translations                                                                                           |
| `@nuxtjs/seo`                                                                                            | Site metadata, sitemap and structured data                                                                                 |
| `@nuxt/icon`, `@iconify-json/lucide`                                                                     | Social SVG collection and Lucide interface icons                                                                           |
| `@fontsource/kaushan-script`, `@fontsource/plus-jakarta-sans`, `@fontsource/zen-maru-gothic`             | Locally bundled brand, body and Japanese fonts                                                                             |
| `lenis`                                                                                                  | Client-side smooth scrolling and route scroll behavior                                                                     |
| `@nuxt/eslint`, `eslint`, `eslint-plugin-prettier`, `eslint-config-prettier`, `prettier`                 | Nuxt-aware linting and formatting                                                                                          |
| `typescript`, `vue-tsc`, `@types/node`                                                                   | Type checking for Nuxt, Vue and Node configuration                                                                         |
| `sass`                                                                                                   | Compile global and scoped SCSS                                                                                             |
| `@nuxt/types`                                                                                            | Explicitly listed in `tsconfig.json` type libraries                                                                        |
| `@vue/composition-api`, `@nuxt/eslint-config`, `@nuxtjs/eslint-config-typescript`, `globals`, `rolldown` | Direct entries with no direct import found in authored source or configuration; verify their toolchain role before removal |

## Architecture

| Concern                         | Owner                                                                                        | Convention                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Routes and page content         | `app/pages/`                                                                                 | One main and H1 per page; localize internal links                                        |
| Shared UI                       | `app/components/`, `app/layouts/default.vue`                                                 | Header, footer, tooltip, page patterns and lightbox                                      |
| Verified links and credits      | `app/data/site.ts`                                                                           | Shared URLs, social links, fanart order and credits                                      |
| Page metadata                   | `app/composables/usePageSeo.ts`                                                              | Translated titles, descriptions and OG metadata                                          |
| Styling                         | `app/styles/variables.scss`, `default.scss`, `keyframes.scss`, `shared.scss`, `cursors.scss` | Tokens, base rules, shared keyframes, shared classes and cursors; keep page rules scoped |
| Browser-only integrations       | `app/plugins/smooth-scroll.client.ts`                                                        | Lenis scrolling; keep DOM code out of SSR                                                |
| Navigation focus                | `app/plugins/navigation-focus.client.ts`                                                     | Focus the destination after client-side page and anchor navigation                       |
| Route scroll behavior           | `app/router.options.ts`                                                                      | Lenis history restoration and hash scrolling                                             |
| Locale metadata and site config | `app/app.vue`, `nuxt.config.ts`                                                              | Language, canonical, hreflang and site identity                                          |
| Translations                    | `i18n/locales/fr-FR.json`, `en-US.json`, `ja-JP.json`                                        | Align keys and placeholders across locales                                               |
| Published assets                | `public/images/`                                                                             | Local artwork and downloads                                                              |
| Icon configuration              | `nuxt.config.ts`, `app/assets/svg/`                                                          | Nuxt Icon and the configured `keo-icon` collection                                       |
| Tooling and CI                  | `package.json`, `.github/workflows/ci.yml`                                                   | Available scripts and checks actually automated                                          |

The current shared components are grouped by use:

| Area                      | Components                                                                      |
| ------------------------- | ------------------------------------------------------------------------------- |
| Site shell and navigation | `SiteBrand`, `SiteHeader`, `SiteFooter`, `LanguageSwitcher`, `SiteTooltip`      |
| Home                      | `HomeHero`, `HomeGallery`, `HomeMission`, `HomeCommunity`, `KeolaEmoteSurprise` |
| Page and artwork patterns | `PageIntro`, `Image`, `ArtworkLightbox`                                         |

Check the component source before reusing it; the directory is the authoritative list as new components are added.

Configuration ownership: `nuxt.config.ts` controls SSR, modules, locale and site URLs, icons and global stylesheet loading;
`tsconfig.json` extends Nuxt's generated types;
`eslint.config.mjs` adds the Prettier integration;
`.prettierrc` and `.editorconfig` set formatting;
`.yarnrc.yml` selects the node-modules linker;
`.github/workflows/ci.yml` installs and lints on Node 24.
`.vscode/settings.json` only sets local editor behavior.
Keep the pinned Yarn release in `package.json` and CI aligned.

## Routes And Page Workflow

Nuxt I18n uses the `prefix` strategy: French routes also have a `/fr` prefix, with equivalent `/en` and `/ja` routes.
`/` is the language-detection entry point; French is the configured default, and browser language or the locale cookie can affect redirection.

| Page      | Source file                     | French route    | SEO namespace  |
| --------- | ------------------------------- | --------------- | -------------- |
| Home      | `app/pages/index.vue`           | `/fr`           | `seo.home`     |
| Keola     | `app/pages/keola/index.vue`     | `/fr/keola`     | `seo.keola`    |
| Gallery   | `app/pages/gallery/index.vue`   | `/fr/gallery`   | `seo.gallery`  |
| Credits   | `app/pages/credits/index.vue`   | `/fr/credits`   | `seo.credits`  |
| Archives  | `app/pages/archives/index.vue`  | `/fr/archives`  | `seo.archives` |
| Media kit | `app/pages/media-kit/index.vue` | `/fr/media-kit` | `seo.media`    |

Keep each named page in `app/pages/<route>/index.vue`.
The homepage stays at `app/pages/index.vue` so it serves the locale root.

When adding or substantially changing a page:

1. Read the nearest page and relevant shared components.
   Use `PageIntro` where its eyebrow, title and introduction pattern fits; it already supplies the H1.
2. Render one `<main id="main-content">` and one H1.
   The default layout owns the skip link, header and footer; do not duplicate them in pages.
3. Add page copy and `seo.<page>.title` / `seo.<page>.description` in all three locales.
   For a new page identity, add its route, schema type, social image/alt key and sitemap artwork to `app/data/seo.ts`; `PageName` is derived from that registry.
   Call `useHead(usePageSeo('pageName'))` from the page and keep image dimensions in `app/data/imageDimensions.ts` accurate.
4. Use `NuxtLink` with `useLocalePath()` for internal destinations, including home-page anchors.
   Preserve the current route when switching language with `useSwitchLocalePath()`.
5. Update relevant navigation in `SiteHeader.vue`, `SiteFooter.vue` and page links.
   Keep shared external destinations in `app/data/site.ts`.
6. Verify the page in all locales, including navigation, assets and generated metadata.

Keep locale head links centralized in `app/app.vue` through `useLocaleHead({ seo: true })`.
Retain the three configured language alternates and `x-default`, one canonical, and the generated OG locales.
The standalone `app/error.vue` uses localized `error.*` copy, preserves HTTP status, emits noindex metadata/headers and omits canonical/hreflang links.
Its recovery links clear the error before redirecting; do not register error pages in the sitemap.
Use the configured base URL rather than hardcoding a domain in individual pages.
The final domain is awaiting confirmation; do not silently replace deployment URLs with `keola.tv`.
See [SEO.md](.agents/docs/SEO.md) for metadata ownership, image sitemaps, indexing and launch verification.
The site name is `Keola Kumaneko`; keep existing branded titles from receiving a second suffix.
Fonts are self-hosted with Fontsource and swap; do not add a duplicate Google Fonts stylesheet.

## Vue, TypeScript And Styling

- Follow the existing SFC order: `<template>`, `<script setup lang="ts">`, then `<style lang="scss" scoped>`.
  Use Composition API, typed props and events, and explicit `import type` for shared types.
  Keep TypeScript strict mode enabled.
- Prefer Nuxt auto-imports for Vue/Nuxt composables and components; explicitly import shared data and library dependencies.
  Component auto-registration has `pathPrefix: false`.
- Keep browser globals, DOM access and browser-only libraries in client plugins, mounted hooks or event handlers.
  Initial rendering must work on the server and hydrate consistently.
- Reuse existing components for actual shared behavior.
  Keep page-specific layout and styling with the page instead of expanding global CSS or introducing a parallel UI system.
- The default layout mounts `SiteHeader`, `SiteFooter` and `SiteTooltip`.
  Use `data-tooltip` on controls that benefit from supplemental hover and keyboard-focus text; keep the action understandable on touch without the tooltip.
- Sass tokens are injected by `nuxt.config.ts`; use them without repeating the variables import in every component.
  Prefer the existing color, typography and breakpoint variables.
- Follow `.editorconfig`, `.prettierrc` and `eslint.config.mjs`: UTF-8, two-space indentation, LF for new files, single quotes and no semicolons in TypeScript.
  Format only relevant files.

## Localization And Content Boundaries

French is the source language.
Add, rename or remove keys in `fr-FR.json`, `en-US.json` and `ja-JP.json` together.
Keep the same nesting and interpolation names such as `{number}`, `{total}`, `{name}` and `{year}` across locales.

| Key area                   | Content                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `site.*`                   | Shared navigation, actions and site identity                    |
| `social.*`                 | Social-link descriptions                                        |
| `seo.<page>.*`             | Page title and description                                      |
| `components.<component>.*` | Copy and controls owned by a component, including image viewers |
| `home.*`                   | Home-page content rendered directly by the page                 |
| `keola.*`                  | Keola page content rendered directly by the page                |
| `gallery.*`                | Fanart descriptions, page actions and credit note               |
| `credits.*`                | Contributor page and translated role names                      |
| `archives.*`               | Historical events and artwork descriptions                      |
| `media.*`                  | Media kit and professional contact                              |

Keep each component's own messages under `components.<component>.*` even if it is currently used on one page.
Shared labels and content data remain under their site or page namespace; do not duplicate them solely because a component reads them.

Put authored UI copy, tooltips, accessible labels and image descriptions in the locale files, not directly in templates.
Keep proper names and verified credit/link data in the shared data source.
Check longer English labels and Japanese wrapping in context.
Preserve confirmed names such as `Keola Kumaneko` and `Temple Kumaneko` in Latin script across all locales.
Keep the official spelling, capitalization and punctuation of brands and work titles while translating the surrounding prose.

Do not invent artist credits, permissions, media-kit updates, personal details or legal copy; ask for unresolved facts.

## Artwork, Icons And Interaction

- Use supplied artwork under `public/images/` and preserve filenames and aspect ratios.
  Reference public files with `/images/...`, without a `/public` prefix.
  Add published assets only when used by the site; verify references before removing files.
- Use `Image` for artwork.
  It renders one native `img`, defaults to lazy loading and asynchronous decoding, and preserves proportions within its container.
  Intrinsic artwork dimensions live in `app/data/imageDimensions.ts`; update them when adding or replacing artwork.
  Supply both `width` and `height` for other raster assets.
  Use `loading="eager"` for the brand, hero and opened lightbox, plus `fetchpriority="high"` for the hero.
  Pages own layout sizing; the component does not generate resized files.
  Gallery previews, the lightbox and downloads all use the original public assets.
- Treat `fanartNumbers` in `app/data/site.ts` as the shared gallery sequence (currently 1–113).
  Preserve its order and check the files before adding entries.
  Both the home preview and full gallery consume it.
  Do not infer authorship from filenames.
- Social logos use Nuxt Icon's `keo-icon:` collection from `app/assets/svg/`; interface symbols use `lucide:` names.
  `nuxt.config.ts` includes custom collections in the client bundle so dynamic social icon names need no runtime icon request.
  Use standalone SVGs with a root `viewBox`, `mode="svg"`, explicit size and `aria-hidden="true"` when
  link text or an accessible link label already supplies the name.
- Show complete artwork in galleries and the viewer.
  Use buttons for image-opening actions and preserve lightbox arrow-key navigation, Escape, focus containment and focus return.
  Keep image downloads labeled with their actual format.
- Preserve visible focus, the skip link, logical headings, readable contrast and at least 44px touch targets.
  Mobile navigation must expose its expanded state and close on navigation or Escape.
  Do not make essential actions hover-only.

## Mobile Experience Acceptance Criteria

Every page must offer a polished mobile experience in FR, EN and JA.
Preserve access to core content and actions across screen sizes;
simplify decoration and rearrange content rather than hiding functionality to make a desktop design fit.

| Area                  | Required outcome                                                                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Composition           | Clear identity, content hierarchy and primary action on small screens; no page-level horizontal overflow or clipped content                           |
| Readability           | Comfortable text and wrapping in all locales; content remains usable at 200% text enlargement and browser zoom stays enabled                          |
| Touch controls        | Standalone controls have at least 44 by 44 CSS px hit areas with space between adjacent actions; no essential hover-only or gesture-only behavior     |
| Navigation            | Menu, language switcher and primary actions remain discoverable, reachable and operable with touch and keyboard                                       |
| Viewport and overlays | Sticky UI, menus and dialogs fit short screens and landscape; browser toolbars and safe areas never cover their controls                              |
| Artwork               | Gallery images retain their composition; viewers have visible close and previous/next controls and restore the visitor's place on dismissal           |
| Loading and motion    | Text and primary actions appear promptly; appropriately sized images reserve layout space; decoration does not delay interaction or cause scroll jank |
| Feature access        | Watch, schedule, community, gallery, credits, archives and media/contact journeys work without desktop-only affordances                               |

Use [keola-layout](.agents/skills/keola-layout/SKILL.md) for implementation and
[keola-review](.agents/skills/keola-review/SKILL.md) for the mobile acceptance pass.
These are project requirements, not claims that the current implementation has passed them.

## Design And Content

The confirmed anchor is orange `#FF7B00` and Keola's red-panda artwork.
Use warm paper, plum and small lilac spirit accents; green is at most a supporting nature detail.
Carrd used Kaushan Script for Keola's name.
Keep that signature sparingly, Zen Maru Gothic for warm headings/Japanese, and Plus Jakarta Sans for compact body/UI text.

| Reference             | Source                                                                               | Use for                                    |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ |
| Brand evidence        | [.agents/docs/](.agents/docs/)                                                       | Confirmed facts vs proposed visual choices |
| Visual direction      | [.agents/skills/keola-design/SKILL.md](.agents/skills/keola-design/SKILL.md)         | Palette, typography, art hierarchy         |
| Responsive layout     | [.agents/skills/keola-layout/SKILL.md](.agents/skills/keola-layout/SKILL.md)         | Mobile and desktop composition             |
| UI components         | [.agents/skills/keola-components/SKILL.md](.agents/skills/keola-components/SKILL.md) | Controls, galleries and footer             |
| Copy and localization | [.agents/skills/keola-content/SKILL.md](.agents/skills/keola-content/SKILL.md)       | French-first voice and translated text     |
| Visual QA             | [.agents/skills/keola-review/SKILL.md](.agents/skills/keola-review/SKILL.md)         | Brand, accessibility and responsive checks |
| Accessibility         | [.agents/docs/accessibility.md](.agents/docs/accessibility.md)                       | Accessibility ownership and release audit  |

## Technical Skills

Use the matching skill for implementation details;
the design and content skills above remain responsible for visual direction and editorial voice.

| Skill             | Source                                                                                 | Use for                                             |
| ----------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------- |
| i18n              | [.agents/skills/i18n/SKILL.md](.agents/skills/i18n/SKILL.md)                           | Translation parity, reactive copy and locale routes |
| Nuxt/Vue patterns | [.agents/skills/nuxt-vue-patterns/SKILL.md](.agents/skills/nuxt-vue-patterns/SKILL.md) | Pages, components, SSR and client integrations      |
| SEO               | [.agents/skills/seo/SKILL.md](.agents/skills/seo/SKILL.md)                             | Localized metadata, social previews and indexing    |
| Accessibility     | [.agents/skills/accessibility/SKILL.md](.agents/skills/accessibility/SKILL.md)         | Semantics, focus, motion and accessible interaction |

## Tool Integration And Scoped Instructions

`.github/copilot-instructions.md` is the concise Copilot entry point.
Keep shared rules here; do not duplicate them in tool-specific files or create Claude/Codex/...-specific config.

Before editing files, read and follow the relevant scoped instructions listed below.
This applies to all coding agents, including Codex.
For Codex, use the table's applicability column to select files to read; do not rely on automatic processing of Copilot's `applyTo` metadata.

| File                                                                                                     | Applies to                        |
| -------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [.github/instructions/nuxt.instructions.md](.github/instructions/nuxt.instructions.md)                   | Nuxt, Vue and composables         |
| [.github/instructions/styles.instructions.md](.github/instructions/styles.instructions.md)               | Scoped SCSS and responsive design |
| [.github/instructions/i18n.instructions.md](.github/instructions/i18n.instructions.md)                   | FR/EN/JA translations             |
| [.github/instructions/accessibility.instructions.md](.github/instructions/accessibility.instructions.md) | Interactive accessibility work    |

## Verification

For code or configuration changes, run `yarn format:check`, `yarn typecheck`, `yarn lint`, and `yarn build`.
CI currently installs dependencies immutably and runs lint only; it does not replace the other required local checks.
There is no automated test script in `package.json`.

For documentation-only changes, check the changed Markdown's formatting, links and accuracy against the source.
`format:check` does not include `.md` files ; use an explicit Prettier file check for this guide.

For page, style or interaction changes, check all locales at 320, 375, 430, 768, 1024 and 1280px+ widths, including 320x568.
Verify direct image loading, reserved image space, no horizontal overflow, header/menu behavior, internal links and anchors, language switching, keyboard focus, lightbox controls and reduced motion.
Check titles, descriptions, canonical/hreflang links and OG images when routes or metadata change.

Treat the mobile acceptance criteria above as part of completion for UI changes.
Exercise affected journeys with touch input, in portrait and landscape, and with enlarged text.
For shared UI changes, cover all pages that use it.
Before release, verify iOS Safari and Android Chrome, preferably on real devices; desktop viewport emulation alone does not establish mobile browser compatibility.
Check a throttled mobile connection and CPU for loading stability and responsive interaction.
Record the browser/device, locale, viewport and journey checked, and explicitly report any unavailable coverage rather than claiming mobile readiness from a build or screenshot.

Vercel must use the Nuxt preset, `yarn install --immutable` and `yarn build`.
Leave the Output Directory override disabled so the Nuxt/Nitro integration controls deployment output.
Images use the same direct `/images/...` URLs locally and on Vercel.
After deployment, verify those requests return HTTP 200 with an image content type.
Responsive CSS changes display size; visitors download the original assets.
Build/preview behavior depends on `NODE_ENV`, `VERCEL_ENV` and build-time `NUXT_SITE_URL` in `nuxt.config.ts`.
Development uses localhost; Vercel previews use their `VERCEL_URL` origin with indexing disabled.
Production and local production builds use the production origin and allow indexing.
Inspect resolved metadata, robots and sitemaps in each environment.
Use `/robots.txt?mockProductionEnv` to inspect production-style rules locally; blocked development output does not mean production policies were removed.
Check Unhead metadata warnings as well as hydration and translation errors in the development browser console.

Report what changed, checks actually run and any remaining limitations.
Do not claim browser, locale or build validation that was not performed.
