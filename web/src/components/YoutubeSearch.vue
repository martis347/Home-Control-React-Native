<template>
  <v-card class="mt-3" max-height="70vh" style="overflow-y: auto;">
    <v-layout hidden-md-and-down>
      <v-subheader>Youtube</v-subheader>
    </v-layout>
    <span class="grey--text">
      <v-layout>
        <v-flex xs8 md6>
          <v-text-field v-model="searchQuery" class="ml-3" @keyup.enter.native="search" label="Youtube Search"/>
        </v-flex>
        <v-flex>
          <v-btn color="primary" fab small :loading="loading" @click="search">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn color="red" fab small @click="stop">
            <v-icon>stop</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </span>

    <v-list two-line>
      <template v-for="result in searchResults">
        <v-list-tile
          :key="result.id"
          avatar
          @click="play(result.id)"
        >
          <v-list-tile-avatar>
            <v-progress-circular
              v-if="loadingId === result.id"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <img v-else :src="result.thumbnail">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="result.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="result.description"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="`divider-${result.id}`"/>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    searchQuery: '',
    loading: false,
    searchResults: [],
    loadingId: null,
  }),
  methods: {
    async search() {
      this.loading = true;
      const { data } = await axios.get(`https://content.googleapis.com/youtube/v3/search?maxResults=10&type=video&q=${this.searchQuery}&part=snippet&key=AIzaSyDfLd9pl_DpU84NvwXznFkmUsjM9kiiAiI`);
      this.searchResults = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
      this.loading = false;
    },
    play(id) {
      if (this.loadingId) {
        return;
      }

      if (window.settings.useLocalServer) {
        axios.get(`http://192.168.31.246:3001/youtube/start/${id}`);
      } else {
        axios.post(`https://home-control2.azurewebsites.net/api/youtube/start/${id}`);
      }

      this.loadingId = id;
      setTimeout(() => {
        this.loadingId = null;
      }, 5000);
    },
    stop() {
      if (window.settings.useLocalServer) {
        axios.get('http://192.168.31.246:3001/youtube/stop');
      } else {
        axios.post('https://home-control2.azurewebsites.net/api/youtube/stop');
      }
      this.searchResults = [];
      this.searchQuery = '';
    },
  },
};
</script>
