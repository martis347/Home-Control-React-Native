<template>
  <section class="container1" :key="iteration">
    <Weather :currentData="current" :dailyData="daily" class="box weather"/>
    <div></div>
    <Clock class="box clock"/>
    <Chart :data="hourly" class="box chart"/>
    <div></div>
  </section>
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
      const { data } = await axios.get('/api/weather');

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
* {
  color: #000;
  letter-spacing: 0.5px;
  font-family: "Source Sans Pro", Arial, sans-serif;
}
.container1 {
  background-color: black;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-template-rows: 2fr 3fr;
  grid-gap: 10px;
  height: 100%;
  height: -moz-available;          /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  height: stretch;
}

.box {
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
}

.clock {
  grid-column-start: 3;
  grid-column-end: 5;
}

.weather {
  grid-row-start: 1;
  grid-row-end: 4;
}

.chart {
  grid-column-start: 2;
  grid-column-end: 4;
}

</style>
