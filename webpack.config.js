var _ = require('lodash');
var webpack = require('webpack');
var packagedef = require('./package.json');

module.exports = {
  progress: true,
  color: true,
  devtool: 'source-map',
  entry: {
    app: './src/client.js',
    vendor: _.without(
      Object.keys(packagedef.dependencies),
      'express', 'babel'
    )
  },
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?optional[]=runtime&stage=0'
    }]
  },
  plugins: [
    /* new webpack.optimize.UglifyJsPlugin(), */
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};
