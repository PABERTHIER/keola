# SEO maintenance

Keola Kumaneko uses server-rendered Nuxt pages, Nuxt I18n and the Nuxt SEO modules.
The site name is **Keola Kumaneko** in every locale. Page labels may still use Keola.

## Page metadata and artwork

Every page calls `useHead(usePageSeo('pageName'))` once.
The helper supplies reactive localized metadata, Open Graph and the page's Schema.org data.
The installed Unhead validator deprecates `twitter:*` metadata in favor of Open Graph (except for twitter:card and twitter:site).
Keep OG titles, descriptions, images and locales complete.
Titles already include the brand; keep `titleTemplate: '%s'` to avoid duplication.
Maintain `seo.<page>.title` and `.description` in all three locales, with French as the source.
Reuse an existing localized image description when possible.

[app/data/seo.ts](../../app/data/seo.ts) is the page registry:
route, Schema.org page type, social image, translated image-description key and sitemap artwork URLs.
Change `image` and `imageAlt` together to change a page's preview.
Actual image dimensions come from [imageDimensions.ts](../../app/data/imageDimensions.ts).

| Page      | Social image                                    |
| --------- | ----------------------------------------------- |
| Home      | `/images/og-image.webp`                         |
| Keola     | `/images/models/Keola_v3_portrait.webp`         |
| Gallery   | `/images/fanarts/fanart-92.webp`                |
| Credits   | `/images/keola/Keola_magnifying_glass.webp`     |
| Archives  | `/images/redpanda/RedPandathon_2024_goals.webp` |
| Media kit | `/images/misc/Mediakit.webp`                    |

These are existing WebP assets, served directly with their original proportions.
Social platforms can crop portrait artwork differently; check the rendered card on the target platform after deployment.
No generated image service is needed.
When replacing an asset, verify its MIME type, dimensions, file size and public URL.
Do not declare assumed 1200×630 dimensions for a differently sized image.

## URLs and indexing

`nuxt.config.ts` resolves one site URL for Site Config, I18n, social URLs and identity.
The production fallback remains `https://keola.vercel.app` until the final domain is confirmed.
No environment-variable change is needed while that fallback is the intended production address.
When a custom domain is ready, set `NUXT_SITE_URL` to its HTTPS origin in Vercel's project environment variables, scoped to **Production only**, then redeploy so the build reads it.
Leave it unset in Preview, Development and local `.env` files: Nuxt Site Config also reads this variable directly with higher priority than `site.url`, which can otherwise disagree with I18n's environment-specific origin.
Do not override only I18n's base URL at runtime.

| Environment                                  | Metadata URL                   | Indexing |
| -------------------------------------------- | ------------------------------ | -------- |
| `yarn dev`                                   | `http://localhost:3000`        | Disabled |
| Vercel preview/development with `VERCEL_URL` | That deployment's HTTPS origin | Disabled |
| Vercel production                            | Production origin              | Enabled  |
| Local production build without `VERCEL_ENV`  | Production origin              | Enabled  |

Preview pages, images, canonical URLs and sitemaps use the preview deployment's own origin, so newly added artwork and routes can be tested before production.
They remain non-indexable. Production uses `NUXT_SITE_URL` (or its fallback), regardless of `VERCEL_URL`.
Local production builds without deployment variables also use the production fallback.
Keep Vercel's system environment variables enabled; Vercel supplies `VERCEL_ENV` and `VERCEL_URL` automatically.
A deployed non-production branch, including one named `dev`, normally uses the Preview environment; the branch name itself does not select `VERCEL_ENV`.
`VERCEL_URL` is a hostname without a protocol, so the configuration adds `https://`.
If it is missing, the URL falls back to the production origin rather than producing `https://undefined`; a known preview/development environment remains non-indexable.
If `VERCEL_ENV` is also missing from a production build, the configuration treats it as local production and allows indexing, so disabling system variables is not a supported preview setup.
Nuxt Robots supplies robots meta, `X-Robots-Tag` and `/robots.txt` from the indexability setting.
Preview protection on the hosting platform remains useful; robots directives are not access control.

`app/app.vue` owns canonical URLs, hreflang, HTML language/direction and OG locales through `useLocaleHead({ seo: true })`.
I18n generates both short-language and region-specific aliases by default; these are valid, not duplicate canonicals.
The app retains only FR-FR, EN-US, JA-JP and `x-default`, matching the sitemap cluster, plus one canonical.
Keep `og:locale` and the two `og:locale:alternate` values; they are not replaced by hreflang links.
Do not add competing per-page canonicals.
Tracking queries, hashes and trailing slashes are absent from page identities.
`x-default` points to the equivalent French page. `/` remains a runtime language redirect based on the visitor's language/cookie; do not prerender that redirect.

## Sitemaps and robots

The module generates `/sitemap_index.xml`, with `/sitemap.xml` redirecting to it,
and child sitemaps `/__sitemap__/fr-FR.xml`, `/__sitemap__/en-US.xml` and `/__sitemap__/ja-JP.xml`.
Each locale has six canonical pages with reciprocal language alternates.
Follow the index rather than guessing child filenames.

Sitemap images come explicitly from `pageSeo.images`, so development and runtime SSR do not depend on a prerender crawler.
Gallery entries reuse `fanartNumbers`; preserve that sequence and check assets when adding artwork.
List content accessible on the page or in its viewer, not every file in `public/`.
Shared decorative artwork need not appear under every page.

"0 images" means that an entry has no image extensions, not that Google cannot discover its HTML images.
Explicit entries help discovery, particularly for artwork exposed through interactions.
Use `image:loc`; Google no longer documents the old image caption/title/license sitemap tags.
Do not add arbitrary priority/change frequency or manufacture `lastmod` dates from build time.
Add dates only from a real content-change source.

`public/_robots.txt` is merged by Nuxt Robots and preserves the existing `Content-Usage: train-ai=n` policy.
The sitemap module supplies the sitemap URL; do not add a hardcoded domain or another public `robots.txt`.
One sitemap-index declaration is enough: `/sitemap.xml` redirects to `/sitemap_index.xml`, so listing both repeats the same index.

Normal development and preview output deliberately contains `Disallow: /`.
Nuxt Robots replaces the entire group in non-indexable environments, so `Allow`, the sitemap and `Content-Usage` are not printed there.
They have not been removed from production.
To inspect the production-style rules locally, visit `http://localhost:3000/robots.txt?mockProductionEnv`; this development-only switch does not make the deployed preview indexable.
The installed Robots module appends imported groups during module setup. Repeated Nuxt config reloads can accumulate identical groups in development; restarting the dev server resets them.
This setup does not run for each production request: a fresh production build does not inherit the running dev server's accumulated groups.
Do not add duplicate-rule workarounds to the published policy for this development reload behavior; verify the deployed output after module upgrades.
Production includes `Allow: /`, the three locale allows, the existing content-use policy and one generated sitemap-index URL.
Healthy production pages also emit `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` as robots metadata and an HTTP header.
Development/preview pages and error pages use `noindex, nofollow` instead.
The directive strings are shared in `app/data/seo.ts` and passed to the root `robots` module options for HTTP/SSR behavior.
`usePageSeo` also emits the policy reactively so it is restored after client-side error recovery; head deduplication leaves one robots meta tag.

## Error pages

[app/error.vue](../../app/error.vue) handles Nuxt errors with localized `error.*` messages.
HTTP 404 has dedicated missing-page copy; other statuses use a generic message without exposing internal error details.
The error retains its HTTP status, sends noindex metadata and `X-Robots-Tag`, and supplies a nonempty description and valid absolute OG URL.
It has no canonical or language alternates because an invalid URL is not a translated content page.
Do not register errors in `pageSeo` or the sitemap.

The standalone error shell keeps recovery independent of normal navigation: its brand/home/gallery links call `clearError` and redirect to a valid localized route.
It includes a skip link, one main/H1 and the supplied magnifying-glass artwork with reserved dimensions.
Check keyboard and touch recovery, status preservation, localization, enlarged text and short viewports as well as metadata.

## Structured data and fonts

Nuxt Schema.org owns the WebSite and Person graph.
The Person uses verified public profiles from `app/data/site.ts`; never add credits, affiliations or claims without evidence.
Its name and URL remain present, and `jobTitle` is the verified role `VTuber`.
`worksFor` means an employer organization; leave it absent unless an actual employer is confirmed.
Twitch, sponsors and the Temple community are not evidence of employment.
The Person's `image` is its portrait; page-specific sharing artwork is a separate field.
`logo` is not a Person property.
The site's real logo remains in its UI and app icons.
The helper supplies WebPage/AboutPage/CollectionPage/ContactPage types and a localized primary ImageObject.
The Keola AboutPage references the Person.
Keep the graph reactive for navigation.
Do not invent articles, events, dates, reviews or FAQ content to obtain rich results.

Keep `schemaOrg.reactive: true` and the Unhead treeshake exclusion for `app/composables/usePageSeo.ts` together:
the installed transform otherwise removes this helper's `useSchemaOrg` call from the client.
The exclusion applies only to that file; other server-only composables retain their normal optimization.
The helper also updates schema URL/path template parameters so node IDs and actions follow navigation.
Recheck production hydration and navigation before removing these compatibility settings during a dependency upgrade.

Fonts are self-hosted through Fontsource with `font-display: swap`.
Do not add duplicate Google Fonts CSS, preconnects or external font requests.
Meta keywords, repeated app icons and blanket article tags add no useful setup here.

## Configuration decisions

| Setting                                    | Reason                                                                                                                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prodUrl` and `siteUrl`                    | Keep the configured production origin separate from the current environment's origin, then use the same resolved origin in I18n, Site Config, images and identity.               |
| `site.indexable` and root `robots` options | Control the environment's indexability and directive strings. `site.robots.index/follow` is not the Nuxt Robots configuration API.                                               |
| No root `nitro.prerender` crawl            | `/` is a request-dependent language redirect. Pages remain SSR; explicit sitemap images do not require prerendering. Add targeted prerender routes only for a demonstrated need. |
| No explicit `autoLastmod`                  | The installed sitemap module already defaults to false. No build-time dates are fabricated.                                                                                      |
| No returned `meta` array in `usePageSeo`   | Its former `og:title` entry is now supplied once by `useSeoMeta({ ogTitle })`; no metadata was lost.                                                                             |
| No `ogLocale` in `usePageSeo`              | `useLocaleHead` owns it, including the alternate locales. The standalone error page supplies its own locale.                                                                     |
| Registry-based `ogUrl`                     | `localePath(pageData.path)` resolves the intended localized page and excludes query/hash/trailing-slash variants. Its origin follows the environment.                            |
| Reactive schema and template parameters    | Preserve the correct page type, URL, identity references and images after hydration and client navigation. These are verified in production builds.                              |

## Verification and launch

Run `yarn format:check`, `yarn typecheck`, `yarn lint` and `yarn build`.
Check changed root config and Markdown explicitly with Prettier as well.
Inspect production SSR HTML on all 18 localized routes and test browser navigation:

- One title, description and canonical; correct localized content and full brand.
- Matching FR/EN/JA alternates, `x-default`, HTML language and OG locales.
- Query/hash-free canonical and OG URLs, distinct per-page social images, matching
  X/Twitter fields and localized JSON-LD without duplicate page entities.
- Images return HTTP 200 with image MIME types and matching declared dimensions.
- Three child sitemaps, six URLs each, no redirect/error URLs and populated images.
- Production allows indexing; preview and development return noindex directives.
- Root redirects respect language preferences; unknown URLs return HTTP 404.
- Error pages have noindex metadata/headers, no canonical/hreflang, valid OG metadata and working recovery links in all locales.
- Development browser console has no Unhead metadata warnings, missing translations or hydration errors; do not check only hydration messages.

After deployment, check public robots/sitemaps/assets, validate sample JSON-LD
with Google's Rich Results Test and Schema.org Validator, and inspect social cards.
Valid Person/WebPage data does not itself guarantee a Google rich result.
Verify the production property in Google Search Console and Bing Webmaster Tools,
submit the sitemap index, inspect localized URLs and monitor indexing.
Verification tokens must come from those accounts, never placeholders.

For the old-site migration, confirm the final origin, map old URLs to their closest
new localized equivalents and configure permanent redirects on the old host.
Update the production URL and rebuild before submitting the new sitemap.
External accounts, DNS and old-host redirects require access outside this repository.

## References

- [Vercel: system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables)
- [Vercel: environment variable scopes](https://vercel.com/docs/environment-variables/manage-across-environments)
- [Google: image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Nuxt Sitemap: URL data and source merging](https://nuxtseo.com/docs/sitemap/advanced/loc-data)
- [Fontsource: font display](https://fontsource.org/docs/getting-started/display)
- [Nuxt I18n: SEO](https://i18n.nuxtjs.org/docs/guide/seo)
- [Unhead: titles and legacy Twitter metadata](https://unhead.unjs.io/docs/head/guides/core-concepts/titles)
- [Schema.org: worksFor](https://schema.org/worksFor)
