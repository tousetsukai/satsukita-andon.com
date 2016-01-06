export default function (path) {
  if (typeof window !== 'undefined' && typeof window.ga !== 'undefined') {
    window.ga('send', 'pageview', path);
  }
}
