<template>
  <v-app dark class="main" :key="iteration">
    <Weather :currentData="current" :dailyData="daily" class="weather"/>
    <Clock class="clock"/>
    <Chart :data="hourly" class="chart"/>
  </v-app>
</template>

<script>
import axios from 'axios';
import Weather from '../components/clock/Weather.vue';
import Clock from '../components/clock/Clock.vue';
import Chart from '../components/clock/Chart.vue';

export default {
  data: () => ({
    hourly: [],
    daily: [],
    current: {},
    iteration: 0,
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
    },
  },
  head() {
    return {
      title: 'Smart Mirror',
    };
  },
  components: {
    Weather,
    Clock,
    Chart,
  },
};
</script>

<style scoped>
.main {
  background-color: black;
  position: relative;
}

.clock {
  top: 0;
  right: 0;
  position: absolute;
}

.chart {
  margin: auto;
  width: 50%;
}
</style>
