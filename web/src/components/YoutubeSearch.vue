<template>
  <v-card class="mt-3">
    <v-subheader>Youtube</v-subheader>
    <span class="grey--text">
      <v-layout>
        <v-flex xs10 md4>
          <v-text-field v-model="searchQuery" class="ml-3" @keyup.enter.native="search" label="Youtube Search"/>
        </v-flex>
        <v-flex xs2 class="mt-2">
          <v-btn color="primary" outline :loading="loading" @click="search">Search</v-btn>
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
            <img :src="result.thumbnail">
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
      axios.post(`https://home-control2.azurewebsites.net/api/browser/start/${id}`);
    },
  },
};
</script>
