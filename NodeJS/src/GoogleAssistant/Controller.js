import LightningController from '../Lightning/Controller';
import RadioController from '../Radio/Controller';
import LightsStripController from '../LightsStrip/Controller';
import YoutubeController from '../Youtube/Controller';
import axios from 'axios';

class GoogleAssistantController {
	constructor() {
		this.lightningWords = ['leds', 'led', 'lights', 'light', 'ceiling', 'wall'];
		this.audioWords = ['audio', 'speakers', 'volume', 'mute'];
		this.radioWords = ['radio', 'station'];
	}

	handleRequest({ content, action }) {
		const lowercaseContent = (content || '').toLowerCase();
		console.log(`Content: ${lowercaseContent}`);

		if (action === 'everything off' || (lowercaseContent.includes('everything') && lowercaseContent.includes('off'))) {
			console.log('everythingOff');
			this.everythingOff();
			return;
		} else if (action === 'back home' || (lowercaseContent.includes('back') && lowercaseContent.includes('home')) || (lowercaseContent.includes('everything') && lowercaseContent.includes('on'))) {
			console.log('backHome');
			this.backHome();
		} else if (action === 'play') {
			console.log('play');
			this.play(lowercaseContent);
		} else if (this.lightningWords.some(w => lowercaseContent.includes(w))) {
			console.log('handleLightning');
			this.handleLightning(lowercaseContent);
		} else if (this.audioWords.some(w => lowercaseContent.includes(w))) {
			console.log('handleAudio');
			this.handleAudio(lowercaseContent);
		} else if (this.radioWords.some(w => lowercaseContent.includes(w))) {
			console.log('handleRadio');
			this.handleRadio(lowercaseContent);
		}
	}

	async play(name) {
		const { data } = await axios.get(`https://content.googleapis.com/youtube/v3/search?maxResults=10&type=video&q=${name}&part=snippet&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`);
		const videoToPlay = data.items[0];

		YoutubeController.playVideo({
			id: videoToPlay.id.videoId,
			title: videoToPlay.snippet.title,
			description: videoToPlay.snippet.description,
			thumbnail: videoToPlay.snippet.thumbnails.default.url,
		});
	}

	backHome() {
		LightningController.switchCeiling(true);
		RadioController.transmitIR(149356799);
		RadioController.turnOnRadio('m1');
	}

	everythingOff() {
		LightningController.switchCeiling(false);
		LightningController.switchWall(false);
		RadioController.transmitIR(149356799);
		LightsStripController.update({
			...LightsStripController.status,
			mode: 'Off'
		});
	}

	handleLightning(content) {
		const newValue = content.includes('off') ? false : true;
		let switched = false;
		const ceilingWords = ['ceiling', 'top', 'big', 'bright'];
		if (ceilingWords.some(w => content.includes(w))) {
			LightningController.switchCeiling(newValue);
			return;
		}

		const wallWords = ['wall', 'small', 'weak', 'side'];
		if (wallWords.some(w => content.includes(w))) {
			LightningController.switchWall(newValue);
			return;
		}

		const bothLightsWords = ['all', 'both', 'every'];
		if (bothLightsWords.some(w => content.includes(w)) || !switched) {
			LightningController.switchWall(newValue);
			LightningController.switchCeiling(newValue);
		}
	}

	handleAudio(content) {
		if (content.includes('mute')) {
			RadioController.transmitIR(149389439);
			return;
		}
		if (content.includes('off') || content.includes('on')) {
			RadioController.transmitIR(149356799);
			return;
		}

		if (content.includes('to')) {
			const tvWords = ['tv', 'television'];
			if (tvWords.some(w => content.includes(w))) {
				RadioController.transmitIR(149401679);
			}

			const bluetoothWords = ['bluetooth', 'phone', 'computer'];
			if (bluetoothWords.some(w => content.includes(w))) {
				RadioController.transmitIR(149385359);
			}

			if (content.includes('radio')) {
				RadioController.transmitIR(149377199);
			}
			return;
		}

		const volumeDownWords = ['down', 'lower', 'smaller', 'small', 'low'];
		const volumeUpWords = ['up', 'higher', 'bigger', 'high', 'big', 'louder', 'loud'];
		const volumeDown = volumeDownWords.some(w => content.includes(w));
		const volumeUp = volumeUpWords.some(w => content.includes(w));

		if (volumeDown && volumeUp) {
			return;
		}

		let howManyTimes = 7;

		const wordsThatMeanMuch = ['lot', 'much', 'many']
		if (wordsThatMeanMuch.some(w => content.includes(w))) {
			howManyTimes = 15;
		}

		const wordsThatMeanlittle = ['little', 'small', 'not much']
		if (wordsThatMeanlittle.some(w => content.includes(w))) {
			howManyTimes = 5;
		}

		for (let index = 0; index < howManyTimes; index++) {
			if (volumeUp) {
				RadioController.transmitIR(149393519);
			} else if (volumeDown) {
				RadioController.transmitIR(149369039);
			}
		}
	}

	handleRadio(content) {
		if (content.includes('off')) {
			RadioController.turnOffRadio();
			return;
		}

		const stations = Object.keys(RadioController.streams);
		if (content.includes('on')) {
			RadioController.turnOnRadio(stations[0]);
		} else {
			if (content.includes('one') || content.includes('1')) {
				RadioController.turnOnRadio('m1');
			} else if (content.includes('power') || content.includes('hit') || content.includes('phr')) {
				RadioController.turnOnRadio('powerhitradio');
			} else if (content.includes('rock')) {
				RadioController.turnOnRadio('rockfm');
			} else if (content.includes('relax')) {
				RadioController.turnOnRadio('relaxfm');
			}
		}
	}
}

export default new GoogleAssistantController();
