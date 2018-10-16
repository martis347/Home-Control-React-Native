<template>
  <v-card style="overflow-x: auto">
    <chart-internal :data="filteredDays" :disable-animations="disableAnimations" :styles="myStyles"/>
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
    daysToShow: 48,
  }),
  props: {
    data: {
      type: Array,
    },
    disableAnimations: {
      type: Boolean,
      default: false,
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
