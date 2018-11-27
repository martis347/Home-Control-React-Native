import controller from './Controller';

const initialize = app => {
	app.post('/lightsStrip/update', (req, res) => res.send(controller.update(req.body.data)));
	app.get('/lightsStrip/status', (req, res) => res.send(controller.getStatus()));
}

export default {
	initialize
}
