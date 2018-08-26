<template>
  <div>
    <chart-internal :data="data" :styles="myStyles"/>
  </div>
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
  }),
  props: {
    data: {
      type: Array,
    },
  },
  computed: {
    myStyles() {
      return {
        bottom: '0',
        right: '2vw',
        width: '63vw',
        height: '65vh',
        position: 'absolute',
      };
    },
  },
};
</script>
