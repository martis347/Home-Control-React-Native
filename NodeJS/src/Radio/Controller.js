import MPlayer from 'mplayer';
import axios from 'axios';

class RadioController {
	constructor() {
		this.streams = {
			m1: 'http://stream.m-1.fm/m1/aacp64',
			phr: 'https://power-stream.tv3.lt:8080/PHR.mp3',
			powerhitradio: 'https://power-stream.tv3.lt:8080/PHR.mp3',
			rockfm: 'http://5.20.223.18/crf128.mp3',
			relaxfm: 'http://5.20.223.18/relaxfm128.mp3',
		};

		this.controllerUrl = 'http://10.42.0.60';
		this.speakersControllerUrl = 'http://192.168.31.241';
		
		this.status = {
			title: '',
			stream: '',
			volume: 0,
			on: false,
		}
	}

	async turnOnRadio(radioName) {
		console.log(`turnOnRadio ${radioName}`);
		const radioToPlay = radioName.replace(' ', '').toLowerCase();

		const stream = this.streams[radioToPlay];
		if (!stream) {
			return;
		}
		if (this.player) {
			await this.turnOffSpeakers(true);
			this.player.stop();
		}
		this.player = new MPlayer();
		this.player.on('status', (status) => {
			this.status.title = status.title;
		});
		this.player.openFile(stream, { volume: 5 });

		while(!this.player.status.position) {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 100);
			});
		}
		this.player.volume(this.status.volume || 100);
		await this.turnOnSpeakers();

		this.status.stream = radioToPlay;
		this.status.on = true;
		this.status.volume = this.status.volume || 100;
	}

	async turnOnSpeakers() {
		console.log(`turnOnSpeakers`);
		try {
			await axios.get(`${this.controllerUrl}/on`, { timeout: 500 });
		} catch (error) {
			console.log(`${this.controllerUrl}/on Did not respond.`);
		}
	}

	setSpeakersVolume(volume) {
		console.log(`setSpeakersVolume`);
		if (!this.player) {
			return;
		}

		this.player.volume(Number(volume));
		this.status.volume = Number(volume);
	}

	async turnOffSpeakers(keepVolume = false) {
		console.log(`turnOffSpeakers`);
		if (!this.player) {
			return;
		}
		try {
			await axios.get(`${this.controllerUrl}/off`, { timeout: 500 });
		} catch (error) {
			console.log(`${this.controllerUrl}/off Did not respond.`);
		}

		this.player.stop();
		this.status = {
			title: '',
			stream: '',
			volume: keepVolume ? this.status.volume : 0,
			on: false,
		}
	}

	getSpeakersStatus() {
		console.log(`getSpeakersStatus`);
		return this.status;
	}

	transmitIR(code) {
		console.log(`transmitIR`);
		axios.get(`${this.speakersControllerUrl}/transmit?code=${code}`);
	}
}

export default new RadioController();
