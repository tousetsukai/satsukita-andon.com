export default function html(title, meta, link, root, state) {
  return `
      <!doctype html>
      <html>
        <head>
          <title>${title}</title>
          <link rel="shortcut icon" href="/assets/img/favicon.ico">
          ${meta}
          ${link}
        </head>
        <body>
          <div id="root">${root}</div>
          <script src="/assets/js/vendor.bundle.js"></script>
          <script>window.__andon_initial_state=${state};</script>
          <script src="/assets/js/bundle.js"></script>
        </body>
      </html>
  `;
}
