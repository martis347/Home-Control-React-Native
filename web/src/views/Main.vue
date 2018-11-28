<template>
  <v-app :dark="dark" :key="iteration">
    <v-content>
      <v-layout v-if="settings" :column="smallView" :class="smallView ? 'mt-3' : 'asd'">
        <v-flex xs3 column :class="`${smallView ? `mx-${padding}` : `ml-${padding}`}`">
          <v-flex>
            <speakers-controls :disable-animations="settings.disableAnimations" :class="`mb-3`"/>
          </v-flex>
          <v-flex>
            <radio-controls :disable-animations="settings.disableAnimations" :class="`mb-3`"/>
          </v-flex>
          <v-flex>
            <youtube-search :disable-animations="settings.disableAnimations" :class="smallView && `mb-3`"/>
          </v-flex>
          <v-flex>
            <lightning-card :disable-animations="settings.disableAnimations" :class="`my-3`"/>
          </v-flex>
        </v-flex>
        <v-flex xs9>
          <v-layout :column="smallView" :class="`mx-${padding}`">
            <v-flex md4>
              <week-weather-list :disable-animations="settings.disableAnimations" :loading="!loaded" :current="current" :dailyData="daily" style="height: 300px;"/>
            </v-flex>
            <v-flex md8 v-if="!smallView">
              <clock-with-date :class="`ml-${padding}`" style="height: 300px;"/>
            </v-flex>
          </v-layout>
          <v-layout :class="`mt-3`">
            <v-flex xs12>
              <weather-chart :loading="!loaded" :class="`mx-${padding}`" :data="hourly"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <settings-dialog v-model="showSettingsDialog" @settings="(v) => settings = v"/>
      <lights-dialog v-model="showLightsDialog"/>
      <v-speed-dial
        :value="true"
        color="primary"
        fixed
        bottom
        right
      >
        <v-btn
          slot="activator"
          color="primary"
          @click.stop="showSettingsDialog = !showSettingsDialog"
          dark
          fab
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-btn
          fab
          color="secondary"
          @click.stop="showLightsDialog = !showLightsDialog"
          dark
          small
        >
          <v-icon>wb_incandescent</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import YoutubeSearch from '../components/YoutubeSearch.vue';
import SpeakersControls from '../components/SpeakersControls.vue';
import RadioControls from '../components/RadioControls.vue';
import SettingsDialog from '../components/SettingsDialog.vue';
import WeekWeatherList from '../components/WeekWeatherList.vue';
import ClockWithDate from '../components/ClockWithDate.vue';
import WeatherChart from '../components/WeatherChart.vue';
import LightningCard from '../components/LightningCard.vue';
import LightsDialog from '../components/LightsDialog/LightsDialog.vue';

export default {
  name: 'App',
  components: {
    YoutubeSearch,
    SpeakersControls,
    RadioControls,
    SettingsDialog,
    WeekWeatherList,
    ClockWithDate,
    WeatherChart,
    LightningCard,
    LightsDialog,
  },
  data: () => ({
    hourly: [],
    daily: [],
    current: null,
    iteration: 0,
    loaded: false,
    showSettingsDialog: false,
    showLightsDialog: false,
    settings: null,
  }),
  mounted() {
    this.loadWeatherData();
    setInterval(this.loadWeatherData, 15 * 60 * 1000);
  },
  methods: {
    async loadWeatherData() {
      const { data } = await axios.get('https://home-control2.azurewebsites.net/api/weather');
      this.hourly = data.hourly;
      this.daily = data.daily;
      this.current = data.current;
      this.iteration += 1;
      this.loaded = true;
    },
  },
  computed: {
    dark() {
      return this.settings ? this.settings.isDark : true;
    },
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    padding() {
      return this.smallView ? 1 : 3;
    },
  },
};
</script>
