import { getState, updateState, getLastRequest } from './State';
import { tryParseRequest } from '../Utils';

const controllerPath = '/lightning';
const listenerPath = '/lightningReceiver';

const listeners = [];
const controllers = [];
let interval = null;

const openController = opener => {
	console.log('Controller to %s connected', controllerPath);
	controllers.push(opener);

	if(opener.readyState === 1) {
		opener.send(JSON.stringify(getLastRequest()));
	}
};

const openListener = opener => {
	console.log('Receiver to %s connected', listenerPath);
	listeners.push(opener);

	if(opener.readyState === 1) {
		const state = getState();
		opener.send(JSON.stringify(`${state.red} ${state.green} ${state.blue}`));
	}
};

const message = (sender, request) => {
	let req;
	if(!(req = tryParseRequest(request))) {
		request.send(JSON.stringify({error: 'Request Must be valid JSON'}));
		return;
	}

	if(!updateState(req)) {
		console.error('Received request did not match Interface');
		console.log(req);
	} else {
		let interval = null;
		if(req.activeCheckbox === 2 || req.activeCheckbox === 2) {
			handleInterval();
		} else {
			clearInterval(interval);
			const state = getState();
			sendState(state, listeners.filter(r => r.readyState === 1));
		}

		const state = JSON.stringify(req);
		sendState(state, controllers.filter(c => c.readyState === 1 && c !== sender));
	}
}

const closeController = closer => {
	const index = controllers.indexOf(closer);
	if(index != -1) {
		controllers.splice(index, 1);
		console.log('Controller to %s disconnected', listenerPath);
	}
};

const closeListener = closer => {
	const index = listeners.indexOf(closer);
	if(index != -1) {
		listeners.splice(index, 1);
		console.log('Receiver to %s disconnected', controllerPath);
	}
};

const handleInterval = () => {
	interval = setInterval(function () {
		const state = getState();
		sendState(state, listeners.filter(r => r.readyState === 1));
	}, 50);
};

const sendState = (state, receivers) => {
	receivers.forEach(r => {
		const stateToSend = `${state.red} ${state.green} ${state.blue}`;
		r.send(stateToSend);
	})
};

export default () => ({
	controllerPath,
	listenerPath,
	actions: {
		onOpenController: openController,
		onOpenListener: openListener,
		onMessage: message,
		onCloseController: closeController,
		onCloseListener: closeListener
	}
});
