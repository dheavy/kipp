var fs = require('fs');
var stream = require('stream');
var packageJson = require(__dirname + '/../../package.json');
var manifestJson = require('./manifest')(
  packageJson.name, 'Add videos', packageJson.description, packageJson.version, false
);

var destination = __dirname + '/../../dist/manifest.json';

module.exports = (function () {
  var rs = new stream.Readable({objectMode: true});
  rs.push(manifestJson);
  rs.push(null);
  rs.pipe(fs.createWriteStream(destination));
})();
