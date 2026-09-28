# Keola Kumaneko

[![Build][build-badge]][build-link]
[![Release][release-badge]][release-link]

A static website for Keola Kumaneko, a red-panda VTuber and the Petits Esprits community.

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

Install Yarn:

```bash
# enable corepack
corepack enable
```

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

`corepack yarn format` formats authored Vue/TypeScript/SCSS, locales and project documentation.
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

Artwork belongs to its artists.

## Architecture And Design

Nuxt 4 SSR, Vue 3 Composition API, TypeScript **6**, Yarn 4, and scoped SCSS.
`@nuxt/image` optimizes local WebPs, `@nuxtjs/i18n` serves three locales, and `@nuxtjs/seo` provides sitemap, canonical and alternate-language metadata.
Fonts are bundled locally: Kaushan Script for Keola's signature, Zen Maru Gothic for headings/Japanese and Plus Jakarta Sans for compact UI copy.
Orange `#FF7B00` is the confirmed brand accent; warm paper and plum carry the new visual direction, with lilac kept to small spirit accents.

## Deploy On Vercel

Select the Nuxt preset, install with `corepack yarn install --immutable` and build with `corepack yarn build`.
Deploy as a server-rendered Nuxt app so Nuxt Image/IPX can transform WebPs.
Do **not** use `nuxt generate` as the Vercel build target.

[build-badge]: https://github.com/PABERTHIER/keola/actions/workflows/ci.yml/badge.svg
[build-link]: https://github.com/PABERTHIER/keola/actions/workflows/ci.yml

[release-badge]: https://deploy-badge.vercel.app/?url=https://keola.vercel.app/&name=website
[release-link]: https://keola.vercel.app
