const spotifier = require('./spotify');
const saveImage = require('./saveImage');

spotifier
  .getSongInfo('linda ronstadt don\'t know much cry like a rainstorm')
  .then(songInfo => saveImage(songInfo.art, 'test.jpg'))
  .catch(err => console.log(err));
