var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  'dev', './src/content.js', '../../dist/', 'content.js'
);
