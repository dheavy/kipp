var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  'dev', './src/event.js', '../../dist/', 'event.js'
);
