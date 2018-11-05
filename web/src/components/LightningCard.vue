<template>
  <v-card>
    <v-layout column>
      <v-layout hidden-md-and-down>
        <v-subheader>Lightning</v-subheader>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-btn color="primary" :ripple="!disableAnimations" @click="turnLightOn">
            <v-icon>flash_on</v-icon>
          </v-btn>
          <v-btn color="primary" :ripple="!disableAnimations" @click="turnLightOff">
            <v-icon>block</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    disableAnimations: Boolean,
  },
  methods: {
    turnLightOn() {
      this.makeCall('lightning/on');
    },
    turnLightOff() {
      this.makeCall('lightning/off');
    },
    async makeCall(data) {
      if (this.useLocalServer) {
        const response = await axios.get(`http://192.168.31.246:3001/${data}`);
        return response.data;
      }

      const response = await axios.post(`https://home-control2.azurewebsites.net/api/${data}`);
      return response.data;
    },
  },
};
</script>
