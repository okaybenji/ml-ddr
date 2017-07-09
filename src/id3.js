const fs = require('fs');
const id3 = require('jsmediatags');
const mp3Duration = require('mp3-duration');
const saveSim = require('./saveSim');

const mp3 = 'test.mp3';
const img = 'test.png';
const sim = 'test.sm';

const getMetadata = () => new Promise((onSuccess, onError) => {
  id3.read(`../input/${mp3}`, {onSuccess, onError});
});

const getSize = (metadata) => new Promise(resolve => {
  metadata.bytes = fs.statSync(`../input/${mp3}`).size;
  resolve(metadata);
});

const getLength = (metadata) => new Promise((resolve, reject) => {
  mp3Duration(`../input/${mp3}`, (err, duration) => {
    if (err) {
      return reject(err);
    }
    metadata.duration = duration;
    resolve(metadata);
  });
});

getMetadata()
  .then(getSize)
  .then(getLength)
  .then(metadata => {
    const songInfo = {
      title: metadata.tags.title,
      artist: metadata.tags.artist,
      banner: img,
      background: img,
      album: metadata.tags.album,
      music: mp3,
      bytes: metadata.bytes,
      duration: metadata.duration
    };

    saveSim(songInfo, `../output/${sim}`);

    // This doesn't quite work. Not sure why yet.
//    const image = tags.picture.data.reduce((acc, cur) => {
//      acc += String.fromCharCode(cur);
//
//      return acc;
//    }, '');
//
//    fs.writeFile(`../output/${img}`, image, 'base64', (err) => {
//      if (err) {
//        return console.log(err);
//      }
//      console.log('image saved');
//    });
  });

