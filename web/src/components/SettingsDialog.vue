<template>
  <v-dialog v-model="show" max-width="600">
    <v-card>
      <v-card-title
        primary-title
      >
        Settings
      </v-card-title>
      <v-list>
        <v-list-tile @click.stop="switchDark">
          <v-list-tile-action>
            <v-checkbox :ripple="!settings.disableAnimations" v-model="settings.isDark" @click.stop="switchDark"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Dark</v-list-tile-title>
            <v-list-tile-sub-title>Use Dark theme</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="switchAnimations">
          <v-list-tile-action>
            <v-checkbox :ripple="!settings.disableAnimations" v-model="settings.disableAnimations" @click.stop="switchAnimations"></v-checkbox>
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
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    show: false,
    settings: {
      isDark: true,
      disableAnimations: false,
    },
  }),
  beforeMount() {
    const isDark = localStorage.getItem('isDark');
    if (isDark === undefined) {
      this.settings.isDark = true;
    } else {
      this.settings.isDark = isDark === 'true';
    }

    const disableAnimations = localStorage.getItem('disableAnimations');
    if (disableAnimations === undefined) {
      this.settings.disableAnimations = false;
    } else {
      this.settings.disableAnimations = disableAnimations === 'true';
    }

    this.$emit('settings', this.settings);
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
    switchDark() {
      this.settings.isDark = !this.settings.isDark;
      localStorage.setItem('isDark', this.settings.isDark);
      this.$emit('settings', this.settings);
    },
    switchAnimations() {
      this.settings.disableAnimations = !this.settings.disableAnimations;
      localStorage.setItem('disableAnimations', this.settings.disableAnimations);
      this.$emit('settings', this.settings);
    },
  },
};
</script>
