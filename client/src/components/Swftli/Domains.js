export const socialClasses = {
  'discord.gg': 'fab fa-discord',
  'facebook.com': 'fab fa-facebook',
  'fb.me': 'fab fa-facebook',
  'github.com': 'fab fa-github',
  'instagram.com': 'fab fa-instagram',
  'patreon.com': 'fab fa-patreon',
  'pinterest.com': 'fab fa-pinterest',
  'spotify.com': 'fab fa-spotify',
  'tiktok.com': 'fab fa-tiktok',
  'twitch.tv': 'fab fa-twitch',
  'twitter.com': 'fab fa-twitter',
  'vimeo.com': 'fab fa-vimeo-v',
  'youtube.com': 'fab fa-youtube',
  'youtu.be': 'fab fa-youtube',
};

export const getDomain = (url) => {
  const site = new URL(url);
  return site.hostname;
};
