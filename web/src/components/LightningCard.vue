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
      axios.get('http://10.42.0.64/on');
    },
    turnLightOff() {
      axios.get('http://10.42.0.64/off');
    },
  },
};
</script>
