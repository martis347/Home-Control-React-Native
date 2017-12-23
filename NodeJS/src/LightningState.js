const state = {
	red: 0,
	green: 0,
	blue: 0
};

let lastRequest = {
	turnedOn: false
};

export const getState = () => {
	return state;
};

export const getLastRequest = () => {
	return lastRequest;
};

export const updateState = request => {
	if(requestIsInvalid(request)) {
		return false;
	}
	lastRequest = request;

	if(!request.turnedOn) {
		state.red = 0;
		state.green = 0;
		state.blue = 0;
	}
	else if(request.activeCheckbox === 0) {
		state.red = Math.round(10.24 * request.sliders[0].value);
		state.green = Math.round(10.24 * request.sliders[0].value);
		state.blue = Math.round(10.24 * request.sliders[0].value);
	}
	else if(request.activeCheckbox === 1) {
		state.red = Math.round(10.24 * request.sliders[0].value);
		state.green = Math.round(10.24 * request.sliders[1].value);
		state.blue = Math.round(10.24 * request.sliders[2].value);
	}
	else if(request.activeCheckbox === 2) {
		state.red = 50;
		state.green = 50;
		state.blue = 50;
	}
	else {
		return false;
	}

	return true;
}

const requestIsInvalid = request => {
	const result =
		request.turnedOn === undefined ||
		(request.turnedOn === true && !Array.isArray(request.sliders)) ||
		(Array.isArray(request.sliders) && request.sliders.some(s => isNaN(s.value) || s.value > 100 || s.value < 0) ||
		request.turnedOn === true && request.activeCheckbox === undefined);

		return result;
}

/*const sliders = [
	[{ value: 0-100, id: 1 }], //White
	[{ value: 0-100, id: 11 } //Red, { value: 0-100, id: 12 } //Green, { value: 0-100, id: 13 } //Blue, ], //RGB
	[{ value: 0-100, id: 21 }, { value: 0-100, id: 22 }, ] //Rainbow
];*/
