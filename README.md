# Keola Kumaneko

![Keola Kumaneko with orange pom-poms against a blue sky][readme-image]

[![Build][build-badge]][build-link]
[![Release][release-badge]][release-link]

A server-rendered website for Keola Kumaneko, a red-panda VTuber and the Petits Esprits community.

Here it is: [keola][release-link]

It uses Vercel for deployment and hosting.

## Explore The Site

| Page      | Route           | Purpose                                        |
| --------- | --------------- | ---------------------------------------------- |
| Home      | `/fr`           | Keola, upcoming streams, fanart and her causes |
| Gallery   | `/fr/galerie`   | All 36 supplied fanarts in newest-first order  |
| Credits   | `/fr/credits`   | Creators named on the previous site            |
| Archives  | `/fr/archives`  | Historical 2023 and 2024 events                |
| Media kit | `/fr/kit-media` | Existing media sheet and professional contact  |

Replace `/fr` with `/en` or `/ja` for English or Japanese. `/` redirects to French.
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

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Development Server

Start the development server on <http://localhost:3000>

```bash

# yarn
yarn dev -o


# fix lint
yarn lint --fix
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

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

`yarn format` formats authored Vue/TypeScript/SCSS, locales and project documentation.
It deliberately excludes the supplied artwork and brand-source docs.
The same checks run on Linux in `.github/workflows/ci.yml` with an immutable Yarn install.

## Project Map

| Location                          | Responsibility                                       |
| --------------------------------- | ---------------------------------------------------- |
| `app/pages/`                      | Localized Nuxt routes                                |
| `app/components/`, `app/layouts/` | Shared brand, navigation and page UI                 |
| `app/data/site.ts`                | Verified links, fanart order and creator credits     |
| `app/composables/usePageSeo.ts`   | Translated titles and social metadata                |
| `app/styles/`                     | SCSS design tokens and minimal shared rules          |
| `i18n/locales/`                   | Matching FR/EN/JA keys and page copy                 |
| `public/images/`, `public/icons/` | Images and SVG icons used on the published site      |

Each named page lives in `app/pages/<route>/index.vue` (for example, `app/pages/galerie/index.vue`).
The homepage stays at `app/pages/index.vue`.

Artwork belongs to its artists.

## Architecture And Design

Nuxt 4 SSR, Vue 3 Composition API, TypeScript **6**, Yarn 4, and scoped SCSS.
The shared `Image` component renders native images, `@nuxtjs/i18n` serves three locales, and `@nuxtjs/seo` provides sitemap, canonical and alternate-language metadata.
Fonts are bundled locally: Kaushan Script for Keola's signature, Zen Maru Gothic for headings/Japanese and Plus Jakarta Sans for compact UI copy.
Orange `#FF7B00` is the confirmed brand accent; warm paper and plum carry the new visual direction, with lilac kept to small spirit accents.

## Deploy On Vercel

Select the Nuxt preset, install with `yarn install --immutable` and build with `yarn build`.
Leave the Output Directory override disabled; Nuxt/Nitro prepares the Vercel deployment output.
Use Node.js 24 and the Yarn version pinned in `package.json`.
Do **not** use `nuxt generate` as this server-rendered app's Vercel build target.

Images are served directly from `public/images/` and `public/icons/` on every host.
No image service, provider configuration or transformation endpoint is needed.
After deployment, confirm image requests such as `/images/image01.webp` return HTTP 200 with an image content type in the browser's Network panel.

## Use Images

Use [Image.vue](app/components/Image.vue) for artwork and social logos:

```vue
<Image src="/images/mediakit.webp" :alt="t('media.preview_alt')" />
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
