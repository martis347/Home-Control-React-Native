<template>
  <v-card>
    <v-layout hidden-md-and-down>
      <v-subheader>Speakers Controls</v-subheader>
    </v-layout>
    <v-flex>
      <v-btn :ripple="!disableAnimations" color="red" small flat fab outline @click="sendRequest(149356799)">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <v-btn :ripple="!disableAnimations" color="primary" small flat fab outline @click="sendRequest(149389439)">
        <v-icon>volume_mute</v-icon>
      </v-btn>
      <span class="mx-3" v-if="$vuetify.breakpoint.lgAndUp"/>
      <v-btn :ripple="!disableAnimations" color="primary" small flat fab outline @click="sendRequest(149393519, 3)">
        <v-icon>volume_up</v-icon>
      </v-btn>
      <v-btn :ripple="!disableAnimations" color="primary" small flat fab outline @click="sendRequest(149369039, 3)">
        <v-icon>volume_down</v-icon>
      </v-btn>
      <span v-if="!smallView" class="mx-3"/>
      <v-btn :ripple="!disableAnimations" color="primary" small flat fab outline @click="sendRequest(149385359)">
        <v-icon>bluetooth</v-icon>
      </v-btn>
      <v-btn :ripple="!disableAnimations" color="primary" small flat fab outline @click="sendRequest(149377199)">
        <v-icon>radio</v-icon>
      </v-btn>
      <v-btn :ripple="!disableAnimations" color="primary" small flat fab outline @click="sendRequest(149401679)">
        <v-icon>tv</v-icon>
      </v-btn>
    </v-flex>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
  }),
  props: {
    disableAnimations: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async sendRequest(code, repeatTimes = 1) {
      while (repeatTimes-- > 0) { // eslint-disable-line
        axios.post(`https://home-control2.azurewebsites.net/api/radio/transmit/${code}`);
      }
    },
  },
  computed: {
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
