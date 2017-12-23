import Controller from './Controller';

const controller = Controller();

const initialize = expressApp => {
	expressApp.ws('/ws' + controller.controllerPath, ws => {
		controller.actions.onOpenController(ws);
		ws.on('close', () => controller.actions.onCloseController(ws));
		ws.on('message', request => controller.actions.onMessage(ws, request));
	});
	
	expressApp.ws('/ws' + controller.listenerPath, ws => {
		controller.actions.onOpenListener(ws);
		ws.on('close', () => controller.actions.onCloseListener(ws));
	});
}

export default {
	initialize
}
