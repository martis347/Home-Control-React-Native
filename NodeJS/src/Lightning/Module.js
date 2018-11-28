import controller from './Controller';

const initialize = app => {
	app.get('/lightning/ceiling/true', (req, res) => res.send(controller.switchCeiling(true)));
	app.get('/lightning/ceiling/false', (req, res) => res.send(controller.switchCeiling(false)));
	app.get('/lightning/status/ceiling', async (req, res) => res.json(await controller.getStatus('ceiling')));
	app.get('/lightning/wall/true', (req, res) => res.send(controller.switchWall(true)));
	app.get('/lightning/wall/false', (req, res) => res.send(controller.switchWall(false)));
	app.get('/lightning/status/wall', async (req, res) => res.json(await controller.getStatus('wall')));
}

export default {
	initialize
}
