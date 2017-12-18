import { getState, updateState } from './LightningState';

const lightningMessage =  (sender, request, receivers, controllers) => {
	let req;
	if(!(req = tryParseRequest(request))) {
		request.send(JSON.stringify({error: 'Request Must be valid JSON'}));
		return;
	}

	if(!updateState(req)) {
		console.error('Received request did not match Interface');
		console.log(req);
	} else {
		const state = getState();
		console.log('Received: ');
		console.log(req);
		receivers.filter(r => r.readyState === 1).forEach(r => {
			const stateToSend = `${state.red} ${state.green} ${state.blue}`;
			r.send(stateToSend);
		});

		controllers.filter(c => c.readyState === 1 && c !== sender).forEach(c => {
			c.send(JSON.stringify(req));
		})
	}
}

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
