<template>
  <v-app :dark="dark" :key="iteration">
    <v-content>
      <v-layout>
        <v-flex md3 class="ml-3">
          <speakers-controls class="mt-3"/>
          <radio-controls class="mt-3"/>
          <youtube-search class="mt-3"/>
        </v-flex>
        <v-flex md9 v-if="loaded">
          <v-layout>
            <v-flex md4 class="ml-3">
              <week-weather-list :current="current" :dailyData="daily" class="mt-3" style="height: 280px;"/>
            </v-flex>
            <v-flex md8 class="mx-3">
              <clock-with-date class="mt-3" style="height: 280px;"/>
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

export default {
  name: 'App',
  components: {
    YoutubeSearch,
    SpeakersControls,
    RadioControls,
    SettingsDialog,
    WeekWeatherList,
    ClockWithDate,
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
