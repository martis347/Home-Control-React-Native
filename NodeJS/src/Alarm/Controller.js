import axios from 'axios';
import LightningController from '../Lightning/Controller';
import RadioController from '../Radio/Controller';
import YoutubeController from '../Youtube/Controller';

class AlarmController {
	constructor() {
		this.alarmTime = undefined;
		this.features = [];
		this.youtubeVideo = undefined;

		setInterval(() => {
			const adjustTime = (number) => {
				if (number < 10) {
					return `0${number}`;
				}

				return number;
			}

			const currentDate = new Date();
			const currentTime = `${adjustTime(currentDate.getHours())}:${adjustTime(currentDate.getMinutes())}`;

			console.log(`${this.alarmTime} === ${currentTime}`);
			if (currentTime !== this.alarmTime) {
				return;
			}

			const featuresNames = this.features.map(f => f.name);
			if (featuresNames.includes('lights.ceiling')) {
				console.log('lights.ceiling');
				LightningController.switchCeiling(true);
			}

			if (featuresNames.includes('lights.wall')) {
				console.log('lights.wall');
				LightningController.switchWall(true);
			}

			if (featuresNames.includes('radio')) {
				console.log('radio');
				YoutubeController.stopYoutube();
				RadioController.turnOnRadio('m1');
				RadioController.transmitIR(149356799);
			}

			if (featuresNames.includes('youtube')) {
				console.log('youtube');
				RadioController.turnOffRadio();
				axios.get(`https://content.googleapis.com/youtube/v3/search?maxResults=1&type=video&q=${this.youtubeVideo}&part=snippet&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`)
					.then(({ data }) => {
						RadioController.transmitIR(149356799);
						YoutubeController.startYoutube(data.items[0].id.videoId);
					});
			}
		}, 60 * 1000);
	}

	sync(data) {
		this.alarmTime = data.alarmTime;
		this.features = data.features;
		this.youtubeVideo = data.youtubeVideo;
	}

	getState() {
		return {
			alarmTime: this.alarmTime,
			features: this.features,
			youtubeVideo: this.youtubeVideo,
		};
	}
}

export default new AlarmController();
