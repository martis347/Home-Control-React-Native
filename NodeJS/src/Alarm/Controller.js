import LightningController from '../Lightning/Controller';
import RadioController from '../Radio/Controller';
import YoutubeController from '../Youtube/Controller';

class AlarmController {
	constructor() {
		this.alarmTime = undefined;
		this.features = [];
		this.youtubeVideo = undefined;

		setInterval(() => {
			const currentDate = new Date();
			const timeMatches = this.alarmTime === `${currentDate.getHours()}:${currentDate.getMinutes()}`;

			if (!timeMatches) {
				return;
			}

			if (this.features.includes('lights.ceiling')) {
				LightningController.switchCeiling(true);
			}

			if (this.features.includes('lights.wall')) {
				LightningController.switchWall(true);
			}

			if (this.features.includes('radio')) {
				RadioController.turnOnRadio('m1');
				RadioController.transmitIR(149356799);
			}

			if (this.features.includes('youtube')) {
				axios.get(`https://content.googleapis.com/youtube/v3/search?maxResults=1&type=video&q=${state.searchQuery}&part=snippet&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`)
					.then(({ data }) => {
						YoutubeController.startYoutube(data.items[0].id.videoId);
					});
			}
		}, 60 * 1000);
	}

	async sync(data) {
		this.alarmTime = data.alarmTime;
		this.features = data.features;
		this.youtubeVideo = data.youtubeVideo;
	}

	async getState() {
		return {
			alarmTime: this.alarmTime,
			features: this.features,
			youtubeVideo: this.youtubeVideo,
		};
	}
}

export default new AlarmController();
