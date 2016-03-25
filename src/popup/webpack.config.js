var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  process.env.NODE_ENV || 'production', __dirname + '/src/popup.js', './dist/js', 'popup.js'
);
