import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';

class MyDocument extends Document {
  public render() {
    return (
      <html lang="ja">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={'/_next/static/common.css'} />
          <link rel="stylesheet" href={'/_next/static/style.css'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
