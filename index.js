const spotifier = require('./spotify');
const saveImage = require('./saveImage');
const saveSim = require('./saveSim');

const songPath = 'test.mp3';
const artPath = 'test.jpg';

spotifier
  .getSongInfo('linda ronstadt don\'t know much cry like a rainstorm')
  .then((songInfo) => {
    const simData = Object.assign({
      filename: songPath,
      banner: artPath,
      background: artPath
    }, songInfo);
    saveSim(simData, 'test.sm');
    saveImage(songInfo.art, artPath);
  })
  .catch(err => console.log(err));
