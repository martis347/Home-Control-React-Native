import axios from 'axios';

class LightningController {
	constructor() {
		this.wallControllerUrl = 'http://192.168.31.243';
		this.ceilingControllerUrl = 'http://192.168.31.244';
	}

	switchCeiling(newValue) {
		try {
			axios.get(`${this.ceilingControllerUrl}/${newValue ? 'on' : 'off'}`);
		} catch (error) {
			const response = `${this.ceilingControllerUrl}/${newValue ? 'on' : 'off'} Did not respond.`;
			console.error(response);
			return response;
		}
	}

	switchWall(newValue) {
		try {
			axios.get(`${this.wallControllerUrl}/${newValue ? 'on' : 'off'}`);
		} catch (error) {
			const response = `${this.wallControllerUrl}/${newValue ? 'on' : 'off'} Did not respond.`;
			console.error(response);
			return response;
		}
	}

	async getStatuses() {
		const wallResult = await axios.get(`${this.wallControllerUrl}/status`);
		const ceilingResult = await axios.get(`${this.ceilingControllerUrl}/status`);
		return {
			ceilingOn: ceilingResult.data.turnedOn,
			wallOn: wallResult.data.turnedOn,
		};
	}
}

export default new LightningController();
