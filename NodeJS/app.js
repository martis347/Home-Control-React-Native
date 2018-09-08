import LightningModule from './src/Lightning/Module';
import RadioModule from './src/Radio/Module';
import BrowserModule from './src/Browser/Module';
import express from 'express';

var app = express();

LightningModule.initialize(app);
RadioModule.initialize(app);
BrowserModule.initialize(app);

app.listen(3001, () => console.log('Listening on Port 3001'));