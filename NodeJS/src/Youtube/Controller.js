const ChromeLauncher = require('./chrome-launcher');

class BrowserController {
	constructor() {
		this.chromeInstance = null;
	}

	async startYoutube(videoId) {
		await this.killYoutube();
		this.chromeInstance = await ChromeLauncher.launch({ startingUrl: `https://www.youtube.com/watch?v=${videoId}`, chromeFlags: [] });
	}

	async killYoutube() {
		try {
			if (this.chromeInstance) {
				return await this.chromeInstance.kill();
			}
		} catch (error) {
			
		}
	}
}

export default new BrowserController();
