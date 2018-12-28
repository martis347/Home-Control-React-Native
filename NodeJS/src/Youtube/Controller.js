const puppeteer = require('puppeteer-core');

class Video {
	constructor(id, title, description, thumbnail) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
	}
}

class BrowserController {
	constructor() {
		this.state = {
			currentlyPlaying: null,
			history: [],
			queue: [],
		};

		this.startBrowser(this);
	}

	syncState({ currentlyPlaying, queue }) {
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
