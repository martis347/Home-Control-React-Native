import LightningModule from './src/Lightning/Module';
import LightsStripModule from './src/LightsStrip/Module';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';

var app = express();
app.use(cors())
app.use(bodyParser.json());
LightningModule.initialize(app);
LightsStripModule.initialize(app);

app.listen(3001, () => console.log('Listening on Port 3001'));
setTimeout(() => {
    axios.post('https://home-control2.azurewebsites.net/api/radio/status'); // call server every 10 minutes to keep it from falling asleep (when it falls asleep, http call become slow)
}, 10 * 60 * 1000);