<template>
  <v-dialog v-model="show" max-width="600">
    <v-card>
      <v-card-title
        primary-title
      >
        Settings
      </v-card-title>
      <v-list>
        <v-list-tile @click.stop="updateIsDark">
          <v-list-tile-action>
            <v-checkbox :ripple="!disableAnimations" v-model="isDark" @click.stop="updateIsDark"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Dark</v-list-tile-title>
            <v-list-tile-sub-title>Use Dark theme</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="updateDisableAnimations">
          <v-list-tile-action>
            <v-checkbox :ripple="!disableAnimations" v-model="disableAnimations" @click.stop="updateDisableAnimations"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Disable animations</v-list-tile-title>
            <v-list-tile-sub-title>Disable animations to boost performance</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapState(['disableAnimations', 'isDark']),
  },
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
  },
  methods: {
    ...mapActions(['updateDisableAnimations', 'updateIsDark']),
  },
};
</script>
