<template>
  <v-card>
    <v-layout hidden-md-and-down>
      <v-subheader>Speakers Controls</v-subheader>
    </v-layout>
    <v-flex>
      <v-btn color="red" small flat fab outline @click="sendRequest(149356799)">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <v-btn color="primary" small flat fab outline @click="sendRequest(149389439)">
        <v-icon>volume_mute</v-icon>
      </v-btn>
      <span class="mx-3" v-if="$vuetify.breakpoint.lgAndUp"/>
      <v-btn color="primary" small flat fab outline @click="sendRequest(149393519, 3)">
        <v-icon>volume_up</v-icon>
      </v-btn>
      <v-btn color="primary" small flat fab outline @click="sendRequest(149369039, 3)">
        <v-icon>volume_down</v-icon>
      </v-btn>
      <span v-if="!smallView" class="mx-3"/>
      <v-btn color="primary" small flat fab outline @click="sendRequest(149385359)">
        <v-icon>bluetooth</v-icon>
      </v-btn>
      <v-btn color="primary" small flat fab outline @click="sendRequest(149377199)">
        <v-icon>radio</v-icon>
      </v-btn>
      <v-btn color="primary" small flat fab outline @click="sendRequest(149401679)">
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
  methods: {
    async sendRequest(code, repeatTimes = 1) {
      while (repeatTimes-- > 0) { // eslint-disable-line
        if (window.settings.useLocalServer) {
          axios.get(`http://192.168.31.79/transmit?code=${code}`);
        } else {
          axios.post('https://home-control2.azurewebsites.net/api', {
            request: `transmit?code=${code}`,
          });
        }
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
