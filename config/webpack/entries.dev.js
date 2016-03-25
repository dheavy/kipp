module.exports = (function (entryFile) {
  return [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    entryFile
  ];
})(entryFile);
