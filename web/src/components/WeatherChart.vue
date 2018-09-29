<template>
  <v-card>
    <chart-internal :data="filteredDays" :styles="myStyles"/>
  </v-card>
</template>

<script>
import ChartInternal from './ChartInternal.vue';

export default {
  name: 'Chart',
  components: {
    ChartInternal,
  },
  data: () => ({
    daysOfWeek: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'],
    daysToShow: 24,
  }),
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    updateChart(value) {
      this.daysToShow = value;
      this.key = value;
    },
  },
  computed: {
    filteredDays() {
      const result = this.data.slice(0, this.daysToShow);

      return result;
    },
    myStyles() {
      return {
        height: '320px',
      };
    },
  },
};
</script>
