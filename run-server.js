require('babel-register')({
  presets: ['es2015', 'stage-0', 'react']
});

require('./src/server');
