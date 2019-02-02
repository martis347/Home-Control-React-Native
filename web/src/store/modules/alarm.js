import apiService from '@/services/api-service';

let debounceTimeout = null;
export default {
  namespaced: true,
  state: {
    alarmTime: undefined,
    features: [],
    youtubeVideoId: undefined,
    youtubeVideoTitle: undefined,
    loading: false,
  },
  actions: {
    async load({ commit }) {
      commit('loadingStarted');
      const data = await apiService.get('alarm/sync');
      commit('loadingEnd', data);
    },
    async disableAlarm({ commit, dispatch }) {
      commit('disableAlarm');
      await dispatch('sync');
    },
    async setAlarm({ commit, dispatch }, time) {
      commit('setAlarm', time);
      await dispatch('sync');
    },
    async updateFeatures({ commit, dispatch }, features) {
      commit('updateFeatures', features);
      await dispatch('sync');
    },
    async updateYoutubeVideo({ commit, dispatch }, { id, title }) {
      commit('updateYoutubeVideo', { id, title });
      await dispatch('sync');
    },
    sync({ state }) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        apiService.post('alarm/sync', {
          alarmTime: state.alarmTime,
          features: state.features,
          youtubeVideoId: state.youtubeVideoId,
        });
      }, 800);
    },
  },
  mutations: {
    disableAlarm(state) {
      state.alarmTime = undefined;
    },
    setAlarm(state, time) {
      state.alarmTime = time;
    },
    updateFeatures(state, features) {
      state.features = features;
    },
    updateYoutubeVideo(state, { id, title }) {
      state.youtubeVideoId = id;
      state.youtubeVideoTitle = title;
    },
    loadingStarted(state) {
      state.loading = true;
    },
    loadingEnd(state, data) {
      Object.assign(state, data);
    },
  },
};
