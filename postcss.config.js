module.exports = {
  input: 'css/index.css',
  output: 'static/bundle.css',
  use: [
    'postcss-import', // 'postcss-import' should be first in the plugin list
    'postcss-mixins', // 'postcss-mixins' should be before 'postcss-nested' and 'postcss-simple-vars'
    'autoprefixer',
    'postcss-simple-vars',
    'postcss-calc',
    'postcss-nested',
    'postcss-focus',
  ],
  'postcss-import': {
    glob: true,
  },
  'postcss-calc': {
    mediaQueries: true,
  },
};
