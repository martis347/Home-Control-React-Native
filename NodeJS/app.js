import LightningModule from './src/Lightning/Module';
import RadioModule from './src/Radio/Module';
import express from 'express';
import expressWs from 'express-ws';

var app = express();
const webSockets = expressWs(app);

const initializeRadio = () => {
  const mplayer = require('child_process').spawn('mplayer');
  let mplayerFailed = false;

  mplayer.on('error', function(err) {
    mplayerFailed = true;
    console.log('Failed to initialize MPlayer');
  });
  setTimeout(() => {
    if(!mplayerFailed) {
      RadioModule.initialize(app);
    }
    
		app.listen(3001);
  }, 3000);

}

LightningModule.initialize(app);
initializeRadio();

console.info('Listening on Port %s', 3001);
