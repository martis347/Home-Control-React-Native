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
    async volumeDown() {
      await makeRequest(149369039);
      await makeRequest(149369039);
      await makeRequest(149369039);
      await makeRequest(149369039);
      await makeRequest(149369039);
    },
    async volumeUp() {
      await makeRequest(149393519);
      await makeRequest(149393519);
      await makeRequest(149393519);
      await makeRequest(149393519);
      await makeRequest(149393519);
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
