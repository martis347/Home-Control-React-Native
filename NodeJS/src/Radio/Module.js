import Controller from './Controller';
import MPlayer from 'mplayer';

console.log(MPlayer);
const controller = Controller();

const initialize = expressApp => {
	expressApp.ws('/ws' + controller.controllerPath, ws => {
		controller.actions.onOpenController(ws);
		ws.on('close', () => controller.actions.onCloseController(ws));
		ws.on('message', request => controller.actions.onMessage(ws, request));
	});
}

export default {
	initialize
}
