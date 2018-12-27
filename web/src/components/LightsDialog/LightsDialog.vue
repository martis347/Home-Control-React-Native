<template>
  <v-dialog v-model="show" :width="width">
    <v-card class="card">
      <v-layout v-if="loading">
        <v-progress-circular
          style="margin: auto;"
          class="my-5"
          :size="80"
          color="primary"
          indeterminate
        />
      </v-layout>
      <template v-else>
        <v-container fluid grid-list-xl>
          <v-slider
            v-if="lightsState.mode !== 'Off'"
            :value="lightsState.brightness"
            @input="updateBrightness"
            label="Brightness"
            step="20"
            max="255"
            thumb-label="always"
          ></v-slider>
          <v-layout wrap class="mt-0 pt-0">
            <v-flex xs4 md2>
              <v-radio-group class="mt-0" :value="lightsState.mode" @change="updateMode">
                <v-radio
                  v-for="option in options"
                  :key="option"
                  :label="option"
                  :value="option"
                ></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs5 md3 v-if="lightsState.mode === 'Palette'">
              <v-select label="Palette" :value="lightsState.palette" @input="updatePalette" :items="palettes"/>
            </v-flex>
            <v-flex xs3 md2 v-if="lightsState.mode === 'Palette'">
              <v-select
                label="Speed"
                :value="lightsState.speed"
                @input="updateSpeed"
                :items="speeds"
                item-text="label"
                item-value="value"/>
            </v-flex>
            <v-flex xs3 md2 v-if="lightsState.mode === 'Palette' && lightsState.palette === 'Custom'">
              <v-select label="Palette Size" :value="lightsState.customPaletteSize" @input="updateCustomPaletteSize" :items="paletteSizes"/>
            </v-flex>
            <v-flex xs12 v-if="lightsState.mode === 'Palette' && lightsState.palette === 'Custom'">
              <custom-palette :value="lightsState.customPaletteColors" @input="updateCustomPaletteColors" :count="+lightsState.customPaletteSize"/>
            </v-flex>
          </v-layout>
        </v-container>
        <div class="px-4 pb-4" v-if="lightsState.mode === 'Canvas'" >
          <my-canvas :width="width - 48"/>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MyCanvas from './Canvas.vue';
import CustomPalette from './CustomPalette.vue';

export default {
  components: {
    MyCanvas,
    CustomPalette,
  },
  props: {
    value: Boolean,
  },
  computed: {
    ...mapState('lightsStrip', ['lightsState', 'loading']),
    ...mapState(['disableAnimations']),
  },
  data: () => ({
    show: false,
    width: 1000,
    options: ['Off', 'Palette', 'Canvas'],
    speeds: [{ value: '100', label: 'x3' }, { value: '60', label: 'x2' }, { value: '30', label: 'x1' }, { value: '15', label: 'x0.5' }, { value: '10', label: 'x0.3' }, { value: '4', label: 'x0.1' }],
    palettes: ['Christmas', 'Christmas2', 'Rainbow', 'Red', 'Green', 'Blue', 'Strobe', 'Custom'],
    paletteSizes: ['4', '8', '16'],
  }),
  watch: {
    show(newV) {
      this.$emit('input', newV);
    },
    value(newV) {
      this.show = newV;
      this.getStatus();
      if (this.show) {
        document.body.parentElement.className = 'hide-overflow';
      } else {
        document.body.parentElement.className = '';
      }
    },
  },
  methods: {
    ...mapActions('lightsStrip', ['updateState', 'getStatus']),
    updateBrightness(newValue) {
      this.updateState({ brightness: newValue });
    },
    updateMode(newValue) {
      this.updateState({ mode: newValue });
    },
    updatePalette(newValue) {
      this.updateState({ palette: newValue });
    },
    updateSpeed(newValue) {
      this.updateState({ speed: newValue });
    },
    updateCustomPaletteSize(newValue) {
      this.updateState({ customPaletteSize: newValue });
    },
    updateCustomPaletteColors(newValue) {
      this.updateState({ customPaletteColors: newValue });
    },
  },
};
</script>

<style scoped>
.card {
    overflow: hidden;
}
</style>
