import axios from 'axios';
import apiService from '@/services/api-service';

export default {
  namespaced: true,
  state: {
    searchQuery: '',
    searching: false,
    results: [],
    playedVideoId: null,
    loadingVideo: false,
  },
  actions: {
    async startSearch({ commit, state }) {
      commit('startSearch');
      const { data } = await axios.get(`https://content.googleapis.com/youtube/v3/search?maxResults=10&type=video&q=${state.searchQuery}&part=snippet&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`);
      const searchResults = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
      commit('saveResults', searchResults);
    },
    async playVideo({ commit }, videoId) {
      commit('startVideoPlaying', videoId);
      apiService.post(`youtube/start/${videoId}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      commit('videoLoaded');
    },
    stopVideo({ commit }) {
      axios.post('https://home-control2.azurewebsites.net/api/youtube/stop');
      commit('stopVideo');
    },
  },
  mutations: {
    updateSearch(state, keyword) {
      state.searchQuery = keyword;
    },
    startSearch(state) {
      state.searching = true;
    },
    saveResults(state, searchResults) {
      state.results = searchResults;
      state.searching = false;
    },
    startVideoPlaying(state, videoId) {
      state.playedVideoId = videoId;
      state.loadingVideo = true;
    },
    videoLoaded(state) {
      state.loadingVideo = false;
    },
    stopVideo(state) {
      state.playedVideoId = null;
    },
  },
};
