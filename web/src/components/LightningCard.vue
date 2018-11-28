<template>
  <v-card>
    <v-layout row>
      <div>
        <v-layout>
          <v-subheader>Ceiling</v-subheader>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn small :outline="!ceiling" :loading="loading.includes('ceiling')" color="primary" :ripple="!disableAnimations" @click="switchCeiling">
              <v-icon>flash_on</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
      <div>
        <v-layout>
          <v-subheader>Wall</v-subheader>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn small :outline="!wall" :loading="loading.includes('wall')" color="primary" :ripple="!disableAnimations" @click="switchWall">
              <v-icon>flash_on</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    disableAnimations: Boolean,
  },
  data: () => ({
    ceiling: false,
    wall: false,
    loading: [],
  }),
  beforeMount() {
    this.getStatus('wall');
    this.getStatus('ceiling');
  },
  methods: {
    async switchCeiling() {
      this.loadingCeiling = true;
      await this.makeCall(`lightning/ceiling/${!this.ceiling}`);
      this.ceiling = !this.ceiling;
      this.loadingCeiling = false;
    },
    async switchWall() {
      this.loadingWall = true;
      this.makeCall(`lightning/wall/${!this.wall}`);
      this.wall = !this.wall;
      this.loadingWall = false;
    },
    async getStatus(controller) {
      this.loading.push(controller);
      try {
        const result = await this.makeCall(`lightning/status/${controller}`);
        this[controller] = result;
        this.loading = this.loading.filter(v => v !== controller);
      } catch (error) {
        setTimeout(() => this.getStatus(controller), 1000);
      }
    },
    async makeCall(data) {
      const response = await axios.post(`https://home-control2.azurewebsites.net/api/${data}`);
      return response.data;
    },
  },
};
</script>
