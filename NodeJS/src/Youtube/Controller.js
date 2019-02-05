const puppeteer = require('puppeteer-core');

class BrowserController {
	constructor() {
		this.state = {
			currentlyPlaying: null,
			history: [],
			queue: [],
		};

		this.currentPage = undefined;
		this.chrome = undefined;

		this.startBrowser(this);
	}

	syncState({ currentlyPlaying, queue } = {}) {
		const lastPlayedVideo = this.state.history[this.state.history.length - 1];
		if (currentlyPlaying && ((lastPlayedVideo && lastPlayedVideo.id !== currentlyPlaying.id) || this.state.history.length === 0)) {
			this.state.history.push(currentlyPlaying);
		}

		if (currentlyPlaying) {
			this.state.currentlyPlaying = currentlyPlaying;
		}
		if (queue) {
			this.state.queue = queue;
		}

		return {
			...this.state,
			history: this.state.history.reverse().slice(0, 10),
		};
	}

	async playVideo(video) {
		this.state.currentlyPlaying = video;
		this.state.history.push(video);

		await this.currentPage.evaluate((id) => {
			window.playVideo(id);
		}, video.id);
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

	async restart() {
		await this.chrome.close();
		await this.startBrowser(this);
		await this.playVideo(this.state.currentlyPlaying.id);
	}

	async startBrowser(self) {
		const chrome = await puppeteer.launch({ headless: false, executablePath: '/usr/bin/chromium-browser' });
		this.chrome = chrome;
		chrome.on('disconnected', () => self.startBrowser(self));
		const page = await chrome.newPage();
		this.currentPage = page;
		await this.currentPage.goto('https://home-control2.azurewebsites.net/player');
	}
}

export default new BrowserController();
