import axios from 'axios';

class LightningController {
	constructor() {
		this.controllerUrl = 'http://10.42.0.64';
	}

	turnLightOn() {
		try {
			axios.get(`${this.controllerUrl}/on`);
		} catch (error) {
			console.log(`${this.controllerUrl}/on Did not respond.`);
		}
	}

	turnLightOff() {
		try {
			axios.get(`${this.controllerUrl}/off`);
		} catch (error) {
			console.log(`${this.controllerUrl}/off Did not respond.`);
		}
	}
}

export default new LightningController();
