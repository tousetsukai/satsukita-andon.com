var nodes = [
  'font-awesome',
  'react-progress-bar-plus',
  'normalize.css'
];
var bowers = [
  'elemental'
];

var fs = require('fs-extra');

var copyLibs = function () {
  var copy = function (dir, lib) {
    fs.copy(dir + lib, './static/lib/' + lib, function (err) {
      if (err) return console.error(err);
      console.log(lib + ' success!');
    });
  }
  nodes.forEach(function (lib) {
    copy('./node_modules/', lib);
  });
  bowers.forEach(function (lib) {
    copy('./bower_components/', lib);
  });
};

fs.stat('./static/lib', function(err, stats) {
  if (err) {
    fs.mkdir('./static/lib', copyLibs);
  } else {
    copyLibs();
  }
});
