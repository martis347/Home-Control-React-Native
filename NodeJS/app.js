import LightningModule from './src/Lightning/Module';
import RadioModule from './src/Radio/Module';
import YoutubeModule from './src/Youtube/Module';
import express from 'express';

var app = express();

LightningModule.initialize(app);
RadioModule.initialize(app);
YoutubeModule.initialize(app);

app.listen(3001, () => console.log('Listening on Port 3001'));