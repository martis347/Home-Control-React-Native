import apiService from '@/services/api-service';

export default {
  namespaced: true,
  state: {
    hourly: [],
    daily: [],
    current: null,
    loading: {
      apparentTemperature: null,
      summary: null,
    },
  },
  actions: {
    async loadWeatherData({ commit }) {
      commit('loadingWeatherData');
      const { data } = await apiService.get('weather');
      commit('saveWeatherData', data);
    },
  },
  mutations: {
    loadingWeatherData(state) {
      state.loading = true;
    },
    saveWeatherData(state, data) {
      state.hourly = data.hourly;
      state.daily = data.daily;
      state.current = data.current;
      state.loading = false;
    },
  },
};
