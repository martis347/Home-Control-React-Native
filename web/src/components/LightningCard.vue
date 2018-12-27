<template>
  <v-card>
    <v-layout row>
      <div>
        <v-layout>
          <v-subheader>Ceiling</v-subheader>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn
              small
              :outline="!ceilingOn"
              :loading="loadingCeiling"
              color="primary"
              :ripple="!disableAnimations"
              @click="switchCeiling">
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
            <v-btn
              small
              :outline="!wallOn"
              :loading="loadingWall"
              color="primary"
              :ripple="!disableAnimations"
              @click="switchWall">
              <v-icon>flash_on</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  mounted() {
    this.refreshStatus();
  },
  methods: {
    ...mapActions('lightning', ['switchWall', 'switchCeiling', 'refreshStatus']),
  },
  computed: {
    ...mapState(['disableAnimations']),
    ...mapState('lightning', ['ceilingOn', 'loadingCeiling', 'wallOn', 'loadingWall']),
  },
};
</script>
