<template>
  <v-card>
    <v-layout column>
      <v-layout hidden-md-and-down>
        <v-subheader>Radio</v-subheader>
      </v-layout>
      <span class="grey--text text-truncate" style="text-align: center;" v-show="streamTitle">
        {{ streamTitle }}
      </span>
      <v-layout>
        <v-flex class="text-xs-center">
          <v-btn
            :ripple="!disableAnimations"
            :loading="loadedStationName === null"
            color="red"
            fab
            small
            flat
            outline
            @click="setStation(null)"
          >
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="text-xs-center">
          <v-btn
            :ripple="!disableAnimations"
            :style="{ 'min-width': '70px' }"
            :loading="loadedStationName === 'm1'"
            :outline="stationName !== 'm1'"
            :flat="stationName !== 'm1'"
            color="primary"
            small
            @click="setStation('m1')"
          >
            M-1
          </v-btn>
          <v-btn
            :ripple="!disableAnimations"
            :style="{ 'min-width': '70px' }"
            :loading="loadedStationName === 'phr'"
            :outline="stationName !== 'phr'"
            :flat="stationName !== 'phr'"
            color="primary"
            small
            @click="setStation('phr')"
          >
            PHR
          </v-btn>
          <v-btn
            :ripple="!disableAnimations"
            :style="{ 'min-width': '70px' }"
            :loading="loadedStationName === 'relaxfm'"
            :outline="stationName !== 'relaxfm'"
            :flat="stationName !== 'relaxfm'"
            color="primary"
            small
            @click="setStation('relaxfm')"
          >
            Relax FM
          </v-btn>
          <v-btn
            :ripple="!disableAnimations"
            :style="{ 'min-width': '70px' }"
            :loading="loadedStationName === 'rockfm'"
            :outline="stationName !== 'rockfm'"
            :flat="stationName !== 'rockfm'"
            color="primary"
            small
            @click="setStation('rockfm')"
          >
            Rock FM
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  mounted() {
    this.refreshRadioStatus();
    setTimeout(this.refreshRadioStatus, 1000 * 60 * 2); // refresh every 2 minutes
  },
  methods: {
    ...mapActions('radio', ['setStation', 'refreshRadioStatus']),
  },
  computed: {
    ...mapState('radio', ['streamTitle', 'stationName', 'loadedStationName']),
    ...mapState(['disableAnimations']),
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
