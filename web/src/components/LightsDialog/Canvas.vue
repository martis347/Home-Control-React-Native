<template>
  <div>
    <v-layout>
      <v-flex xs3 md2 class="mr-4">
        <v-text-field
          type="number"
          v-model="colorSensitivity"
          min="0"
          max="10"
          label="Color Sensitivity"/>
      </v-flex>
      <v-flex xs3 md2>
        <v-text-field
          type="number"
          v-model="ledFadeTime"
          min="0"
          max="10"
          step="0.2"
          label="Led fade duration"/>
      </v-flex>
    </v-layout>
    <canvas
      ref="myCanvas"
      height="200px"
      :width="width"
      :style="{ 'background-color': 'black', 'border-top': wsOpen? '1px solid #4CAF50' : '1px solid #F44336', margin: 'auto' }"
      @touchmove="onTouchMove"
      @touchstart="onTouchStart"
      @touchend="stopDrawing"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="stopDrawing"
    />
  </div>
</template>

<script>
import WebSocket from 'reconnecting-websocket';
import Color from 'color';

class LedLight {
  constructor(x = 0, y = 0, colorSensitivity = 0, ledFadeTime = 2) {
    this.x = x;
    this.y = y;
    this.minHue = 0;
    this.maxHue = 25.5 * colorSensitivity;
    this.ledFadeTime = ledFadeTime * 1000;
    if (y === 0) {
      this.startTime = 0;
    } else {
      this.startTime = LedLight.currentTime;
    }
  }

  static get currentTime() {
    return (new Date()).getTime();
  }

  get hue() {
    const hue = (this.y / 200) * this.maxHue;

    if (hue > this.maxHue) {
      return this.maxHue;
    }

    return hue;
  }

  get brightness() {
    const diff = LedLight.currentTime - this.startTime;
    if (diff > this.ledFadeTime) {
      return 0;
    }
    const result = Math.floor(255 - (diff / this.ledFadeTime) * 255);
    if (result > 255) {
      return 255;
    }
    if (result < 0) {
      return 0;
    }
    return result;
  }
}

const bitsCount = 50;
export default {
  props: {
    width: Number,
  },
  data: () => ({
    colorSensitivity: 5,
    ledFadeTime: 2,
    show: false,
    wsOpen: false,
    ws: null,
    lights: (new Array(bitsCount)).fill(new LedLight()),
    isDrawing: false,
    ctx: null,
    wsInterval: null,
    redrawInterval: null,
    sentValue: null,
  }),
  methods: {
    onMouseDown() {
      this.isDrawing = true;
    },
    onTouchStart() {
      this.isDrawing = true;
    },
    onMouseMove(e) {
      if (!this.isDrawing) {
        return;
      }
      this.updateLights(e.offsetX, e.offsetY);
      this.redraw();
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    onTouchMove(e) {
      if (!this.isDrawing) {
        return;
      }
      const leftOffset = document.getElementsByClassName('card')[0].offsetLeft + this.$refs.myCanvas.offsetLeft;
      const topOffset = document.getElementsByClassName('card')[0].offsetTop + this.$refs.myCanvas.offsetTop;

      for (let i = 0; i < e.touches.length; i++) { // eslint-disable-line no-plusplus
        this.updateLights(e.touches.item(i).clientX - leftOffset, e.touches.item(i).clientY - topOffset);
      }
      this.redraw();
      this.sendWs();
    },
    updateLights(x, y) {
      const ledIndex = Math.floor((x / this.width) * bitsCount);
      this.lights[ledIndex] = new LedLight(x, y, this.colorSensitivity, this.ledFadeTime);
    },
    redraw() {
      if (!this.wsOpen) {
        return;
      }
      this.ctx.clearRect(0, 0, this.$refs.myCanvas.width, this.$refs.myCanvas.height);
      this.lights.forEach((l) => {
        this.ctx.fillStyle = Color(`hsl(${(l.hue / 255) * 360}, 100%, ${l.brightness / 4}%)`).hex();
        this.ctx.fillRect(l.x, l.y, 15, 15);
      });
    },
    sendWs() {
      const value = [...this.lights].reverse().map(l => `${l.hue}:${l.brightness}&`).join('').slice(0, -1);
      if (value !== this.sentValue) {
        this.ws.send(value);
        this.sentValue = value;
      }
    },
  },
  mounted() {
    const canvas = this.$refs.myCanvas;
    this.ctx = canvas.getContext('2d');

    this.ws = new WebSocket('ws://192.168.31.242:81');
    this.ws.onopen = () => {
      console.log('Open');
      this.wsOpen = true;
    };
    this.ws.onclose = () => {
      console.log('Close');
      this.wsOpen = false;
    };
    this.wsInterval = setInterval(() => {
      if (this.wsOpen) {
        this.sendWs();
      }
    }, 70);
    this.redrawInterval = setInterval(() => {
      this.redraw();
    }, 200);
  },
  beforeDestroy() {
    this.ws.close();
    clearInterval(this.wsInterval);
    clearInterval(this.redrawInterval);
    this.wsOpen = false;
  },
};
</script>

<style scoped>
.card {
    overflow: hidden;
}
</style>
