<template>
  <v-dialog max-width="600">
    <v-btn
      color="primary"
      slot="activator"
      dark
      fab
      fixed
      bottom
      right
    >
      <v-icon>settings</v-icon>
    </v-btn>
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
        <v-list-tile @click.stop="switchServer">
          <v-list-tile-action>
            <v-checkbox :ripple="!settings.disableAnimations" v-model="settings.useLocalServer" @click.stop="switchServer"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Local Server</v-list-tile-title>
            <v-list-tile-sub-title>Use Local server instead of remote</v-list-tile-sub-title>
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
  data: () => ({
    settings: {
      isDark: true,
      useLocalServer: false,
      disableAnimations: false,
      urlToUse: 'https://home-control2.azurewebsites.net/api',
    },
  }),
  beforeMount() {
    const isDark = localStorage.getItem('isDark');
    if (isDark === undefined) {
      this.settings.isDark = true;
    } else {
      this.settings.isDark = isDark === 'true';
    }

    const useLocalServer = localStorage.getItem('useLocalServer');
    if (useLocalServer === undefined) {
      this.settings.useLocalServer = true;
    } else {
      this.settings.useLocalServer = useLocalServer === 'true';
    }

    const disableAnimations = localStorage.getItem('disableAnimations');
    if (disableAnimations === undefined) {
      this.settings.disableAnimations = false;
    } else {
      this.settings.disableAnimations = disableAnimations === 'true';
    }

    this.settings.urlToUse = this.settings.useLocalServer ? 'http://192.168.31.246:3001' : 'https://home-control2.azurewebsites.net/api';
    this.$emit('settings', this.settings);
  },
  methods: {
    switchDark() {
      this.settings.isDark = !this.settings.isDark;
      localStorage.setItem('isDark', this.settings.isDark);
      this.$emit('settings', this.settings);
    },
    switchServer() {
      this.settings.useLocalServer = !this.settings.useLocalServer;
      localStorage.setItem('useLocalServer', this.settings.useLocalServer);
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
