import controller from './Controller';

const initialize = app => {
	app.get('/lightning/ceiling/true', (req, res) => res.send(controller.switchCeiling(true)));
	app.get('/lightning/ceiling/false', (req, res) => res.send(controller.switchCeiling(false)));
	app.get('/lightning/wall/true', (req, res) => res.send(controller.switchWall(true)));
	app.get('/lightning/wall/false', (req, res) => res.send(controller.switchWall(false)));
	app.get('/lightning/statuses', async (req, res) => res.json(await controller.getStatuses()));
}

export default {
	initialize
}
