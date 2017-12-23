import LightningModule from './src/Lightning/Module';
import express from 'express';
import expressWs from 'express-ws';

var app = express();
const webSockets = expressWs(app);

LightningModule.initialize(app);
//RadioModule.initialize(app);

app.listen(3001);
console.info('Listening on Port %s', 3001);
