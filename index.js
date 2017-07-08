const brain = require('brain.js');
const net = new brain.NeuralNetwork();

const perf = net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

const output = net.run({ r: 1, g: 0.4, b: 0 })

// console.log(perf);
// console.log(output.white > output.black ? 'white' : 'black');

/* - */

const mp3 = 'test.mp3';
const img = 'test.png';
const fs = require('fs');
const id3 = require('jsmediatags');
const mp3Duration = require('mp3-duration');

const getMetadata = () => new Promise((onSuccess, onError) => {
  id3.read(mp3, {onSuccess, onError});
});

const getSize = (metadata) => new Promise(resolve => {
  metadata.byteSize = fs.statSync(mp3).size;
  resolve(metadata);
});

const getLength = (metadata) => new Promise((resolve, reject) => {
  mp3Duration(mp3, (err, duration) => {
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
    const tags = metadata.tags;
    const output = `
      #TITLE:${tags.title};
      #SUBTITLE:;
      #ARTIST:${tags.artist};
      #TITLETRANSLIT:;
      #SUBTITLETRANSLIT:;
      #ARTISTTRANSLIT:;
      #CREDIT: Made with ml-ddr;
      #BANNER:${img};
      #BACKGROUND:${img};
      #CDTITLE:${tags.album};
      #MUSIC:${mp3};
      #MUSICBYTES:${metadata.byteSize};
      #MUSICLENGTH:${metadata.duration};
      #OFFSET:;
      #SAMPLESTART:;
      #SAMPLELENGTH:;
      #SELECTABLE:YES;
      #BPMS:0.000=;
      #STOPS:;
      #BGCHANGES:;
    `;

    fs.writeFile('test.sm', output, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('simfile saved');
    });

    // This doesn't quite work. Not sure why yet.
    const image = tags.picture.data.reduce((acc, cur) => {
      acc += String.fromCharCode(cur);

      return acc;
    }, '');

    fs.writeFile(img, image, 'base64', (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('image saved');
    });
  });

