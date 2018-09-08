const ChromeLauncher = require('./chrome-launcher');
const puppeteer = require('puppeteer-core');

class BrowserController {
	constructor() {
		puppeteer.launch({ headless: false, executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' })
			.then(chrome => chrome.newPage()
				.then(page => {
					this.currentPage = page;
					this.currentPage.goto('localhost:8080/player');
				})
			);
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
