var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  'dev', './src/popup.js', '../../dist/', 'popup.js'
);
