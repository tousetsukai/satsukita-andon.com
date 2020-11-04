import * as functions from 'firebase-functions';
import next from 'next';

// dev: false しかサポートしない。.next を dist/functions 以下に置くようにする
// - dev: true の場合、pages ディレクトリがあるディレクトリを dir で指定する必要があり、
//   `../../` などで指定することになるが、functions の実行ディレクトリは /srv なので、デプロイに失敗する
// - dev: true の場合、firebase serve で無限リロードが発生してしまう
const app = next({ dev: false });
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest((req, res) => {
  // eslint-disable-next-line no-console
  console.log(`Requested URL: ${req.originalUrl}`);
  return app.prepare().then(() => handle(req, res));
});
