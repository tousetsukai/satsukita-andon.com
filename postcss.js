var fs = require('fs');
var postcss = require('postcss');
postcss([
  require('postcss-import'),
  require('autoprefixer'),
  require('postcss-simple-vars'),
  require('postcss-calc'),
  require('postcss-focus'),
  require('postcss-nested'),
])
  .process('', { from: 'css/index.css', to: 'bundle.css' })
  .then(function (result) {
    fs.writeFileSync('bundle.css', result.css);
    if ( result.map ) fs.writeFileSync('app.css.map', result.map);
  })
  .catch(function (err) {
    console.log(err);
  });
