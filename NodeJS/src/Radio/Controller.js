import MPlayer from 'mplayer';
import { tryParseRequest } from '../Utils'; 

const controllerPath = '/radio';
const controllers = [];
let currentStream = null;
let currentTitle = null;
const streams = {
	m1: 'http://stream.m-1.fm/m1/aacp64',
	phr: 'https://power-stream.tv3.lt:8080/PHR.mp3'
};
const player = new MPlayer();
player.on('status', status => broadcastStatusChange(status));

const openController = opener => {
	console.log('Controller to %s connected', controllerPath);
	controllers.push(opener);

	if(opener.readyState === 1) {
		opener.send(JSON.stringify({title: currentTitle, activeAudio: currentStream}));
	}
};

const message =  (sender, request) => {
	let req;
	if(!(req = tryParseRequest(request))) {
		request.send(JSON.stringify({error: 'Request Must be valid JSON'}));
		return;
	}
	if(req.play === false || !streams[req.play]) {
		player.stop();
		currentStream = null;
	} else {
		player.openFile(streams[req.play], { volume: 100 });
		currentStream = req.play;
	}
};

const closeController = closer => {
	const index = controllers.indexOf(closer);
	if(index != -1) {
		controllers.splice(index, 1);
		console.log('Controller to %s disconnected', controllerPath);
	}
};

const broadcastStatusChange = status => {
	currentTitle = status.title;
	controllers.filter(r => r.readyState === 1).forEach(r => {
		r.send(JSON.stringify({title: currentTitle, activeAudio: currentStream}));
	});
}

export default () => ({
	controllerPath,
	actions: {
		onOpenController: openController,
		onMessage: message,
		onCloseController: closeController
	}
});
