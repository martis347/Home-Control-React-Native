import Vue from 'vue';
import Vuex from 'vuex';
import youtube from './modules/youtube';
import speakers from './modules/speakers';
import radio from './modules/radio';
import lightning from './modules/lightning';
import weather from './modules/weather';
import lightsStrip from './modules/lightsStrip';
import alarm from './modules/alarm';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: false,
  state: {
    disableAnimations: localStorage.getItem('disableAnimations') === 'true',
    isDark: localStorage.getItem('isDark') !== 'false',
  },
  modules: {
    radio,
    youtube,
    speakers,
    lightning,
    weather,
    lightsStrip,
    alarm,
  },
  actions: {
    updateDisableAnimations({ commit, state }) {
      localStorage.setItem('disableAnimations', !state.disableAnimations);
      commit('disableAnimations', !state.disableAnimations);
    },
    updateIsDark({ commit, state }) {
      localStorage.setItem('isDark', !state.isDark);
      commit('isDark', !state.isDark);
    },
  },
  mutations: {
    disableAnimations(state, newValue) {
      state.disableAnimations = newValue;
    },
    isDark(state, newValue) {
      state.isDark = newValue;
    },
  },
});
