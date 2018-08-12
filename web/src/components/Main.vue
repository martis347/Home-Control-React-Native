<template>
  <!-- eslint-disable max-len -->
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
    <v-flex xs12 md8 lg6 offset-md2 offset-lg3>
      <v-card class="mt-3">
        <v-card-title primary-title>
            <div>
              <h3 class="headline">Hey There!</h3>
              <div>I hope you're having a good day 😃</div>
            </div>
        </v-card-title>
      </v-card>
      <v-card class="mt-3">
        <v-subheader>
          Radio <span v-show="radioStatus.volume">&nbsp;({{radioStatus.volume}})</span>
        </v-subheader>
        <span class="grey--text ml-3" v-show="radioStatus.title">
          <b>Now Playing:</b> {{ radioStatus.title }}
        </span>
      <v-layout>
        <v-flex xs5>
            <v-btn :icon="true" @click="turnOffRadio()">
              <v-icon color="primary">stop</v-icon>
            </v-btn>
            <v-btn :icon="true" @click="updateVolume(-5)">
              <v-icon color="primary">volume_down</v-icon>
            </v-btn>
            <v-btn :icon="true" @click="updateVolume(5)">
              <v-icon color="primary">volume_up</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs7 class="mb-3 text-xs-center" :style="{ marginTop: '-8px' }">
            <v-btn color="secondary" small :flat="radioStatus.stream !== 'm1'" @click="turnRadio('m1')">
              M-1
            </v-btn>
            <v-btn color="secondary" small  :flat="radioStatus.stream !== 'phr'" @click="turnRadio('phr')">
              PHR
            </v-btn>
            <v-btn color="secondary" small  :flat="radioStatus.stream !== 'relaxfm'" @click="turnRadio('relaxfm')">
              Relax FM
            </v-btn>
            <v-btn color="secondary" small  :flat="radioStatus.stream !== 'rockfm'" @click="turnRadio('rockfm')">
              Rock FM
            </v-btn>
          </v-flex>
      </v-layout>
      </v-card>
      <v-card class="mt-3">
        <v-subheader>Lightning</v-subheader>
        <v-flex>
          <v-btn :color="!lightningStatus.on ? 'secondary' : ''" :icon="true" @click="setBrightnessOff()">
            <v-icon color="primary">flash_off</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'low' ? 'secondary' : ''" :icon="true" @click="setBrightness('low')">
            <v-icon color="primary">brightness_low</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'medium' ? 'secondary' : ''" :icon="true" @click="setBrightness('medium')">
            <v-icon color="primary">brightness_medium</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'bright' ? 'secondary' : ''" class="mr-4" :icon="true" @click="setBrightness('bright')">
            <v-icon color="primary">brightness_high</v-icon>
          </v-btn>
          <br v-if="$vuetify.breakpoint.xsOnly">
          <v-btn :color="lightningStatus.mode === 'red' ? 'secondary' : ''" :icon="true" @click="setBrightness('red')">
            <v-icon color="red">bubble_chart</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'green' ? 'secondary' : ''" :icon="true" @click="setBrightness('green')">
            <v-icon color="green">bubble_chart</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'blue' ? 'secondary' : ''" :icon="true" @click="setBrightness('blue')">
            <v-icon color="blue">bubble_chart</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'cyan' ? 'secondary' : ''" :icon="true" @click="setBrightness('cyan')">
            <v-icon color="cyan">bubble_chart</v-icon>
          </v-btn>
          <v-btn :color="lightningStatus.mode === 'purple' ? 'secondary' : ''" :icon="true" @click="setBrightness('purple')">
            <v-icon color="purple">bubble_chart</v-icon>
          </v-btn>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    radioStatus: {
      title: '',
      stream: '',
      volume: '',
      on: false,
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
      await this.makeCall(`radio/on/${station}`);
      setTimeout(() => {
        this.refresh();
      }, 3000);
    },
    async turnOffRadio() {
      this.showSnack('Turning radio off.');
      await this.makeCall('radio/off');
      setTimeout(() => {
        this.refresh();
      }, 3000);
    },
    async updateVolume(amount) {
      this.showSnack(`Volume set to ${this.radioStatus.volume}.`);
      await this.updateRadioStatus();
      this.radioStatus.volume += amount;
      await this.makeCall(`radio/volume/${this.radioStatus.volume}`);
      this.refresh();
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
      const response = await axios.post(`/api/${data}`);
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
  },
};
</script>


<style scoped>

</style>
