module.exports = {
  loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(ttf|eot|woff2?)(\?[a-z0-9.=]+)?$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }
    ]
};
