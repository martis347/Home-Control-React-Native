import axios from 'axios';

class LightsStripController {
	constructor() {
        this.controllerUrl = 'http://192.168.31.242';
        this.status = {
            mode: 'Off',
            brightness: '255',
            palette: 'Rainbow',
            speed: '30',
            customPaletteSize: '8',
            customPaletteColors: ['0', '0', '0', '0', '0', '0', '0', '0'],
          };
    }

    update(data) {
        this.status = data;
        try {
			axios.post(`${this.controllerUrl}/update`, data);
		} catch (error) {
			const response = `Lights strip controller ${this.controllerUrl}} Did not respond. ${JSON.stringify(data)}`;
			console.error(error);
			console.error(response);
			return response;
		}
    }

    getStatus() {
        return this.status;
    }
}

export default new LightsStripController();
