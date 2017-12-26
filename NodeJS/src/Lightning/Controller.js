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
		if(req.activeCheckbox === 2 && interval === null) {
			interval = handleInterval();
		} else if(req.activeCheckbox !== 2) {
			clearInterval(interval);
			interval = null;
			const state = getState();
			const stateToSend = `${state.red} ${state.green} ${state.blue}`;

			sendState(stateToSend, listeners.filter(r => r.readyState === 1));
		}

		const stateToSend = JSON.stringify(req);
		sendState(stateToSend, controllers.filter(c => c.readyState === 1 && c !== sender));
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
	return setInterval(function () {
		const state = getState();
		const stateToSend = `${state.red} ${state.green} ${state.blue}`;

		sendState(stateToSend, listeners.filter(r => r.readyState === 1));
	}, 50);
};

const sendState = (state, receivers) => {
	receivers.forEach(r => {
		r.send(state);
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
