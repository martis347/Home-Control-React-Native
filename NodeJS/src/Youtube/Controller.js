const puppeteer = require('puppeteer-core');

class BrowserController {
	constructor() {
		this.startBrowser(this);
	}

	async startYoutube(videoId) {
		await this.currentPage.evaluate((id) => {
			window.playVideo(id);
		}, videoId);
	}

	async stopYoutube() {
		await this.currentPage.evaluate(() => {
			window.stopPlaying();
		});
	}

	async startBrowser(self) {
		const chrome = await puppeteer.launch({ headless: false, executablePath: '/usr/bin/chromium-browser' });
		chrome.on('disconnected', () => self.startBrowser(self));
		const page = await chrome.newPage();
		this.currentPage = page;
		this.currentPage.goto('https://home-control2.azurewebsites.net/player');
	}
}

export default new BrowserController();
