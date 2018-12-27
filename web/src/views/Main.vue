<template>
  <v-app :dark="isDark" :key="iteration">
    <v-content>
      <v-layout :column="smallView" :class="smallView ? 'mt-3' : 'asd'">
        <v-flex xs3 column :class="`${smallView ? `mx-${padding}` : `ml-${padding}`}`">
          <v-flex>
            <speakers-controls :class="'mb-3'"/>
          </v-flex>
          <v-flex>
            <radio-controls :class="'mb-3'"/>
          </v-flex>
          <v-flex>
            <youtube-search :class="smallView && 'mb-3'"/>
          </v-flex>
          <v-flex>
            <lightning-card :class="`my-3`"/>
          </v-flex>
        </v-flex>
        <v-flex xs9>
          <v-layout :column="smallView" :class="`mx-${padding}`">
            <v-flex md4>
              <week-weather-list style="height: 300px;" />
            </v-flex>
            <v-flex md8 v-if="!smallView">
              <clock-with-date :class="`ml-${padding}`" style="height: 300px;"/>
            </v-flex>
          </v-layout>
          <v-layout :class="`mt-3`">
            <v-flex xs12>
              <weather-chart :class="`mx-${padding}`"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <settings-dialog v-model="showSettingsDialog"/>
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
          dark
          fab
          @click.stop="showSettingsDialog = !showSettingsDialog"
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-btn
          fab
          color="secondary"
          dark
          small
          @click.stop="showLightsDialog = !showLightsDialog"
        >
          <v-icon>wb_incandescent</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    iteration: 0,
    showSettingsDialog: false,
    showLightsDialog: false,
  }),
  mounted() {
    this.loadWeatherData();
    setInterval(() => {
      this.loadWeatherData();
      this.iteration += 1;
    }, 15 * 60 * 1000);
  },
  methods: {
    ...mapActions('weather', ['loadWeatherData']),
  },
  computed: {
    ...mapState(['isDark']),
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    padding() {
      return this.smallView ? 1 : 3;
    },
  },
};
</script>
