import controller from './Controller';

const initialize = app => {
	app.get('/youtube/start/:videoId', (req, res) => {
		res.sendStatus(200);
		controller.startYoutube(req.params.videoId);
	});
	app.get('/youtube/stop', (req, res) => {
		res.sendStatus(200);
		controller.stopYoutube();
	});
	app.post('/youtube/syncState', (req, res) => {
		res.send(controller.syncState(req.body));
	});
	app.post('/youtube/restart', (req, res) => {
		res.send(controller.restart());
	});
}

export default {
	initialize
}
