<template>
  <v-dialog v-model="show" :width="loading ? '500px' : 'fit-content'">
    <v-card class="px-3">
      <v-layout v-if="loading">
        <v-progress-circular
          :size="80"
          style="margin: auto;"
          class="my-5"
          color="primary"
          indeterminate
        />
      </v-layout>
      <v-layout v-else column>
        <v-flex>
          <v-checkbox :value="!!alarmTime" label="Alarm Enabled" @change="onCheckboxClick"/>
        </v-flex>
        <v-flex class="picker">
          <v-time-picker :value="alarmTime" :landscape="$vuetify.breakpoint.mdAndUp" @change="setAlarm"/>
        </v-flex>
        <v-flex v-if="!!alarmTime">
          <v-select
            :value="features"
            :items="featuresList"
            chips
            item-text="label"
            item-value="name"
            multiple
            label="Features"
            return-object
            @change="updateFeatures"
          />
        </v-flex>
        <v-flex v-if="!!alarmTime && features.find(f => f.name === 'youtube')">
          <v-text-field :value="youtubeVideoTitle" label="Youtube Video to play" @input="updateYoutubeVideo"/>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    show: false,
    featuresList: [{ label: 'Ceiling Light', name: 'lights.ceiling' }, { label: 'Wall Light', name: 'lights.wall' }, { label: 'Radio', name: 'radio' }, { label: 'Youtube', name: 'youtube' }],
  }),
  computed: {
    ...mapState('alarm', ['alarmTime', 'features', 'youtubeVideo', 'loading']),
  },
  watch: {
    show(newV) {
      this.$emit('input', newV);
    },
    value(newV) {
      this.show = newV;
      if (this.show) {
        this.load();
      }
    },
  },
  methods: {
    ...mapActions('alarm', ['disableAlarm', 'setAlarm', 'updateFeatures', 'updateYoutubeVideo', 'load']),
    onCheckboxClick(value) {
      if (value) {
        this.setAlarm(localStorage.getItem('defaultAlarmTime') || '08:00');
      } else {
        this.setAlarm(undefined);
      }
    },
  },
};
</script>

<style scoped>
  .picker >>> .v-picker {
    box-shadow: none !important;
  }

  .dialog-wrapper {
    width: auto;
  }
</style>
