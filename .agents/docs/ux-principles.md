# Keola — UX Principles

## 1. Primary objective

The website should answer these questions quickly:

1. Who is Keola?
2. What is she doing now / next?
3. Where can I watch or follow her?
4. What is the red-panda mission?
5. What can I explore?
6. How can I join the community?

## 2. Current information architecture

### Primary

- Home
- Keola (`/keola`)
- Schedule (homepage section linking to Twitch)
- Gallery
- Community (homepage section linking to Discord)

### Secondary

- Archives
- Partners (homepage section)
- Credits
- Media Kit
- Support / Ko-fi
- Social links

## 3. Homepage sequence

Current order in `app/pages/index.vue`:

1. Hero
2. Schedule link and watch action
3. Short Keola introduction
4. Gallery preview
5. Red panda mission
6. Community
7. Partners
8. Closing invitation
9. Footer

## 4. Navigation rule

A visitor should reach any major destination in at most two interactions from the homepage.

## 5. Content density

Use progressive disclosure.

Do not expose every detail immediately.

Example:

- card → summary → dedicated page
- schedule → official Twitch schedule
- gallery → preview → full gallery

## 6. CTA hierarchy

One primary action per section.

Examples:

- Hero: "Watch on Twitch"
- Schedule: "See full planning"
- Conservation: "Discover Red Panda Network"
- Community: "Join Discord"

Avoid five competing buttons.

## 7. Responsive behavior

### Mobile

Priorities:

1. identity
2. current activity
3. primary CTA
4. schedule
5. community
6. secondary content

### Tablet

Use a two-column layout when it improves scanning.

### Desktop

Use asymmetric compositions and artwork overlap while maintaining a readable content column.

## 8. Interaction personality

Small interactions can express character:

- spirit follows cursor subtly
- tiny sparkle on CTA hover
- card illustration moves a few pixels
- tail/leaf motif appears on active navigation

Keep interactions optional and non-blocking.

## 9. Loading

Prioritize:

- hero text
- main character image
- current stream
- primary CTA

Decorative assets can load later.

## 10. Error / empty states

Even empty states should feel like the world.

Examples:

- "The little spirits are still preparing this page…"
- "Nothing planned here yet — check back soon."

Do not sacrifice clarity for the joke.

## 11. Accessibility tone

Playful copy must never obscure:

- what happened
- what action is available
- why the user is seeing the message

## 12. Mobile navigation

The menu should be:

- one-handed friendly
- short
- grouped by importance
- dismissible by keyboard/escape
- not overloaded with every external link

Social platforms can be grouped under "Follow Keola".
