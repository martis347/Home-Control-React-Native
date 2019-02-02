import controller from './Controller';

const initialize = app => {
	app.post('/alarm/sync', (req, res) => res.send(controller.sync(req.body)));
	app.get('/alarm/sync', (req, res) => res.send(controller.getState()));
}

export default {
	initialize
}
