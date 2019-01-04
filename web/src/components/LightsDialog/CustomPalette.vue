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
    <picker
      v-if="selectedColor !== null"
      :width="100"
      :height="100"
      :value="getColor(selectedColor)"
      @input="colorUpdated"/>
  </div>
</template>

<script>
import ColorPicker from 'vue-color-picker-wheel';

export default {
  components: {
    Picker: ColorPicker,
  },
  props: {
    value: Array,
    count: Number,
  },
  data: () => ({
    selectedColor: null,
  }),
  watch: {
    count(newV) {
      if (this.selectedColor + 1 > +newV) {
        this.selectedColor = null;
      }
    },
  },
  methods: {
    colorUpdated(newColor) {
      let newValue = [...this.value];
      newValue[this.selectedColor] = newColor;
      newValue = newValue.map(v => v || '#000000');
      this.$emit('input', newValue);
    },
    onColorClick(index) {
      if (this.selectedColor === index) {
        this.selectedColor = null;
      } else {
        this.selectedColor = index;
      }
    },
    getColor(index = this.selectedColor) {
      const result = this.value[index];
      return result || '#000000';
    },
  },
};
</script>
