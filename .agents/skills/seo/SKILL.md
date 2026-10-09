---
name: seo
description: Implement or review Keola's localized page metadata, canonical and hreflang links, Open Graph images, structured identity and indexing configuration. Use when routes, metadata or deployment URLs change, or for an SEO audit.
---

# Keola SEO

Follow [AGENTS.md](../../../AGENTS.md) for verified content and required checks.
Read [SEO.md](../../docs/SEO.md) for maintenance, deployment behavior and launch checks.
Inspect source and rendered output before changing metadata.

## Ownership

| Concern                                                      | Owner                                             |
| ------------------------------------------------------------ | ------------------------------------------------- |
| Page routes, schema types, social images and sitemap artwork | `app/data/seo.ts`                                 |
| Translated titles and descriptions                           | `seo.<page>.*` in all three locales               |
| Reactive OG/X metadata and page JSON-LD                      | `app/composables/usePageSeo.ts`                   |
| Canonical, hreflang, language/direction and OG locales       | `app/app.vue` with `useLocaleHead({ seo: true })` |
| Full brand name and verified profile URLs                    | `app/data/site.ts`                                |
| Image dimensions                                             | `app/data/imageDimensions.ts`                     |
| Site URL, indexability, sitemap and Person identity          | `nuxt.config.ts`                                  |

## Page changes

Keep the page call `useHead(usePageSeo('gallery'))`.
Add new identities to `pageSeo`; `PageName` is derived from that registry.
Add title/description keys in FR/EN/JA using [i18n](../i18n/SKILL.md).
Reuse image-description keys when possible.
Update the social image path, alt key, dimensions and MIME type together.
Titles should be specific and branded with Keola Kumaneko; preserve `%s` as the title template and never use `|` in translations.

Use filenames and existing descriptions to select artwork unless visual analysis is requested.
Previews use original public WebP files; portrait images may be cropped by platforms.
Sitemap artwork must belong to the page or its viewer.
Automatic image discovery requires prerendering; the explicit registry supports SSR.
Preserve `fanartNumbers` as the gallery sequence.
Do not add fictional modification dates, priorities, keywords, article metadata or unsupported structured claims.

## URLs, identity and indexing

Keep canonical/alternate generation centralized; no second per-page hreflang list.
Queries/fragments must not become page identities.
Confirm reciprocal localized links and French `x-default`.
Keep root language detection dynamic, not prerendered.

`NUXT_SITE_URL` is the production origin, set at build time in Vercel's Production scope only; the fallback is `https://keola.vercel.app`.
Leave it unset in Preview/Development because Site Config also reads it as a higher-priority override.
Keep Vercel system environment variables enabled for preview detection.
Do not silently switch to `keola.tv`.
Development uses localhost; preview uses its `VERCEL_URL` origin with indexing disabled.
Production/local production builds are indexable by default.
Keep I18n and Site Config URL consumers aligned and test the actual environment.

Nuxt Schema.org owns WebSite/Person; the helper extends WebPage and primary image.
Preserve reactive navigation, the AboutPage's Person reference and verified profile links.
Use truthful schema types, never invented events or reviews.
Keep `schemaOrg.reactive` and the Unhead treeshake exclusion for `app/composables/usePageSeo.ts` together with the helper's reactive schema URL/path template parameters.
The installed Unhead transform otherwise removes page schema calls on the client.
Recheck hydration and navigation after any dependency upgrade before simplifying this setup.

Nuxt Robots merges `public/_robots.txt`, including its existing content-use policy.
Keep `robotsContent` shared between the root robots options, `usePageSeo` and the error page so HTTP/SSR and client recovery agree.
Let the sitemap module supply its URL.
Do not hardcode a second sitemap host.
Fonts already load locally with swap; no Google Fonts link is missing.
Use `/robots.txt?mockProductionEnv` to inspect production-style rules locally; the blocked development output intentionally omits the production group.
The installed Unhead validator deprecates Twitter tags (except for twitter:card and twitter:site); use complete Open Graph metadata.
Keep three configured hreflang alternates plus `x-default`; preserve the generated OG locale tags.
Only add `worksFor` for a verified employer; `VTuber` is the confirmed job title.
A Person does not have a `logo` property.

## Error pages

`app/error.vue` owns the standalone localized error shell and `error.*` messages.
Preserve HTTP status, emit noindex metadata/headers, omit canonical/hreflang and provide complete valid OG metadata.
Do not register error pages in the sitemap. Recovery must clear the error and reach a valid localized route.
Verify 404 and generic-error behavior, keyboard/touch recovery and responsive layouts with the review skill.

## Verification

Run required application checks and check edited Markdown/root config formatting.
Inspect SSR HTML for all affected locales: one title/description/canonical, correct alternates, localized social cards, absolute image URLs and consistent JSON-LD.
Switch pages/locales without reloading and ensure metadata and schema update.
Check assets, dimensions, robots headers/meta, sitemap index and child image entries.
Verify root language redirects, query/trailing-slash normalization and HTTP 404s.
Test production and non-indexable preview behavior separately.
Check all Unhead console warnings in development, not only hydration errors.
Report unavailable deployment, external validator and Search Console coverage rather than claiming it.
