<template>
  <div>
    <div>
      <div>
        <span class="temperature-text">{{ currentData.apparentTemperature}}°</span>
        <canvas class="current-weather-icon" id="icon1" width="140" height="140"></canvas>
      </div>
      <div class="weather-text">
        {{ currentData.summary }}
      </div>
      <div class="city-text">
        Kaunas, Lithuania
      </div>
    </div>
    <div style="margin-top: 30px;">
      <ul style="padding-left: 0;">
        <li v-for="(day, i) in dailyData" :key="i" class="days-list-item">
          <canvas :id="day.day" width="50" height="50"></canvas>
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
  font-size: 8em;
}

.weather-text {
  margin-top: -30px;
  font-size: 3em;
}

.city-text {
  font-size: 1.5em;
}

.days-list-item {
  list-style-type: none;
  font-size: 1.3em;
  margin-bottom: 8px;
}

.days-list-item > canvas {
  margin: 0 10px -10px 0;
}
</style>
