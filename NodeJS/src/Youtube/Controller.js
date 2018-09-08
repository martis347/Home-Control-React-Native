const ChromeLauncher = require('chrome-launcher');

class BrowserController {
	constructor() {
		this.chromeInstance = null;
	}

	async startYoutube(videoId) {
		await this.killBrowser();
		this.chromeInstance = await ChromeLauncher.launch({ startingUrl: `https://www.youtube.com/watch?v=${videoId}` });
	}

	async killYoutube() {
		if (this.chromeInstance) {
			return await this.chromeInstance.kill();
		}
	}
}

export default new BrowserController();
