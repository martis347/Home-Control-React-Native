<template>
  <v-card>
    <v-layout row>
      <div>
        <v-layout>
          <v-subheader>Ceiling</v-subheader>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn small :outline="!ceilingOn" :loading="loadingCeiling" color="primary" :ripple="!disableAnimations" @click="switchCeiling">
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
            <v-btn small :outline="!wallOn" :loading="loadingWall" color="primary" :ripple="!disableAnimations" @click="switchWall">
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
    ceilingOn: false,
    wallOn: false,
    loadingCeiling: false,
    loadingWall: false,
  }),
  beforeMount() {
    this.getStatuses();
  },
  methods: {
    async switchCeiling() {
      this.loadingCeiling = true;
      await this.makeCall(`lightning/ceiling/${!this.ceilingOn}`);
      this.ceilingOn = !this.ceilingOn;
      this.loadingCeiling = false;
    },
    async switchWall() {
      this.loadingWall = true;
      this.makeCall(`lightning/wall/${!this.wallOn}`);
      this.wallOn = !this.wallOn;
      this.loadingWall = false;
    },
    async getStatuses() {
      this.loadingCeiling = true;
      this.loadingWall = true;
      const result = await this.makeCall('lightning/statuses');
      this.loadingWall = false;
      this.loadingCeiling = false;
      this.ceilingOn = result.ceilingOn;
      this.wallOn = result.wallOn;
    },
    async makeCall(data) {
      const response = await axios.post(`https://home-control2.azurewebsites.net/api/${data}`);
      return response.data;
    },
  },
};
</script>
