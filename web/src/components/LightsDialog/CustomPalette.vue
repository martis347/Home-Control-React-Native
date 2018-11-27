<template>
  <div>
    <v-icon
      v-for="(_, index) in Array(count).fill('#000000')"
      :key="index"
      :color="getColor(index)"
      :style="selectedColor === index ? 'border: 1px solid white; border-radius: 20px' : ''"
      @click="onColorClick(index)"
    >
      lens
    </v-icon>
    <slider-picker v-if="selectedColor !== null" @input="colorUpdated" :value="getColor"></slider-picker>
    <v-icon @click="resetColor" v-if="selectedColor !== null" color="red">clear</v-icon>
  </div>
</template>

<script>
import { Slider } from 'vue-color';

export default {
  props: {
    value: Array,
    count: Number,
  },
  components: {
    SliderPicker: Slider,
  },
  data: () => ({
    selectedColor: null,
  }),
  methods: {
    colorUpdated(newColor) {
      const newValue = [...this.value];
      newValue[this.selectedColor] = newColor.hex;
      this.$emit('input', newValue);
    },
    onColorClick(index) {
      if (this.selectedColor === index) {
        this.selectedColor = null;
      } else {
        this.selectedColor = index;
      }
    },
    resetColor() {
      const newValue = [...this.value];
      newValue[this.selectedColor] = '#000000';
      this.$emit('input', newValue);
      this.selectedColor = null;
    },
    getColor(index = this.selectedColor) {
      const result = this.value[index];
      return result || '#000000';
    },
  },
};
</script>
