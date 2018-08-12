<template>
  <v-app :dark="isDark === 'true'">
    <v-toolbar>
      <v-toolbar-title>Home Control</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :icon="true" @click="switchDark">
        <v-icon color="secondary">format_paint</v-icon>
      </v-btn>
      <v-btn :icon="true" @click="refresh">
        <v-icon color="secondary">refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <Main ref="main"></Main>
    </v-content>
  </v-app>
</template>

<script>
import Main from './components/Main.vue';

export default {
  name: 'App',
  components: {
    Main,
  },
  data: () => ({
    isDark: localStorage.getItem('isDark') || 'true',
  }),
  methods: {
    switchDark() {
      this.isDark = this.isDark === 'true' ? 'false' : 'true';
      localStorage.setItem('isDark', this.isDark);
    },
    refresh() {
      this.$refs.main.refresh();
    },
  },
};
</script>
