class LightsStripController {
	constructor() {
        this.controllerUrl = 'http://192.168.31.242';
        this.status = {
            mode: 'Off',
            palette: 'Rainbow',
            speed: 1,
            customPaletteSize: 8,
            customPaletteColors: [],
          };
    }

    update(data) {
        this.status = data;
        try {
			axios.post(`${this.controllerUrl}/update`, data);
		} catch (error) {
			const response = `Lights strip controller ${this.controllerUrl}} Did not respond. ${JSON.stringify(data)}`;
			console.error(response);
			return response;
		}
    }

    getStatus() {
        return this.status;
    }
}

export default new LightsStripController();
