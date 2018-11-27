<template>
  <v-dialog v-model="show" :width="width">
    <v-card class="card">
      <v-container fluid grid-list-xl>
        <v-slider
          v-if="selects.mode !== 'Off'"
          v-model="selects.brightness"
          label="Brightness"
          step="10"
          thumb-label="always"
        ></v-slider>
        <v-layout wrap class="mt-0 pt-0">
          <v-flex xs4 md2>
            <v-radio-group class="mt-0 " v-model="selects.mode">
              <v-radio
                v-for="option in options"
                :key="option"
                :label="option"
                :value="option"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs5 md3 v-if="selects.mode === 'Palette'">
            <v-select label="Palette" v-model="selects.palette" :items="palettes"/>
          </v-flex>
          <v-flex xs3 md2 v-if="selects.mode === 'Palette'">
            <v-select label="Speed" v-model="selects.speed" :items="speeds" item-text="label" item-value="value"/>
          </v-flex>
          <v-flex xs3 md2 v-if="selects.mode === 'Palette' && selects.palette === 'Custom'">
            <v-select label="Palette Size" v-model="selects.customPaletteSize" :items="paletteSizes"/>
          </v-flex>
          <v-flex xs12 v-if="selects.mode === 'Palette' && selects.palette === 'Custom'">
            <custom-palette v-model="selects.customPaletteColors" :count="selects.customPaletteSize"/>
          </v-flex>
        </v-layout>
      </v-container>
      <div class="px-4 pb-4" v-if="selects.mode === 'Canvas'" >
        <my-canvas :width="width - 48"/>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import MyCanvas from './Canvas.vue';
import CustomPalette from './CustomPalette.vue';

export default {
  components: {
    MyCanvas,
    CustomPalette,
  },
  props: {
    value: Boolean,
    disableAnimations: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: false,
    width: 1000,
    selects: {
      mode: 'Off',
      brightness: 100,
      palette: 'Rainbow',
      speed: 30,
      customPaletteSize: 8,
      customPaletteColors: [],
    },
    options: ['Off', 'Palette', 'Canvas'],
    speeds: [{ value: 100, label: 'x3' }, { value: 60, label: 'x2' }, { value: 30, label: 'x1' }, { value: 15, label: 'x0.5' }, { value: 7, label: 'x0.1' }],
    palettes: ['Rainbow', 'Red', 'Green', 'Blue', 'Custom'],
    paletteSizes: [4, 8, 16],
  }),
  watch: {
    show(newV) {
      this.$emit('input', newV);
    },
    value(newV) {
      this.show = newV;
      if (newV) {
        document.body.parentElement.className = 'hide-overflow';
      } else {
        document.body.parentElement.className = '';
      }
    },
    selects: {
      handler: 'sendValues',
      deep: true,
    },
  },
  methods: {
    sendValues() {
      axios.post('https://home-control2.azurewebsites.net/api', {
        controller: 'lightsStrip/update',
        data: this.selects,
      });
    },
  },
};
</script>

<style scoped>
.card {
    overflow: hidden;
}
</style>