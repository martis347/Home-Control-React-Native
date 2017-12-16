import LightningController from './src/LightningController';
import express from 'express';
import expressWs from 'express-ws';

var app = express();
const webSockets = expressWs(app);
const lightningHandler = LightningController();

app.ws('/ws' + lightningHandler.path, (ws, req) => {
	const receivers = webSockets.getWss('/ws' + lightningHandler.receiversPath).clients;

	console.log('Connection to %s established', lightningHandler.path);
	ws.on('message', lightningHandler.message(ws, receivers));
})

app.ws('/ws' + lightningHandler.receiversPath, (ws, req) => {
	console.log('Connection to %s established', lightningHandler.receiversPath);
})

app.listen(3001);
console.info('Listening on Port %s', 3001);
