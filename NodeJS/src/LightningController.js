import { getState, updateState } from './LightningState';

const lightningMessage = (request, receivers) => request => {
	let req;
	if(!(req = tryParseRequest(request))) {
		request.send(JSON.stringify({error: 'Request Must be valid JSON'}));
		return;
	}
	console.log('Request received!');

	if(!updateState(req)) {
		console.error('Received request did not match Interface');
		console.log(req);
	} else {
		const state = getState();
		receivers.forEach(r => {
			const stateToSend = JSON.stringify(state);
			r.send(stateToSend);
			console.log(stateToSend);
		});
	}
};

const lightningClose = () => {
	console.log('Connection Closed!');
};

const tryParseRequest = req => {
	let messageObject = null;
	try {
		messageObject = JSON.parse(req);
    } catch (e) {
		console.error('Invalid JSON Received');
		return messageObject;
	}

	return messageObject;
};


export default () => ({
	path: '/lightning',
	receiversPath: '/lightningReceiver',
	message: lightningMessage,
	close: lightningClose
});
