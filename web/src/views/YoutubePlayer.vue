<template>
  <div>
    <div v-show="showPlayer" id="video-player"></div>
  </div>
</template>

<script>
import YouTubePlayer from 'youtube-player';
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    player: null,
    showPlayer: false,
    playedVideoId: '',
  }),
  mounted() {
    this.showPlayer = Object.prototype.hasOwnProperty.call(this.$route.query, 'show');
    this.player = YouTubePlayer('video-player');
    if (this.$route.params.videoId) {
      this.playVideoInternal(this.$route.params.videoId);
    }

    this.player.on('stateChange', this.onStateChange.bind(this));

    window.playVideo = this.playVideoInternal;
    window.stopPlaying = this.stop;
  },
  computed: {
    ...mapState('youtube', ['playQueue', 'searchResults']),
  },
  methods: {
    ...mapActions('youtube', ['syncState', 'play', 'playNext', 'findRelatedVideos']),
    getRandomInt(min, max) {
      const result = Math.floor(Math.random() * ((max - min) + 1)) + min;
      return result;
    },
    async onStateChange(event) {
      if (event.data === 0) {
        this.playNext();
      }
    },
    playVideoInternal(id) {
      console.log(id);
      this.player.loadVideoById(id);
      this.playedVideoId = id;
      this.$router.push({ params: { videoId: id } });
    },
    stop() {
      this.player.stopVideo();
      this.playedVideoId = null;
    },
  },
};
</script>
