import controller from './Controller';

const initialize = app => {
	app.post('/googleAssistant', (req, res) => res.send(controller.handleRequest(req.body)));
}

export default {
	initialize
}
