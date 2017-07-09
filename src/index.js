const spotifier = require('./spotify');
const saveImage = require('./saveImage');
const saveSim = require('./saveSim');

// Name these however you like.
const song = 'test.mp3'; // You'll provide this mp3.
const art = 'test.jpg'; // I'll retrieve the art and save to this filename.
const sim = 'test.sm'; // I'll generate this file as a template for you.
const query = 'linda ronstadt don\'t know much cry like a rainstorm'; // Try to be specific.

spotifier
  .getSongInfo(query)
  .then((songInfo) => {
    const simData = Object.assign({
      filename: song,
      banner: art,
      background: art
    }, songInfo);
    // Save to the 'output' folder.
    saveSim(simData, `../output/${sim}`);
    saveImage(songInfo.art, `../output/${art}`);
  })
  .catch(err => console.log(err));
