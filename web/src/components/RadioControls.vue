<template>
  <v-card>
    <v-layout column>
      <v-layout hidden-md-and-down>
        <v-subheader>Radio</v-subheader>
      </v-layout>
      <span class="grey--text text-truncate" style="text-align: center;" v-show="radioStatus.title">
        {{ radioStatus.title }}
      </span>
      <v-layout>
        <v-flex class="text-xs-center">
          <v-btn color="red" fab small flat outline @click="turnOffRadio">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="text-xs-center">
          <v-btn :style="{ 'min-width': smallView ? '20px' : '' }" color="primary" :outline="radioStatus.stream !== 'm1'" small :flat="radioStatus.stream !== 'm1'" @click="turnRadio('m1')">
            M-1
          </v-btn>
          <v-btn :style="{ 'min-width': smallView ? '20px' : '' }" color="primary" :outline="radioStatus.stream !== 'phr'" small :flat="radioStatus.stream !== 'phr'" @click="turnRadio('phr')">
            PHR
          </v-btn>
          <v-btn :style="{ 'min-width': smallView ? '20px' : '' }" color="primary" :outline="radioStatus.stream !== 'relaxfm'" small :flat="radioStatus.stream !== 'relaxfm'" @click="turnRadio('relaxfm')">
            Relax FM
          </v-btn>
          <v-btn :style="{ 'min-width': smallView ? '20px' : '' }" color="primary" :outline="radioStatus.stream !== 'rockfm'" small :flat="radioStatus.stream !== 'rockfm'" @click="turnRadio('rockfm')">
            Rock FM
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
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
  }),
  methods: {
    async turnRadio(station) {
      this.radioStatus.stream = station;
      await this.makeCall(`radio/on/${station}`);
      setTimeout(() => {
        this.refresh();
      }, 3000);
    },
    async turnOffRadio() {
      this.radioStatus.stream = '';
      await this.makeCall('radio/off');
      setTimeout(() => {
        this.refresh();
      }, 3000);
    },
    async updateVolume(amount) {
      this.radioStatus.volume += amount;
      await this.makeCall(`radio/volume/${this.radioStatus.volume}`);
    },
    async setBrightness(mode) {
      await this.makeCall(`lightning/on/${mode}`);
      this.refresh();
    },
    async setBrightnessOff() {
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
    refresh() {
      this.updateRadioStatus();
      this.updateLightningStatus();
    },
  },
  computed: {
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  mounted() {
    if (!window.settings.useLocalServer) {
      this.refresh();
    }
  },
};
</script>
