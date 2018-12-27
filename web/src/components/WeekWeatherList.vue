<template>
  <v-card style="overflow-y: auto;">
    <v-layout style="position: relative; top: calc(50% - 40px)" v-if="loading">
      <v-progress-circular style="margin: auto;" :size="80" color="primary" indeterminate/>
    </v-layout>
    <template v-else>
      <v-card-text class="pr-0">
        <span class="display-3">{{ current.apparentTemperature }}°</span>
        <canvas id="current-weather" width="40" height="40"></canvas>
        <span style="font-size: 23px;" class="text-truncate">{{ current.summary }}</span>
      </v-card-text>
      <v-list>
        <template v-for="day in daily" >
          <v-list-tile :key="day.id" @click="() => {}">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ day.day }}
            </v-list-tile-title>
            <v-list-tile-sub-title>{{ day.lowTemp }}° - {{ day.highTemp }}°</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <canvas :id="day.id" width="40" height="40"></canvas>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="`divider-${day.id}`"/>
        </template>
      </v-list>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Skycons from '../../skycons';

export default {
  mounted() {
    if (!this.loading) {
      const skycons = new Skycons({ color: 'white' });
      this.dailyData.forEach(day => skycons.add(`${day.id}`, day.icon));
      skycons.add('current-weather', this.current.icon);
      if (!this.disableAnimations) {
        skycons.play();
      }
    }
  },
  computed: {
    ...mapState('weather', ['daily', 'current', 'loading']),
    ...mapState(['disableAnimations']),
  },
};
</script>
