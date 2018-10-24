import withTypescript = require('@zeit/next-typescript');

export = withTypescript({
  // relative path from next.config.js
  distDir: '../../dist/functions/next',
});
