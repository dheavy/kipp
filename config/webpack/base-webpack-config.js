var webpack = require('webpack');

module.exports = function (env, entryFile, outputPath, outputFilename) {
  env = env ? env : 'production';

  return {
    entry: require('./entries.' + env + '')(entryFile),
    module: require('./modules'),
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: require('./output')(outputPath, outputFilename),
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        __PRODUCTION__: process.env.NODE_ENV === 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
};
