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
        <v-checkbox v-model="alarmEnabled" label="Alarm Enabled"/>
        <div class="picker">
          <v-time-picker
            :value="alarmTime"
            :landscape="$vuetify.breakpoint.mdAndUp"
            format="24hr"
            @change="setAlarm"/>
        </div>
        <v-select
          v-if="!!alarmTime"
          :value="features"
          :items="featuresList"
          chips
          item-text="label"
          item-value="name"
          multiple
          label="Features"
          return-object
          @input="updateFeatures"
        />
        <v-text-field v-if="!!alarmTime && features.find(f => f.name === 'youtube')" :value="youtubeVideo" label="Youtube Video to play" @input="updateYoutubeVideo"/>
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
    alarmEnabled: {
      get() {
        console.log(!!this.alarmTime);
        return !!this.alarmTime;
      },
      set(newValue) {
        this.onCheckboxClick(newValue);
      },
    },
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

  .picker >>> .v-time-picker-title > div {
    margin: auto;
  }
</style>
