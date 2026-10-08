---
name: seo
description: Implement or review Keola's localized page metadata, canonical and hreflang links, Open Graph images, structured identity and indexing configuration. Use when routes, metadata or deployment URLs change, or for an SEO audit.
---

# Keola SEO

Follow [AGENTS.md](../../../AGENTS.md) for verified content, deployment and checks.
Inspect the existing metadata owners before editing.
Keep page-specific metadata in the shared flow instead of duplicating head tags in each page.

## Metadata Ownership

| Concern                      | Owner                                                           |
| ---------------------------- | --------------------------------------------------------------- |
| Title and descriptions       | `app/composables/usePageSeo.ts` and `seo.<page>.*` translations |
| OG image, URL and locale     | `app/composables/usePageSeo.ts`                                 |
| HTML language and alternates | `app/app.vue` using `useLocaleHead({ seo: true })`              |
| Site URL and identity        | `nuxt.config.ts`: `site`, `schemaOrg`, i18n and runtime config  |
| Social preview artwork       | `public/images/og-image.webp`                                   |

## Page Metadata Changes

Use the existing page call, for example `useHead(usePageSeo('gallery'))`.
For a new page, extend `PageName` in [usePageSeo.ts](../../../app/composables/usePageSeo.ts) and add its title and description in all three locale files.
Keep the helper's title and description reactive so they update on route and language changes.
Use [i18n](../i18n/SKILL.md) for key and placeholder parity.

Write a specific title and concise description of the page's actual content.
Keep Keola's name and confirmed subject matter natural in each language; avoid invented biography, current sponsorship, event dates or live status.
Preserve the existing `titleTemplate: '%s'` behavior so already branded titles are not branded twice.
Use a dash or other supported punctuation, never `|` in translated titles.

The existing pages use `ogType: 'website'`.
Do not add article metadata, keyword inventories or per-page app icons merely because another site's template includes them.

## Canonical, Alternates And Deployment URLs

Keep canonical and alternate-language generation in the locale-head integration in [app.vue](../../../app/app.vue).
Inspect rendered tags before adding overrides; avoid competing canonical tags or a second hand-built hreflang list.

Verify that each localized page has a canonical URL for that page and alternates for FR/EN/JA.
Check any generated `x-default` against the configured default locale and root routing behavior.
Preserve locale prefixes; query parameters and fragments must not accidentally become a second page identity in OG URLs.

Read URL configuration in [nuxt.config.ts](../../../nuxt.config.ts) when testing builds or previews.
The current configuration uses localhost in development, `prodUrl` for Vercel production or local builds without `VERCEL_URL`, and `VERCEL_URL` for preview builds.
A successful build alone does not validate public metadata; inspect rendered URLs in each environment.
`site.url` and the runtime i18n base URL have separate consumers, so check their resolved output for unintended host mismatches.

Keep fixes within the requested scope.
Do not change the final public domain without confirmed input; `keola.tv` migration is still in progress.

## Images, Structured Data And Indexing

The helper currently declares `/images/og-image.webp` as WebP at 1444 by 840 pixels with translated `site.og_alt`.
If replacing it, verify the actual asset, dimensions, MIME type and absolute URL together.
The `ogImage` generation module is disabled; that does not remove the manually supplied OG metadata.

When auditing structured identity, verify every referenced asset and URL.
The configured identity logo is `/images/logo.webp`; `nuxt.config.ts` has a TODO to replace it with an SVG later. Do not assume that SVG exists.
Use confirmed identity data only; report missing evidence rather than inventing a logo or claims.

For an indexing or launch task, inspect the installed SEO modules' generated sitemap and robots output and the applicable environment settings.
Do not assume `public/_robots.txt` is the served `/robots.txt` or that preview deployments are automatically excluded from indexing.
Keep indexing changes within task scope.

## Verification

Run the required application checks for metadata or configuration changes.
Inspect server-rendered HTML on affected FR/EN/JA routes for a single intended title, description and canonical, correct alternates, localized OG values and valid URLs.
Then switch routes and locales in the browser to check that head values update.
Confirm the social image resolves; check sitemap, robots and structured data when those concerns changed.
Record actual checks and unresolved issues separately.
