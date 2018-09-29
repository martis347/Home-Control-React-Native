<template>
  <v-layout>
    <v-snackbar
      v-model="snackbar"
      bottom="bottom"
      :timeout="2000"
    >
      {{ snackbarText }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-flex xs3>
      <v-card class="mt-3">
        <v-layout column>
          <v-layout hidden-md-and-down>
            <v-subheader>Radio</v-subheader>
          </v-layout>
          <span class="grey--text text-truncate" style="text-align: center;" v-show="radioStatus.title">
            {{ radioStatus.title }}
          </span>
          <v-btn color="red" small flat @click="turnOffRadio">
            <span>STOP</span>
          </v-btn>
          <v-divider/>
          <v-flex class="text-xs-center">
            <v-btn color="secondary" :outline="radioStatus.stream !== 'm1'" small :flat="radioStatus.stream !== 'm1'" @click="turnRadio('m1')">
              M-1
            </v-btn>
            <v-btn color="secondary" :outline="radioStatus.stream !== 'phr'" small :flat="radioStatus.stream !== 'phr'" @click="turnRadio('phr')">
              PHR
            </v-btn>
            <v-btn color="secondary" :outline="radioStatus.stream !== 'relaxfm'" small :flat="radioStatus.stream !== 'relaxfm'" @click="turnRadio('relaxfm')">
              Relax FM
            </v-btn>
            <v-btn color="secondary" :outline="radioStatus.stream !== 'rockfm'" small :flat="radioStatus.stream !== 'rockfm'" @click="turnRadio('rockfm')">
              Rock FM
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
      <audio-controls/>
      <youtube-search/>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import YoutubeSearch from './YoutubeSearch.vue';
import AudioControls from './AudioControls.vue';

export default {
  components: {
    YoutubeSearch,
    AudioControls,
  },
  data: () => ({
    radioStatus: {
      title: '',
      stream: '',
      volume: 0,
      on: false,
      fab: false,
    },
    lightningStatus: {
      mode: '',
      on: false,
    },
    snackbar: false,
    snackbarText: '',
  }),
  methods: {
    async turnRadio(station) {
      this.showSnack(`Turning radio to ${station}.`);
      this.radioStatus.stream = station;
      await this.makeCall(`radio/on/${station}`);
      setTimeout(() => {
        this.refresh();
      }, 3000);
    },
    async turnOffRadio() {
      this.showSnack('Turning radio off.');
      this.radioStatus.stream = '';
      await this.makeCall('radio/off');
      setTimeout(() => {
        this.refresh();
      }, 3000);
    },
    async updateVolume(amount) {
      this.radioStatus.volume += amount;
      this.showSnack(`Volume set to ${this.radioStatus.volume}.`);
      await this.makeCall(`radio/volume/${this.radioStatus.volume}`);
    },
    async setBrightness(mode) {
      this.showSnack(`Setting lightning to ${mode}.`);
      await this.makeCall(`lightning/on/${mode}`);
      this.refresh();
    },
    async setBrightnessOff() {
      this.showSnack('Turning off lightning.');
      await this.makeCall('lightning/off');
      this.refresh();
    },
    async updateRadioStatus() {
      const response = await this.makeCall('radio/status');
      this.radioStatus = response;
    },
    async updateLightningStatus() {
      const response = await this.makeCall('lightning/status');
      this.lightningStatus = response;
    },
    async makeCall(data) {
      if (window.settings.useLocalServer) {
        const response = await axios.get(`http://192.168.31.246:3001/${data}`);
        return response.data;
      }

      const response = await axios.post(`https://home-control2.azurewebsites.net/api/${data}`);
      return response.data;
    },
    showSnack(message) {
      this.snackbarText = message;
      this.snackbar = true;
    },
    refresh() {
      this.updateRadioStatus();
      this.updateLightningStatus();
    },
  },
  mounted() {
    if (!window.settings.useLocalServer) {
      this.refresh();
    }
  },
};
</script>


<style scoped>

</style>
