<template>
  <v-app :dark="dark" :key="iteration">
    <v-content>
      <v-layout row>
        <v-flex xs3 column class="ml-3">
          <v-flex>
            <speakers-controls class="mt-3"/>
          </v-flex>
          <v-flex>
            <radio-controls class="mt-3"/>
          </v-flex>
          <v-flex>
            <youtube-search  class="mt-3"/>
          </v-flex>
        </v-flex>
        <v-flex xs9>
          <v-layout class="mx-3 mt-3">
            <v-flex md4 v-if="loaded">
              <week-weather-list :current="current" :dailyData="daily" style="height: 300px;"/>
            </v-flex>
            <v-flex md8>
              <clock-with-date class="mx-3" style="height: 300px;"/>
            </v-flex>
          </v-layout>
          <v-layout class="mt-3">
            <v-flex xs12>
              <weather-chart class="mx-3" :data="hourly"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <settings-dialog/>
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
  },
  data: () => ({
    hourly: [],
    daily: [],
    current: null,
    iteration: 0,
    loaded: false,
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
      const { settings } = window;
      if (settings) {
        return settings.isDark;
      }

      return true;
    },
  },
};
</script>
