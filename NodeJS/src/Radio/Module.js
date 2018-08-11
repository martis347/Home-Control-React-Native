import controller from './Controller';

const initialize = app => {
	app.get('/radio/on/:radioName', (req, res) => {
		res.sendStatus(200);
		controller.turnOnRadio(req.params.radioName);
	});
	app.get('/radio/volume/:volume', (req, res) => {
		res.sendStatus(200);
		controller.setSpeakersVolume(req.params.volume);
	});
	app.get('/radio/off', (req, res) => {
		res.sendStatus(200);
		controller.turnOffSpeakers();
	});
	app.get('/radio/speakers', (req, res) => {
		res.sendStatus(200);
		controller.turnOnSpeakers();
	});
	app.get('/radio/status', (req, res) => res.send(controller.getSpeakersStatus()));
}

export default {
	initialize
}
