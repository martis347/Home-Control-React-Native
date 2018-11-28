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

	async getStatus(controller) {
		try {
			if (controller === 'wall') {
				return await axios.get(`${this.wallControllerUrl}/status`);
			} else if (controller === 'ceiling') {
				return await axios.get(`${this.ceilingControllerUrl}/status`);
			}
		} catch (error) {
			return null;
		}
	}
}

export default new LightningController();
