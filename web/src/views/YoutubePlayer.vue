<template>
  <div>
    <div v-show="showPlayer" id="video-player"></div>
  </div>
</template>

<script>
import YouTubePlayer from 'youtube-player';
import axios from 'axios';

export default {
  data: () => ({
    player: null,
    showPlayer: false,
    playedVideoId: '',
    last5VideoIds: [],
  }),
  mounted() {
    this.showPlayer = Object.prototype.hasOwnProperty.call(this.$route.query, 'show');
    this.player = YouTubePlayer('video-player');
    this.playVideo(this.$route.params.videoId);

    this.player.on('stateChange', async (event) => {
      if (event.data === 0) {
        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${this.playedVideoId}&type=video&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`);
        const videoIds = data.items.map(i => i.id.videoId).filter(id => !this.last5VideoIds.includes(id));
        const nextVideoId = videoIds[this.getRandomInt(0, videoIds.length - 1)];
        this.playVideo(nextVideoId);
      }
    });
  },
  methods: {
    getRandomInt(min, max) {
      const result = Math.floor(Math.random() * ((max - min) + 1)) + min;
      return result;
    },
    playVideo(id) {
      this.player.loadVideoById(id);
      this.playedVideoId = id;
      this.last5VideoIds.push(id);
      this.$router.push({ params: { videoId: id } });
      if (this.last5VideoIds.length === 5) {
        this.last5VideoIds = this.last5VideoIds.slice(1);
      }
    },
  },
};
</script>
