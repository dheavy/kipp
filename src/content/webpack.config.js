var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  'dev', __dirname + '/src/content.js', './dist/js', 'content.js'
);
