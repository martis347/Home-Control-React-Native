<template>
  <v-app :dark="isDark" :key="iteration">
    <v-content>
      <v-layout :column="smallView" :class="smallView ? 'mt-3' : 'asd'">
        <v-flex :class="`${smallView ? `mx-${padding}` : `ml-${padding}`}`" xs3 column>
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
            <v-flex v-if="!smallView" md8>
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
      <youtube-dialog v-model="showYoutubeDialog"/>
      <alarm-dialog v-model="showAlarmDialog"/>
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
        <v-btn
          fab
          color="#FF0000"
          dark
          small
          @click.stop="showYoutubeDialog = !showYoutubeDialog"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn
          fab
          color="teal"
          dark
          small
          @click.stop="showAlarmDialog = !showAlarmDialog"
        >
          <v-icon>alarm</v-icon>
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
import YoutubeDialog from '../components/YoutubeDialog/YoutubeDialog.vue';
import AlarmDialog from '../components/AlarmDialog/AlarmDialog.vue';

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
    YoutubeDialog,
    AlarmDialog,
  },
  data: () => ({
    iteration: 0,
    showSettingsDialog: false,
    showLightsDialog: false,
    showYoutubeDialog: false,
    showAlarmDialog: false,
  }),
  computed: {
    ...mapState(['isDark']),
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    padding() {
      return this.smallView ? 1 : 3;
    },
  },
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
};
</script>
