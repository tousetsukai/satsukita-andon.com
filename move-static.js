var libs = [
  'font-awesome'
];

var fs = require('fs-extra');

var copyLibs = function () {
  libs.forEach(function(lib) {
    fs.copy('./node_modules/' + lib, './static/lib/' + lib, function (err) {
      if (err) return console.error(err);
      console.log(lib + ' success!');
    });
  });
};

fs.stat('./static/lib', function(err, stats) {
  if (err) {
    fs.mkdir('./static/lib', copyLibs);
  } else {
    copyLibs();
  }
});
