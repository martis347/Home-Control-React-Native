<template>
  <v-dialog v-model="show" :width="width">
    <v-card class="card">
      <v-layout v-if="loading">
        <v-progress-circular
style="margin: auto;"
class="my-5"
:size="80"
color="primary"
indeterminate/>
      </v-layout>
      <template v-else>
        <v-container fluid grid-list-xl>
          <v-slider
            v-if="selects.mode !== 'Off'"
            v-model="selects.brightness"
            label="Brightness"
            step="20"
            max="255"
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
              <v-select
                label="Speed"
                v-model="selects.speed"
                :items="speeds"
                item-text="label"
                item-value="value"/>
            </v-flex>
            <v-flex xs3 md2 v-if="selects.mode === 'Palette' && selects.palette === 'Custom'">
              <v-select label="Palette Size" v-model="selects.customPaletteSize" :items="paletteSizes"/>
            </v-flex>
            <v-flex xs12 v-if="selects.mode === 'Palette' && selects.palette === 'Custom'">
              <custom-palette v-model="selects.customPaletteColors" :count="+selects.customPaletteSize"/>
            </v-flex>
          </v-layout>
        </v-container>
        <div class="px-4 pb-4" v-if="selects.mode === 'Canvas'" >
          <my-canvas :width="width - 48"/>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
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
    ...mapState(['disableAnimations']),
  },
  data: () => ({
    debounceTimeout: null,
    show: false,
    loading: false,
    width: 1000,
    selects: {
      mode: 'Off',
      brightness: '255',
      palette: 'Rainbow',
      speed: '30',
      customPaletteSize: '8',
      customPaletteColors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
    },
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
    selects: {
      handler: 'sendValues',
      deep: true,
    },
    'selects.customPaletteSize': function (newV, oldV) { // eslint-disable-line
      if (+newV > oldV) {
        while (this.selects.customPaletteColors.length !== +newV) {
          this.selects.customPaletteColors.push('#000000');
        }
      } else {
        this.selects.customPaletteColors = this.selects.customPaletteColors.filter((_, index) => index < +newV);
      }
    },
  },
  methods: {
    sendValues() {
      const data = {
        ...this.selects,
      };
      data.customPaletteColors = data.customPaletteColors.map(c => parseInt(c.replace('#', ''), 16));
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        axios.post('https://home-control2.azurewebsites.net/api', {
          controller: 'lightsStrip/update',
          data,
        });
      }, 300);
    },
    async getStatus() {
      try {
        this.loading = true;
        const { data } = await axios.post('https://home-control2.azurewebsites.net/api/lightsStrip/status');
        data.customPaletteColors = data.customPaletteColors.map(c => `#${(`000000${(+c).toString(16)}`).substr(-6)}`);
        this.selects = data;
        this.loading = false;
      } catch (error) {
        console.error(error);
        setTimeout(() => this.getStatus(), 500);
      }
    },
  },
};
</script>

<style scoped>
.card {
    overflow: hidden;
}
</style>
