const fs = require('fs');

module.exports = ({title = '',
    subtitle = '',
    artist = '',
    credit = 'Made with ml-ddr',
    banner = '',
    background = '',
    album = '',
    filename = '',
    bytes = '',
    duration = '',
    offset = '',
    bpm = '',
  }, simfilename) => {
    const output = `
      #TITLE:${title};
      #SUBTITLE:${title};
      #ARTIST:${artist};
      #TITLETRANSLIT:;
      #SUBTITLETRANSLIT:;
      #ARTISTTRANSLIT:;
      #CREDIT:${credit};
      #BANNER:${banner};
      #BACKGROUND:${background};
      #CDTITLE:${album};
      #MUSIC:${filename};
      #MUSICBYTES:${bytes};
      #MUSICLENGTH:${duration};
      #OFFSET:${offset};
      #SAMPLESTART:;
      #SAMPLELENGTH:;
      #SELECTABLE:YES;
      #BPMS:0.000=${bpm};
      #STOPS:;
      #BGCHANGES:;
    `;

    return new Promise((resolve, reject) => {
      fs.writeFile(simfilename, output, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
};
