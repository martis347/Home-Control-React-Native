import LightningController from './src/LightningController';
import express from 'express';
import expressWs from 'express-ws';

var app = express();
const webSockets = expressWs(app);
const lightningHandler = LightningController();
let lightningReceivers = [];
let lightningControllers = [];

app.ws('/ws' + lightningHandler.path, (ws, req) => {
	ws.on('close', () => {
		const index = lightningReceivers.indexOf(ws);
		if(index != -1) {
			lightningControllers.splice(index, 1);
		}
		console.log('Listener to %s disconnected', lightningHandler.receiversPath);
	});
	console.log('Controller to %s connected', lightningHandler.path);
	lightningControllers.push(ws);

	ws.on('message', function(request) { lightningHandler.message(ws, request, lightningReceivers, lightningControllers) });
})

app.ws('/ws' + lightningHandler.receiversPath, (ws, req) => {
	ws.on('close', () => {
		const index = lightningReceivers.indexOf(ws);
		if(index != -1) {
			lightningReceivers.splice(index, 1);
		}
		console.log('Listener to %s disconnected', lightningHandler.receiversPath);
	});
	console.log('Listener to %s connected', lightningHandler.receiversPath);
	lightningReceivers.push(ws);
})

app.listen(3001);
console.info('Listening on Port %s', 3001);
