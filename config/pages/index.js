/**
 * Build HTML files for popup and option pages
 * using compiled JS(X) and HTML shells.
 */
var fs = require('fs');
var stream = require('stream');
var minify = require('html-minifier').minify;
var dist = __dirname + '/../../dist/';

var build = function (src, filename) {
  var rs = new stream.Readable({objectMode: true});
  fs.readFile(src, function (err, data) {
    if (err) throw err;
    rs.push(minify(data.toString('utf8'), {
      removeAttributesQuotes: true,
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true
    }));
    rs.push(null);
    rs.pipe(fs.createWriteStream(dist + filename));
  });
};

build(__dirname + '/../../src/popup/src/popup.html', 'popup.html');
build(__dirname + '/../../src/background/src/background.html', 'background.html');
