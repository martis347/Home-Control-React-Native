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
            <v-checkbox v-model="settings.isDark" @click.stop="switchDark"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Dark</v-list-tile-title>
            <v-list-tile-sub-title>Use Dark theme</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="switchServer">
          <v-list-tile-action>
            <v-checkbox v-model="settings.useLocalServer" @click.stop="switchServer"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Local Server</v-list-tile-title>
            <v-list-tile-sub-title>Use Local server instead of remote</v-list-tile-sub-title>
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

    window.settings = this.settings;
    window.urlToUse = this.settings.useLocalServer ? 'http://192.168.31.246:3001' : 'https://home-control2.azurewebsites.net/api';
  },
  methods: {
    switchDark() {
      this.settings.isDark = !this.settings.isDark;
      localStorage.setItem('isDark', this.settings.isDark);
    },
    switchServer() {
      this.settings.useLocalServer = !this.settings.useLocalServer;
      localStorage.setItem('useLocalServer', this.settings.useLocalServer);
    },
    refresh() {
      this.$refs.main.refresh();
    },
  },
};
</script>
