import apiService from '@/services/api-service';

export default {
  namespaced: true,
  state: {
    loading: false,
    debounceTimeout: null,
    lightsState: {
      mode: 'Off',
      brightness: '255',
      palette: 'Rainbow',
      speed: '30',
      customPaletteSize: '8',
      customPaletteColors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
    },
  },
  actions: {
    updateState({ commit, state, dispatch }, data) {
      if (data.customPaletteSize) {
        data.customPaletteColors = state.lightsState.customPaletteColors;
        const oldSize = +state.lightsState.customPaletteSize;
        const newSize = +data.customPaletteSize;
        if (newSize > oldSize) {
          while (data.customPaletteColors.length !== newSize) {
            data.customPaletteColors.push('#000000');
          }
        } else {
          data.customPaletteColors = data.customPaletteColors.filter((_, index) => index < newSize);
        }
      }

      commit('updateState', {
        ...state.lightsState,
        ...data,
      });
      dispatch('saveState');
    },
    async getStatus({ commit }) {
      commit('loadingState');
      const { data } = await apiService.post('lightsStrip/status');
      commit('stateLoaded');
      commit('updateState', {
        ...data,
        customPaletteColors: data.customPaletteColors.map(c => `#${(`000000${(+c).toString(16)}`).substr(-6)}`),
      });
    },
    async saveState({ commit, state }) {
      const data = { ...state.lightsState };
      data.customPaletteColors = data.customPaletteColors.map(c => parseInt(c.replace('#', ''), 16));
      commit('debounce', setTimeout(() => {
        apiService.post('', {
          controller: 'lightsStrip/update',
          data,
        });
      }, 300));
    },
  },
  mutations: {
    updateState(state, newValue) {
      state.lightsState.mode = newValue.mode;
      state.lightsState.brightness = newValue.brightness;
      state.lightsState.palette = newValue.palette;
      state.lightsState.speed = newValue.speed;
      state.lightsState.customPaletteSize = newValue.customPaletteSize;
      state.lightsState.customPaletteColors = newValue.customPaletteColors;
    },
    loadingState(state) {
      state.loading = true;
    },
    stateLoaded(state) {
      state.loading = false;
    },
    debounce(state, debounceTimeout) {
      clearTimeout(state.debounceTimeout);
      state.debounceTimeout = debounceTimeout;
    },
  },
};
