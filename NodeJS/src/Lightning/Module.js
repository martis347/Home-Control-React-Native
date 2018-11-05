import controller from './Controller';

const initialize = app => {
	app.get('/lightning/on', (req, res) => res.send(controller.turnLightOn()));
	app.get('/lightning/off', (req, res) => res.send(controller.turnLightOff()));
}

export default {
	initialize
}
