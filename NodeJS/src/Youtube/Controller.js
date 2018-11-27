const puppeteer = require('puppeteer-core');

class BrowserController {
	constructor() {
		const browser = puppeteer.launch({ headless: false, executablePath: '/usr/bin/chromium-browser' })
			.then(chrome => chrome.newPage()
				.then(page => {
					this.currentPage = page;
					this.currentPage.goto('https://home-control2.azurewebsites.net/player');
				})
			);

		var self = this;
		browser.on('disconnected', () => {
			self.browser = puppeteer.launch({ headless: false, executablePath: '/usr/bin/chromium-browser' })
			.then(chrome => chrome.newPage()
				.then(page => {
					this.currentPage = page;
					this.currentPage.goto('https://home-control2.azurewebsites.net/player');
				})
			);
		});
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
}

export default new BrowserController();
