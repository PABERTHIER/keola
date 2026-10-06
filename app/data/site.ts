export const externalLinks = {
  twitch: 'https://www.twitch.tv/keola',
  twitchSchedule: 'https://www.twitch.tv/keola/schedule',
  youtube: 'https://www.youtube.com/@keolakumaneko',
  discord: 'https://discord.gg/keolakumaneko',
  bluesky: 'https://bsky.app/profile/keola.tv',
  instagram: 'https://www.instagram.com/keolakumaneko/',
  tiktok: 'https://www.tiktok.com/@keolakumaneko?lang=fr',
  x: 'https://x.com/KeolaKumaneko',
  kofi: 'https://ko-fi.com/keolakumaneko/tip',
  redPandaNetwork: 'https://redpandanetwork.org',
  safebear: 'https://safebear.ai',
  holy: 'https://fr.weareholy.com/?ref=KEOLA&utm_medium=creator&utm_source=creator',
  creatorCredits: 'https://credits.keola.tv/',
  facts: 'https://fact.keola.tv/',
  presentationVideo: 'https://www.youtube.com/watch?v=67RMXZWvo00',
  presentationEmbed: 'https://www.youtube-nocookie.com/embed/67RMXZWvo00',
  email: 'mailto:kumaneko.keola@gmail.com',
} as const

export const socialLinks = [
  {
    name: 'Twitch',
    url: externalLinks.twitch,
    icon: 'keo-icon:twitch-logo',
    color: '#CD63FF',
    detail: 'live',
  },
  {
    name: 'YouTube',
    url: externalLinks.youtube,
    icon: 'keo-icon:youtube-logo',
    color: '#FF5252',
    detail: 'videos',
  },
  {
    name: 'Discord',
    url: externalLinks.discord,
    icon: 'keo-icon:discord-logo',
    color: '#A7FF91',
    detail: 'community',
  },
  {
    name: 'Bluesky',
    url: externalLinks.bluesky,
    icon: 'keo-icon:bluesky-logo',
    color: '#6373FF',
    detail: 'updates',
  },
  {
    name: 'Instagram',
    url: externalLinks.instagram,
    icon: 'keo-icon:instagram-logo',
    color: '#FCFF63',
    detail: 'images',
  },
  {
    name: 'TikTok',
    url: externalLinks.tiktok,
    icon: 'keo-icon:tik-tok-logo',
    color: '#FD8FFF',
    detail: 'clips',
  },
  {
    name: 'X',
    url: externalLinks.x,
    icon: 'keo-icon:twitter-logo',
    color: '#00B2FF',
    detail: 'updates',
  },
  {
    name: 'Ko-fi',
    url: externalLinks.kofi,
    icon: 'keo-icon:ko-fi-logo',
    color: '#9C835D',
    detail: 'support',
  },
] as const

export const featuredSocialLinks = socialLinks.filter(link =>
  ['Twitch', 'YouTube', 'Discord', 'Ko-fi'].includes(link.name)
)

export const fanartNumbers = Array.from(
  { length: 111 },
  (_, index) => index + 1
)

export const credits = [
  { name: 'NesSama & MarroDono', role: 'assistants' },
  {
    name: 'Kouzuki_1103',
    role: 'model',
    url: 'https://twitter.com/Kouzuki_1103',
  },
  { name: 'Yuzufei', role: 'chibi', url: 'https://twitter.com/Yuzufei' },
  { name: 'Williartz', role: 'screens', url: 'https://twitter.com/williartz' },
  { name: 'Meiuwun', role: 'animation', url: 'https://twitter.com/meiuwun' },
  {
    name: 'Little Kaito',
    role: 'chat_music',
    url: 'https://twitter.com/ItsDaSmolKaito_',
  },
  { name: 'NNaomi', role: 'alerts', url: 'https://twitter.com/nnaomi' },
  { name: 'Nyacchii', role: 'emotes', url: 'https://twitter.com/nyacchii_art' },
  {
    name: 'Happygiar',
    role: 'stream_music',
    url: 'https://twitter.com/happygiar',
  },
  {
    name: 'StefanusHendy',
    role: 'channel_graphics',
    url: 'https://twitter.com/stefanushendy98',
  },
  {
    name: 'Gabyy_GM',
    role: 'background',
    url: 'https://twitter.com/gabinette04',
  },
  { name: 'Harukoti', role: 'ref_chat', url: 'https://twitter.com/harukoti' },
  { name: '_Lelysz', role: 'ref_design', url: 'https://twitter.com/_lelysz' },
  {
    name: 'Beatscribe',
    role: 'alert_music',
    url: 'https://twitter.com/BeatScribe',
  },
  {
    name: 'Bustufu2',
    role: 'redebut_video',
    url: 'https://twitter.com/Bustufu2',
  },
  {
    name: 'LittleLythen',
    role: 'badges',
    url: 'https://twitter.com/LittleLythen',
  },
] as const
