<template>
  <v-card>
    <v-layout hidden-md-and-down>
      <v-subheader>Speakers Controls</v-subheader>
    </v-layout>
    <v-flex>
      <v-btn
        color="red"
        small
        flat
        fab
        outline
        :ripple="!disableAnimations"
        @click="switchPower">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <v-btn
        :ripple="!disableAnimations"
        color="primary"
        small
        flat
        fab
        outline
        @click="mute">
        <v-icon>volume_mute</v-icon>
      </v-btn>
      <span class="mx-3" v-if="$vuetify.breakpoint.lgAndUp"/>
      <v-btn
        :ripple="!disableAnimations"
        color="primary"
        small
        flat
        fab
        outline
        @click="volumeDown">
        <v-icon>volume_down</v-icon>
      </v-btn>
      <v-btn
        :ripple="!disableAnimations"
        color="primary"
        small
        flat
        fab
        outline
        @click="volumeUp">
        <v-icon>volume_up</v-icon>
      </v-btn>
      <span v-if="!smallView" class="mx-3"/>
      <v-btn
        :ripple="!disableAnimations"
        color="primary"
        small
        flat
        fab
        outline
        @click="bluetoothMode">
        <v-icon>bluetooth</v-icon>
      </v-btn>
      <v-btn
        :ripple="!disableAnimations"
        color="primary"
        small
        flat
        fab
        outline
        @click="radioMode">
        <v-icon>radio</v-icon>
      </v-btn>
      <v-btn
        :ripple="!disableAnimations"
        color="primary"
        small
        flat
        fab
        outline
        @click="tvMode">
        <v-icon>tv</v-icon>
      </v-btn>
    </v-flex>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  methods: {
    ...mapActions('speakers', ['switchPower', 'mute', 'volumeDown', 'volumeUp', 'bluetoothMode', 'radioMode', 'tvMode']),
  },
  computed: {
    ...mapState(['disableAnimations']),
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
