# Keola — Design & Implementation Guidance

This package contains design evidence and reusable implementation skills for **Keola Kumaneko**, a French red-panda VTuber.
Start with [AGENTS.md](../AGENTS.md) for shared project rules, architecture, commands and verification.

It intentionally focuses on:

- visual identity
- mood and art direction
- color system
- typography
- spacing, shape language and components
- responsive behavior
- interaction and motion
- content hierarchy
- AI-agent implementation rules

The design documents describe the identity and experience.
Technical skills apply those requirements to the Nuxt, Vue, TypeScript and FR/EN/JA implementation in this repository.
Read the skill relevant to the task; the catalogs do not require loading every skill for every change.

## Evidence level

Three kinds of decisions are used throughout the documentation:

- **Confirmed** — directly supported by the current website or public brand references.
- **Observed** — inferred from visible brand/material references.
- **Proposed** — a deliberate design recommendation for the new website.

These references informed the current Nuxt site.
Treat proposals as design guidance and verify implemented details in the source before changing them.

## Design References

| Reference                                      | Use for                                            |
| ---------------------------------------------- | -------------------------------------------------- |
| [Brand context](docs/brand-context.md)         | Personality, audience, themes and brand vocabulary |
| [Design system](docs/design-system.md)         | Visual system and proposed tokens                  |
| [UX principles](docs/ux-principles.md)         | Layout, accessibility and interaction              |
| [Accessibility](docs/accessibility.md)         | Accessibility ownership, audit and release checks  |
| [Content direction](docs/content-direction.md) | Tone, content hierarchy and editorial guidance     |

## Skills

| Skill                                                  | Use for                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| [keola-design](skills/keola-design/SKILL.md)           | Palette, artwork hierarchy and typography                    |
| [keola-layout](skills/keola-layout/SKILL.md)           | Responsive composition and navigation                        |
| [keola-components](skills/keola-components/SKILL.md)   | Visual language for controls, tooltips, galleries and footer |
| [keola-content](skills/keola-content/SKILL.md)         | French-first voice and microcopy                             |
| [keola-review](skills/keola-review/SKILL.md)           | Visual QA and accessibility review                           |
| [accessibility](skills/accessibility/SKILL.md)         | Accessibility audits, implementation and verification        |
| [i18n](skills/i18n/SKILL.md)                           | FR/EN/JA key parity, reactive copy and locale routes         |
| [nuxt-vue-patterns](skills/nuxt-vue-patterns/SKILL.md) | Pages, components, SSR and client integrations               |
| [seo](skills/seo/SKILL.md)                             | Localized metadata, social previews and indexing             |
