import LightningModule from './src/Lightning/Module';
import GoogleAssistantModule from './src/GoogleAssistant/Module';
import RadioModule from './src/Radio/Module';
import YoutubeModule from './src/Youtube/Module';
import LightsStripModule from './src/LightsStrip/Module';
import AlarmModule from './src/Alarm/Module';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(bodyParser.json());

LightningModule.initialize(app);
RadioModule.initialize(app);
YoutubeModule.initialize(app);
LightsStripModule.initialize(app);
GoogleAssistantModule.initialize(app);
AlarmModule.initialize(app);

app.listen(3001, () => console.log('Listening on Port 3001'));
setInterval(() => {
    axios.post('https://home-control2.azurewebsites.net/api/radio/status'); // call server every minute to keep it from falling asleep (when it falls asleep, http call become slow)
}, 60 * 1000);