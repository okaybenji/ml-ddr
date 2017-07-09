const fs = require('fs');
const request = require('request');

module.exports = (uri, filename) => {
  return new Promise((resolve, reject) => {
    request.head(uri, (err, res, body) => {
      if (err) {
        return reject(err);
      }

      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => resolve());
    });
  });
};
