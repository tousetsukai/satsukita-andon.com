module.exports = {
  input: 'css/index.css',
  output: 'static/bundle.css',
  use: ['autoprefixer', 'postcss-import'],
  /* 'postcss-import': {
     onImport: function(sources) {
     global.watchCSS(sources, this.from);
     }
     } */
};
