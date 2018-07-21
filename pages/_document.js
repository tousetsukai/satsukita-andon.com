import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          {/* favicons */}
          <link rel="shortcut icon" href="/static/img/favicons/favicon.ico" />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/img/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/img/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/img/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/img/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/img/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/img/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/img/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/img/favicons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicons/apple-touch-icon-180x180.png" />
          <link rel="icon" type="image/png" href="/static/img/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/img/favicons/android-chrome-192x192.png" sizes="192x192" />
          <link rel="icon" type="image/png" href="/static/img/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/static/img/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="manifest" href="/static/img/favicons/manifest.json" />
          <link rel="mask-icon" href="/static/img/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/static/img/favicons/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          {/* CSS */}
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <link rel="stylesheet" href="/static/lib/bulma.min.css" type="text/css" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@andon_bot" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
