const defaultMetaTitle = '行灯職人への道';
const defaultMetaDescription = '行灯職人への道は北海道札幌北高校の行事「行灯行列」の記録・支援を行うサイトです。';
const defaultMetaImageTwitter = '//satsukita-andon.com/assets/img/twittercards.png';
const defaultMetaImageFacebook = '//satsukita-andon.com/assets/img/facebookcards.png';

export function meta(title, description = defaultMetaDescription, image) {
  const t = title ? `${title} - 行灯職人への道` : defaultMetaTitle;
  const d = description;
  const tw = image || defaultMetaImageTwitter;
  const fb = image || defaultMetaImageFacebook;
  return [
    { name: 'twitter:title', content: t },
    { name: 'twitter:description', content: d },
    { name: 'twitter:image', content: tw },
    { property: 'og:title', content: t },
    { property: 'og:description', content: d },
    { property: 'og:image', content: fb },
  ];
}
