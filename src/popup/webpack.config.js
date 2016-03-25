var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  'dev', __dirname + '/src/popup.js', './dist/js', 'popup.js'
);
