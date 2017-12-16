const state = {
	red: 0,
	green: 0,
	blue: 0
}
			
export const getState = () => {
	return state;
}

export const updateState = request => {
	if(requestIsInvalid(request)) {
		return false;
	}
	
	if(!request.turnedOn) {
		state.red = 0;
		state.green = 0;
		state.blue = 0;
	}
	else if(request.sliders.every(s => s.id < 10)) {
		state.red = Math.round(2.55 * request.sliders[0].value);
		state.green = Math.round(2.55 * request.sliders[0].value);
		state.blue = Math.round(2.55 * request.sliders[0].value);
	}
	else if(request.sliders.every(s => s.id > 10 && s.id < 20)) {
		state.red = Math.round(2.55 * request.sliders[0].value);
		state.green = Math.round(2.55 * request.sliders[1].value);
		state.blue = Math.round(2.55 * request.sliders[2].value);
	}
	else if(request.sliders.every(s => s.id > 20 && s.id < 30)) {
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
		(Array.isArray(request.sliders) && request.sliders.some(s => isNaN(s.value) || s.value > 100 || s.value < 0));
		
		return result;
}

/*const sliders = [
	[{ value: 0-100, id: 1 }], //White
	[{ value: 0-100, id: 11 } //Red, { value: 0-100, id: 12 } //Green, { value: 0-100, id: 13 } //Blue, ], //RGB
	[{ value: 0-100, id: 21 }, { value: 0-100, id: 22 }, ] //Rainbow
];*/
