import LightningController from '../Lightning/Controller';
import RadioController from '../Radio/Controller';

class GoogleAssistantController {
	constructor() {
		this.lightningWords = ['leds', 'led', 'lights', 'light', 'ceiling', 'wall'];
		this.audioWords = ['audio', 'speakers', 'volume', 'mute'];
		this.radioWords = ['radio', 'station'];
	}

	handleRequest({ content }) {
		if (this.lightningWords.some(w => content.includes(w))) {
			this.handleLightning(content);
		} else if (this.audioWords.some(w => content.includes(w))) {
			this.handleAudio(content);
		} else if (this.radioWords.some(w => content.includes(w))) {
			this.handleRadio(content);
		}
	}

	handleLightning(content) {
		const newValue = content.includes('off') ? false : true;
		let switched = false;
		const ceilingWords = ['ceiling', 'top', 'big', 'bright'];
		if (ceilingWords.some(w => content.includes(w))) {
			LightningController.switchCeiling(newValue);
			switched = true;
		}

		const wallWords = ['wall', 'small', 'weak', 'side'];
		if (wallWords.some(w => content.includes(w))) {
			LightningController.switchWall(newValue);
			switched = true;
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
		if (content.includes('off')) {
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
		const newValue = volumeDownWords.some(w => content.includes(w)) ? false : true;
		let howManyTimes = 5;

		const wordsThatMeanMuch = ['lot', 'much', 'many']
		if (wordsThatMeanMuch.some(w => content.includes(w))) { // alot
			howManyTimes = 10;
		}

		const wordsThatMeanlittle = ['little', 'small', 'not much']
		if (wordsThatMeanlittle.some(w => content.includes(w))) { // alot
			howManyTimes = 3;
		}
		
		while (howManyTimes > 0) {
			setTimeout(() => {
				if (newValue) {
					RadioController.transmitIR(149393519);
				} else {
					RadioController.transmitIR(149369039);
				}
			}, 130 * howManyTimes);
		}
	}

	handleRadio(content) {
		if (content.includes('off')) {
			RadioController.turnOffRadio();
			return;
		}

		const stations = Object.values(RadioController.streams);
		const currentStationIndex = stations.indexOf(RadioController.status.stream);
		if (content.includes('on')) {
			RadioController.turnOnRadio(stations[0]);
		} else if (content.includes('next')) {
			RadioController.turnOnRadio((currentStationIndex + 1) % stations.length);
		} else if (content.includes('previous') && currentStationIndex !== -1) {
			RadioController.turnOnRadio(((currentStationIndex + stations.length) - 1) % stations.length);
		} else {
			if (content.includes('m1') || content.includes('one')) {
				RadioController.turnOnRadio(RadioController.streams.m1);
			} else if (content.includes('power') || content.includes('hit') || content.includes('phr')) {
				RadioController.turnOnRadio(RadioController.streams.powerhitradio);
			} else if (content.includes('rock')) {
				RadioController.turnOnRadio(RadioController.streams.rockfm);
			} else if (content.includes('relax')) {
				RadioController.turnOnRadio(RadioController.streams.relaxfm);
			}
		}
	}
}

export default new GoogleAssistantController();
