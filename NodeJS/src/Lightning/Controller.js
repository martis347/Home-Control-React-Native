import axios from 'axios';

class LightningController {
	constructor() {
		this.controllerUrl = 'http://10.42.0.99';

		this.status = {
			mode: '',
			on: false,
		};

		this.mappings = {
			bright: [255, 240, 220],
			medium: [120, 90, 100],
			low: [35, 25, 30],
			red: [100, 0, 0],
			green: [0, 100, 0],
			blue: [0, 1, 100],
			cyan: [0, 30, 60],
			purple: [60, 0, 30],
		};
	}

	turnLightOn(mode) {
		const modeToUse = mode.toLowerCase();
		const colors = this.mappings[modeToUse];

		if (!colors) {
			return;
		}
		console.log(`${this.controllerUrl}/?r=${colors[0]}&g=${colors[1]}&b=${colors[2]}`);
		try {
			axios.get(`${this.controllerUrl}/?r=${colors[0]}&g=${colors[1]}&b=${colors[2]} Did not respond.`, { timeout: 500 });
			this.status = {
				mode: '',
				on: false,
			};
		} catch (error) {
			console.log(`${this.controllerUrl}/?r=${colors[0]}&g=${colors[1]}&b=${colors[2]} Did not respond.`);
		}

		this.status = {
			mode: modeToUse,
			on: true,
		};
	}

	turnLightOff(mode) {
		console.log(`${this.controllerUrl}/?r=0&g=0&b=0`);
		try {
			axios.get(`${this.controllerUrl}/?r=0&g=0&b=0`, { timeout: 500 });
			this.status = {
				mode: '',
				on: false,
			};
		} catch (error) {
			console.log(`${this.controllerUrl}/?r=0&g=0&b=0`);
		}
	}

	getLightningStatus() {
		return this.status;
	}
}

export default new LightningController();
