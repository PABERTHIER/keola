# Keola Kumaneko

![Keola Kumaneko with orange pom-poms against a blue sky][readme-image]

[![Build][build-badge]][build-link]
[![Release][release-badge]][release-link]

A server-rendered website for Keola Kumaneko, a red-panda VTuber and the Petits Esprits community.

Here it is: [keola][release-link]

It uses Vercel for deployment and hosting.

## Explore The Site

| Page      | Route           | Purpose                                       |
| --------- | --------------- | --------------------------------------------- |
| Home      | `/fr`           | Keola, schedule link, fanart and her causes   |
| Keola     | `/fr/keola`     | Keola's profile, lore and model gallery       |
| Gallery   | `/fr/gallery`   | Fanart collection and image viewer            |
| Credits   | `/fr/credits`   | Creators named on the previous site           |
| Archives  | `/fr/archives`  | Historical 2023 and 2024 events               |
| Media kit | `/fr/kit-media` | Existing media sheet and professional contact |

Replace `/fr` with `/en` or `/ja` for English or Japanese.
`/` detects the visitor's language; French is the default when no preference is detected.
The schedule opens Keola's official Twitch schedule; this website does not invent live dates or status.
The gallery viewer supports keyboard navigation and Escape.

## Develop Locally

Use a current Node.js 24 release and Corepack. Yarn 4 is pinned in `package.json`.

Install the Volar VSCode extension.

Enable the Yarn launcher once when setting up Node.js:

```bash
# enable corepack
corepack enable
```

After enabling Corepack, `yarn` automatically uses the version pinned in `package.json`.
If the launcher is unavailable, use `corepack yarn <command>`.
If PowerShell blocks `yarn.ps1`, use `yarn.cmd <command>` instead.

Install the locked dependencies:

```bash
yarn install --immutable
```

### Development Server

Start the development server, normally on <http://localhost:3000>:

```bash
yarn dev -o
```

### Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

| Command                       | Use                                                                |
| ----------------------------- | ------------------------------------------------------------------ |
| `yarn format:check`           | Check authored Vue, TypeScript, SCSS and locale JSON formatting    |
| `yarn format`                 | Format those files; prefer targeting changed files for small edits |
| `yarn typecheck`              | Check Nuxt and Vue types                                           |
| `yarn lint`                   | Run ESLint and its Prettier integration                            |
| `yarn lint:fix`               | Apply lint fixes; review the resulting edits                       |
| `yarn build` / `yarn preview` | Build SSR output and preview it locally                            |
| `yarn profile`                | Profile a Nuxt build                                               |
| `yarn generate`               | Generate static output; not the Vercel SSR deployment command      |
| `yarn postinstall`            | Prepare Nuxt generated types; runs after installation              |

`format:check` and `format` exclude Markdown and root config files.
CI currently runs `yarn lint` after an immutable install; run formatting, typecheck and build locally for code or config changes.

## Direct Dependencies

The table covers direct `package.json` entries without tying this guide to their versions.
Entries in the last row have no direct import in authored source or configuration and need a toolchain check before any removal.

| Dependency                                                                                               | Why it is present                                          |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `nuxt`                                                                                                   | Server rendering, pages, build and preview                 |
| `@nuxtjs/i18n`                                                                                           | Localized routes and translations                          |
| `@nuxtjs/seo`                                                                                            | SEO modules, including sitemap and structured data         |
| `@nuxt/icon`, `@iconify-json/lucide`                                                                     | Custom social logos and Lucide interface icons             |
| `@fontsource/kaushan-script`, `@fontsource/plus-jakarta-sans`, `@fontsource/zen-maru-gothic`             | Locally served fonts                                       |
| `lenis`                                                                                                  | Smooth scroll integration                                  |
| `@nuxt/eslint`, `eslint`, `eslint-plugin-prettier`, `eslint-config-prettier`, `prettier`                 | Lint and formatting tools                                  |
| `typescript`, `vue-tsc`, `@types/node`                                                                   | Nuxt, Vue and Node type checking                           |
| `sass`                                                                                                   | SCSS compilation                                           |
| `@nuxt/types`                                                                                            | Explicit `tsconfig.json` type entry                        |
| `@vue/composition-api`, `@nuxt/eslint-config`, `@nuxtjs/eslint-config-typescript`, `globals`, `rolldown` | Existing direct entries; current direct use is unconfirmed |

## Project Map

| Location                              | Responsibility                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `.agents/`                            | Source brand evidence, design docs and shared skills                                              |
| `.github/workflows/ci.yml`            | Immutable install and lint CI job                                                                 |
| `app/pages/`                          | Localized Nuxt routes                                                                             |
| `app/components/`, `app/layouts/`     | Shared brand, navigation, tooltip and page UI                                                     |
| `app/data/site.ts`                    | Verified links, fanart order and creator credits                                                  |
| `app/composables/usePageSeo.ts`       | Translated titles and social metadata                                                             |
| `app/styles/`                         | Tokens (`variables`), base rules (`default`), reusable classes (`shared`) and cursors (`cursors`) |
| `app/router.options.ts`               | Scroll restoration and anchor behavior via Lenis                                                  |
| `app/plugins/smooth-scroll.client.ts` | Client-only Lenis setup and cleanup                                                               |
| `app/data/imageDimensions.ts`         | Original artwork dimensions for reserved image space                                              |
| `i18n/locales/`                       | Matching FR/EN/JA keys and page copy                                                              |
| `.prettierrc`, `.editorconfig`        | Formatting and file conventions                                                                   |
| `nuxt.config.ts`                      | Modules, locale routing, styling, URLs and SSR setup                                              |
| `package.json`, `.yarnrc.yml`         | Scripts, direct dependencies and Yarn linker                                                      |
| `tsconfig.json`, `eslint.config.mjs`  | Strict type configuration and lint rules                                                          |
| `public/images/`                      | Published artwork and downloads                                                                   |

Each named page lives in `app/pages/<route>/index.vue` (for example, `app/pages/gallery/index.vue`).
The homepage stays at `app/pages/index.vue`.
`app/layouts/default.vue` supplies `SiteHeader`, `SiteFooter` and `SiteTooltip`.
The tooltip reads localized `data-tooltip` text from controls on mouse hover or keyboard focus; controls must remain clear on touch without it.

Artwork belongs to its artists.

## Architecture And Design

Nuxt 4 SSR, Vue 3 Composition API, TypeScript **6**, Yarn 4, and scoped SCSS.
The shared `Image` component renders native images, `@nuxtjs/i18n` serves three locales and generates canonical/alternate links through `app/app.vue`, and `@nuxtjs/seo` provides the sitemap and structured site metadata.
Fonts are bundled locally: Kaushan Script for Keola's signature, Zen Maru Gothic for headings/Japanese and Plus Jakarta Sans for compact UI copy.
Orange `#FF7B00` is the confirmed brand accent; warm paper and plum carry the visual direction, with lilac kept to small spirit accents.

Read [AGENTS.md](AGENTS.md) for code conventions, the component and page workflow, and the map of Keola skills and Copilot instructions.

## Deploy On Vercel

Select the Nuxt preset, install with `yarn install --immutable` and build with `yarn build`.
Leave the Output Directory override disabled; Nuxt/Nitro prepares the Vercel deployment output.
Use Node.js 24 and the Yarn version pinned in `package.json`.
Do **not** use `nuxt generate` as this server-rendered app's Vercel build target.

Images are served directly from `public/images/` on every host.
No image service, provider configuration or transformation endpoint is needed.
After deployment, confirm image requests such as `/images/logo.webp` return HTTP 200 with an image content type in the browser's Network panel.

## Use Icons

Social logos live in `app/assets/svg/` and use the `keo-icon:` collection configured in `nuxt.config.ts`.
Custom collections are explicitly included in the client bundle, so dynamic names from `app/data/site.ts` need no runtime icon request.
Interface icons continue to use `lucide:`.
These SVGs are build inputs, not public URLs.

```vue
<Icon name="keo-icon:twitch-logo" mode="svg" :size="26" aria-hidden="true" />
```

Use standalone SVGs with a root `viewBox`.
Provide visible link text or an accessible label on controls and hide redundant icons from assistive technology.
The collection is processed during the Nuxt build and needs no Vercel asset provider.

## Use Images

Use [Image.vue](app/components/Image.vue) for artwork:

```vue
<Image src="/images/misc/Mediakit.webp" :alt="t('media.preview_alt')" />
```

It renders a single native `img`, with lazy loading, asynchronous decoding and proportional sizing by default.
Classes, styles, native attributes and image events pass through to that element.
Use `loading="eager"` for the brand, hero and opened lightbox, and `fetchpriority="high"` for the hero.

[imageDimensions.ts](app/data/imageDimensions.ts) records each artwork's original pixel dimensions so the browser reserves its space before loading.
Update its entry when adding or replacing artwork, or supply both `width` and `height` directly.
The component works without an entry, but cannot reserve its aspect ratio in advance.

Pages control layout using CSS grids, columns and container widths.
Images shrink to fit their containers; gallery artwork stays complete.
The gallery uses a preferred 16rem column width and a maximum of four columns, adapting without JavaScript sizing.
Responsive display does not reduce download size: every device receives the original WebP.
Keep source files reasonably sized; no resized variants are generated.

[readme-image]: public/images/og-image.webp

[build-badge]: https://github.com/PABERTHIER/keola/actions/workflows/ci.yml/badge.svg
[build-link]: https://github.com/PABERTHIER/keola/actions/workflows/ci.yml

[release-badge]: https://deploy-badge.vercel.app/?url=https://keola.vercel.app/&name=website
[release-link]: https://keola.vercel.app
