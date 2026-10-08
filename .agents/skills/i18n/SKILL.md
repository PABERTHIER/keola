---
name: i18n
description: Add, change or review Keola's FR/EN/JA translation keys, interpolation, locale-aware navigation and reactive translated UI. Use for localization implementation; use keola-content for editorial voice.
---

# Keola Internationalization

Follow [AGENTS.md](../../../AGENTS.md) for shared constraints and verification.
Inspect the affected locale entries and their consumers before editing;
translations must match the page's actual behavior and confirmed content.

## Locale And Key Map

| Route code | Language | Source file                                             |
| ---------- | -------- | ------------------------------------------------------- |
| `fr`       | French   | [fr-FR.json](../../../i18n/locales/fr-FR.json) (source) |
| `en`       | English  | [en-US.json](../../../i18n/locales/en-US.json)          |
| `ja`       | Japanese | [ja-JP.json](../../../i18n/locales/ja-JP.json)          |

Use existing namespaces: `site`, `social`, `seo`, `components`, `home`, `keola`, `gallery`, `credits`, `archives` and `media`.
Keep copy owned by a component under `components.<component>.*`, even when that component currently appears on one page.
Shared labels and content data stay under their site or page namespace.
Search for an existing label before adding a key.
Page SEO uses `seo.<page>.title` and `seo.<page>.description`;
key identities such as `gallery` and `media` differ from route segments `/gallery` and `/kit-media`.

## Changing Messages

- Add, rename and remove keys across all three files together.
  Keep their nested structure and interpolation names identical, including `{number}`, `{total}`, `{name}` and `{year}`.
  Update consumers in the same change.
- Search both literal and dynamically constructed keys.
  In particular, `usePageSeo` builds `seo.${page}.*` and contributor roles come from shared data;
  absence of a literal key in a template does not prove it is unused.
- Keep authored copy, alt text, tooltips and accessible names in locale JSON.
  Keep verified names, destinations and credit identities in `app/data/site.ts`.
  Decorative images must not retain empty alt text, prefer a spoken description.
- Adapt French naturally into English and Japanese.
  Keep confirmed names such as `Keola Kumaneko` and `Temple Kumaneko` in Latin script in all three locales.
  Preserve official spelling, capitalization and punctuation for brands and work titles while translating the surrounding prose.
  Ask for any unresolved official terminology.
  Consult [keola-content](../keola-content/SKILL.md) when writing new prose.
- Never use `|` as punctuation: Vue I18n interprets it as plural syntax.
  Keep messages as plain text unless the task actually needs structured rich text; do not introduce `v-html` to render translations.

## Reactive Copy And Routes

Call `t()` directly in templates.
When translated values are stored in script-side objects or arrays, derive them in `computed()` so a locale switch updates them.
Do not freeze a translation by evaluating `t()` once during setup.

```ts
const { t } = useI18n()
const localePath = useLocalePath()
const galleryLabel = computed(() => t('site.gallery'))
```

Use `localePath('/gallery')` for internal links and `localePath({ path: '/', hash: '#about' })` for home anchors.
Use `useSwitchLocalePath()` to change language on the current page, following [SiteHeader.vue](../../../app/components/SiteHeader.vue).

The `prefix` strategy includes `/fr`; do not hardcode locale prefixes in components.
Browser-language detection runs at `/` and uses the `i18n_redirected` cookie.
Test root redirection separately from an explicit localized route, including a fresh cookie state when relevant.
Do not assume every visitor to `/` is sent to French.

## Verification

Compare key paths and placeholder sets across all three JSON files, including dynamic key families touched by the change.
Confirm JSON parses and messages compile with the application checks in AGENTS.md.
Fallback French can hide a missing key, so visible text alone is insufficient evidence of parity.

On affected pages, switch FR/EN/JA without reloading and check labels, metadata, alt text and interpolation.
Check longer labels and Japanese wrapping at the required viewport sizes.
For page metadata changes, also use [seo](../seo/SKILL.md).
