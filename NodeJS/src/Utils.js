export const tryParseRequest = req => {
	let messageObject = null;
	try {
		messageObject = JSON.parse(req);
    } catch (e) {
		console.error('Invalid JSON Received');
		return messageObject;
	}

	return messageObject;
};

export default {
	tryParseRequest
}
