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
              :outline="!ceilingOn"
              :loading="loadingCeiling"
              :ripple="!disableAnimations"
              small
              color="primary"
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
              :outline="!wallOn"
              :loading="loadingWall"
              :ripple="!disableAnimations"
              small
              color="primary"
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
  computed: {
    ...mapState(['disableAnimations']),
    ...mapState('lightning', ['ceilingOn', 'loadingCeiling', 'wallOn', 'loadingWall']),
  },
  mounted() {
    this.refreshStatus();
  },
  methods: {
    ...mapActions('lightning', ['switchWall', 'switchCeiling', 'refreshStatus']),
  },
};
</script>
