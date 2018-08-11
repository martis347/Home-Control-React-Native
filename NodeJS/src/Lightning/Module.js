import controller from './Controller';

const initialize = app => {
	app.get('/lightning/status', (req, res) => res.send(controller.getLightningStatus()));
	app.get('/lightning/off', (req, res) => {
		res.sendStatus(200);
		controller.turnLightOff();
	});
	app.get('/lightning/on/:mode', (req, res) => {
		res.sendStatus(200);
		controller.turnLightOn(req.params.mode);
	});
}

export default {
	initialize
}
