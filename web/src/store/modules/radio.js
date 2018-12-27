import apiService from '@/services/api-service';

export default {
  namespaced: true,
  state: {
    streamTitle: '',
    stationName: '',
    loadedStationName: '',
  },
  actions: {
    async setStation({ commit, dispatch }, stationName) {
      commit('loadingStation', stationName);
      if (stationName === null) {
        apiService.post('radio/off');
      } else {
        apiService.post(`radio/on/${stationName}`);
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
      await dispatch('refreshRadioStatus');
      commit('stationLoaded');
    },
    async refreshRadioStatus({ commit }) {
      const { data } = await apiService.post('radio/status');
      commit('saveStationData', { stationName: data.stream, streamTitle: data.title });
    },
  },
  mutations: {
    saveStationData(state, { stationName, streamTitle }) {
      state.stationName = stationName;
      state.streamTitle = streamTitle;
    },
    stationLoaded(state) {
      state.loadedStationName = '';
    },
    loadingStation(state, stationName) {
      state.stationName = stationName;
      state.streamTitle = '';
      state.loadedStationName = stationName;
    },
  },
};
