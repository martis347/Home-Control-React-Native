import controller from './Controller';

const initialize = app => {
	app.get('/browser/start/:url', (req, res) => {
		res.sendStatus(200);
		controller.startBrowser(req.params.url);
	});
	app.get('/browser/stop', (req, res) => {
		res.sendStatus(200);
		controller.killBrowser();
	});
}

export default {
	initialize
}
