export default function (path) {
  if (typeof window !== 'undefined' && typeof window.ga !== 'undefined') {
    console.log('ga!');
    window.ga('send', 'pageview', path);
  }
}
