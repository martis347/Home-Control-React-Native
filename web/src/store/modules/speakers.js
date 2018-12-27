import apiService from '@/services/api-service';

const makeRequest = code => apiService.post(`radio/transmit/${code}`);

export default {
  namespaced: true,
  actions: {
    switchPower() {
      makeRequest(149356799);
    },
    mute() {
      makeRequest(149389439);
    },
    volumeDown() {
      makeRequest(149369039);
      makeRequest(149369039);
      makeRequest(149369039);
    },
    volumeUp() {
      makeRequest(149393519);
      makeRequest(149393519);
      makeRequest(149393519);
    },
    bluetoothMode() {
      makeRequest(149385359);
    },
    radioMode() {
      makeRequest(149377199);
    },
    tvMode() {
      makeRequest(149401679);
    },
  },
};
