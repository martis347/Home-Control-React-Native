import apiService from '@/services/api-service';

export default {
  namespaced: true,
  state: {
    ceilingOn: false,
    loadingCeiling: false,
    wallOn: false,
    loadingWall: false,
  },
  actions: {
    async switchWall({ commit, state }) {
      commit('loadingWall');
      await apiService.post(`lightning/wall/${!state.wallOn}`);
      commit('saveWall', !state.wallOn);
    },
    async switchCeiling({ commit, state }) {
      commit('loadingCeiling');
      await apiService.post(`lightning/ceiling/${!state.ceilingOn}`);
      commit('saveCeiling', !state.ceilingOn);
    },
    async refreshStatus({ commit }) {
      commit('loadingWall');
      commit('loadingCeiling');
      const ceilingPromise = apiService.post('lightning/status/ceiling');
      const wallPromise = apiService.post('lightning/status/wall');

      const [ceiling, wall] = await Promise.all([ceilingPromise, wallPromise]);
      commit('saveWall', wall.data);
      commit('saveCeiling', ceiling.data);
    },
  },
  mutations: {
    loadingWall(state) {
      state.loadingWall = true;
    },
    loadingCeiling(state) {
      state.loadingCeiling = true;
    },
    saveWall(state, newValue) {
      state.loadingWall = false;
      state.wallOn = newValue;
    },
    saveCeiling(state, newValue) {
      state.loadingCeiling = false;
      state.ceilingOn = newValue;
    },
  },
};
