var webpack = require('webpack');

module.exports = function (env, entryFile, outputPath, outputFilename) {
  env = env ? env : 'production';

  return {
    entry: require('./entries.' + env + '')(entryFile),
    module: require('./modules'),
    resolve: {
      extensions: ['', '.ts', '.tsx']
    },
    output: require('./output')(outputPath, outputFilename),
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
