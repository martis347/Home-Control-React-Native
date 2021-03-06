import axios from 'axios';
import apiService from '@/services/api-service';

const getRandomInt = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

export default {
  namespaced: true,
  state: {
    searchQuery: '',
    startingVideoId: null,
    searching: false,
    syncing: false,
    searchResults: [],
    playQueue: [],
    playHistory: [],
    currentlyPlaying: null,
  },
  actions: {
    async search({ commit, state }) {
      commit('searching');
      const { data } = await axios.get(`https://content.googleapis.com/youtube/v3/search?maxResults=10&type=video&q=${state.searchQuery}&part=snippet&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`);
      const searchResults = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
      commit('saveResults', searchResults);
    },
    async findRelatedVideos({ commit }, video) {
      commit('searching');
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${
          video.id
        }&type=video&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`,
      );
      const searchResults = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
      commit('saveResults', searchResults);
    },
    async syncState({ commit, state }, { readOnly } = { readOnly: false }) {
      commit('sync');
      const { data } = await apiService.post('', {
        controller: 'youtube/syncState',
        data: readOnly
          ? {}
          : {
            currentlyPlaying: state.currentlyPlaying,
            queue: state.playQueue,
          },
      });
      commit('syncState', data);
    },
    async play({ commit, dispatch }, video) {
      commit('startVideoPlaying', video);
      apiService.post(`youtube/start/${video.id}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      commit('videoLoaded');
      dispatch('syncState');
    },
    async playNext({ commit, dispatch, state }) {
      await dispatch('syncState', { readOnly: true });
      if (state.playQueue.length === 0) {
        await dispatch('findRelatedVideos', state.currentlyPlaying);
        const videoToPlay = state.searchResults[getRandomInt(0, state.searchResults.length - 1)];
        await dispatch('clearSearchResults');
        await dispatch('play', videoToPlay);
      } else {
        const firstVideoInQueue = state.playQueue[0];
        commit('startVideoPlaying', firstVideoInQueue);
        await apiService.post(`youtube/start/${firstVideoInQueue.id}`);
        commit('videoLoaded');
        commit('removeFirstVideoFromQueue');
      }
      dispatch('syncState');
    },
    stopPlaying({ commit, dispatch }) {
      axios.post('https://home-control2.azurewebsites.net/api/youtube/stop');
      commit('stopVideo');
      dispatch('syncState');
    },
    addToQueue({ commit, dispatch }, video) {
      commit('addToQueue', video);
      dispatch('syncState');
    },
    removeFromQueue({ commit, dispatch }, video) {
      commit('removeFromQueue', video);
      dispatch('syncState');
    },
    moveToTopOfTheQueue({ commit, dispatch }, video) {
      commit('moveToTopOfTheQueue', video);
      dispatch('syncState');
    },
    clearSearchResults({ commit }) {
      commit('clearSearchResults');
    },
    restartService() {
      apiService.post('', {
        controller: 'youtube/restart',
      });
    },
  },
  mutations: {
    updateSearch(state, keyword) {
      state.searchQuery = keyword;
    },
    searching(state) {
      state.searching = true;
    },
    sync(state) {
      state.syncing = true;
    },
    saveResults(state, searchResults) {
      state.searching = false;
      state.searchResults = searchResults;
    },
    syncState(state, newState) {
      state.playQueue = newState.queue;
      state.playHistory = newState.history;
      state.currentlyPlaying = newState.currentlyPlaying;
      state.syncing = false;
    },
    startVideoPlaying(state, video) {
      state.currentlyPlaying = video;
      state.startingVideoId = video.id;
    },
    videoLoaded(state) {
      state.startingVideoId = null;
    },
    stopVideo(state) {
      state.currentlyPlaying = null;
    },
    addToQueue(state, video) {
      state.playQueue = state.playQueue.filter(v => v.id !== video.id);
      state.playQueue.push(video);
    },
    removeFromQueue(state, video) {
      state.playQueue = state.playQueue.filter(v => v.id !== video.id);
    },
    moveToTopOfTheQueue(state, video) {
      state.playQueue = state.playQueue.filter(v => v.id !== video.id);

      state.playQueue = [video, ...state.playQueue];
    },
    removeFirstVideoFromQueue(state) {
      state.playQueue = state.playQueue.filter((_, index) => index !== 0);
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
};
