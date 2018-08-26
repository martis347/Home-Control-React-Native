<template>
  <div>
    <div>
      <div>
        <span class="temperature-text">{{ currentData.apparentTemperature}}°</span>
        <canvas class="current-weather-icon" id="icon1" width="60" height="60"></canvas>
      </div>
      <div class="weather-text">
        {{ currentData.summary }}
      </div>
      <div class="city-text">
        Kaunas, Lithuania
      </div>
    </div>
    <div style="margin-top: 4vh;">
      <ul style="padding-left: 0;">
        <li v-for="(day, i) in dailyData" :key="i" class="days-list-item">
          <canvas :id="day.day" width="30" height="30"></canvas>
          <span>{{ day.day }} {{ day.lowTemp }}° - {{ day.highTemp }}°</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Skycons from '../../../skycons';

export default {
  name: 'Weather',
  mounted() {
    const skycons = new Skycons({ color: 'white' });
    this.dailyData.forEach(d => skycons.add(d.day, d.icon));
    skycons.add('icon1', this.currentData.icon);
    skycons.play();
  },
  props: {
    currentData: Object,
    dailyData: Array,
  },
};
</script>
<style scoped>
.temperature-text {
  font-size: 8vw;
  margin-top: 10vh;
}

.weather-text {
  font-size: 4vw;
  margin-top: -8vh;
}

.city-text {
  font-size: 1.5em;
}

.current-weather-icon {
  margin-bottom: -2vh;
}

.days-list-item {
  list-style-type: none;
  font-size: 2.5vw;
  margin-bottom: 6px;
}

.days-list-item > canvas {
  margin: 0 10px -10px 0;
}
</style>
