const ChromeLauncher = require('chrome-launcher');

class BrowserController {
	constructor() {
		this.chromeInstance = null;
	}

	async startBrowser(url) {
		await this.killBrowser();
		console.log(ChromeLauncher);
		this.chromeInstance = await ChromeLauncher.launch({ startingUrl: url });
	}

	async killBrowser() {
		if (this.chromeInstance) {
			return await this.chromeInstance.kill();
		}
	}
}

export default new BrowserController();
