module.exports = {
  input: 'css/index.css',
  output: 'static/bundle.css',
  use: [
    'postcss-import', // 'postcss-import' should be first in the plugin list
    'autoprefixer',
    'postcss-simple-vars',
    'postcss-calc',
    'postcss-nested',
    'postcss-focus',
  ],
};
