<template>
  <v-card style="overflow-x: auto">
    <v-layout v-if="loading" class="my-5" style="position: relative; top: calc(50% - 40px)">
      <v-progress-circular style="margin: auto;" :size="80" color="primary" indeterminate/>
    </v-layout>
    <chart-internal v-else :data="filteredDays" :disable-animations="disableAnimations" :styles="myStyles"/>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import ChartInternal from './ChartInternal.vue';

export default {
  name: 'Chart',
  components: {
    ChartInternal,
  },
  data: () => ({
    daysOfWeek: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'],
    daysToShow: 48,
  }),
  props: {
    data: {
      type: Array,
    },
    loading: Boolean,
  },
  methods: {
    updateChart(value) {
      this.daysToShow = value;
      this.key = value;
    },
  },
  computed: {
    ...mapState(['disableAnimations']),
    filteredDays() {
      const result = this.data.slice(0, this.daysToShow);

      return result;
    },
    myStyles() {
      return {
        height: '330px',
        width: '1750px',
      };
    },
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
