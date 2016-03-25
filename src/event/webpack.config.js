var webpackConfig = require('../../config/webpack/base-webpack-config');

module.exports = webpackConfig(
  'dev', __dirname + '/src/event.js', './dist/js', 'event.js'
);
