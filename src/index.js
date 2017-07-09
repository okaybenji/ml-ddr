const spotifier = require('./spotify');
const saveImage = require('./saveImage');
const saveSim = require('./saveSim');

const song = 'test.mp3';
const art = 'test.jpg';
const sim = 'test.sm';

spotifier
  .getSongInfo('linda ronstadt don\'t know much cry like a rainstorm')
  .then((songInfo) => {
    const simData = Object.assign({
      filename: song,
      banner: art,
      background: art
    }, songInfo);
    saveSim(simData, `../output/${sim}`);
    saveImage(songInfo.art, `../output/${art}`);
  })
  .catch(err => console.log(err));
