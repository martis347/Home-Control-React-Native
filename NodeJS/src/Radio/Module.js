import controller from './Controller';

const initialize = app => {
	app.get('/radio/on/:radioName', (req, res) => {
		res.sendStatus(200);
		controller.turnOnRadio(req.params.radioName);
	});
	app.get('/radio/off', (req, res) => {
		res.sendStatus(200);
		controller.turnOffRadio();
	});
	app.get('/radio/transmit/:code', (req, res) => {
		res.sendStatus(200);
		res.send(controller.transmitIR(req.params.code));
	});	
	app.get('/radio/status', (req, res) => res.send(controller.getSpeakersStatus()));
}

export default {
	initialize
}
