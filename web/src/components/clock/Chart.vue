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
        bottom: '20px',
        position: 'absolute',
        width: '60vw',
      };
    },
  },
};
</script>
