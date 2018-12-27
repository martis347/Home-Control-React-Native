<template>
  <v-card max-height="370px" style="overflow-y: auto;">
    <v-layout hidden-md-and-down>
      <v-subheader>Youtube</v-subheader>
    </v-layout>
    <span class="grey--text">
      <v-layout>
        <v-flex xs8 md6>
          <v-text-field v-model="searchQueryString" class="ml-3" @keyup.enter.native="startSearch" label="Youtube Search"/>
        </v-flex>
        <v-flex>
          <v-btn
            :ripple="!disableAnimations"
            color="primary"
            fab
            small
            :loading="searching"
            @click="startSearch">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn
            :ripple="!disableAnimations"
            color="red"
            fab
            small
            @click="stopVideo">
            <v-icon>stop</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </span>

    <v-list two-line>
      <template v-for="result in results">
        <v-list-tile
          :ripple="!disableAnimations"
          :key="result.id"
          avatar
          @click="playVideo(result.id)"
        >
          <v-list-tile-avatar :class="{ 'selected-video': playedVideoId === result.id }">
            <v-progress-circular
              v-if="playedVideoId === result.id && loadingVideo"
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
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('youtube', ['searching', 'searchQuery', 'results', 'playedVideoId', 'loadingVideo']),
    ...mapState(['disableAnimations']),
    searchQueryString: {
      get: function () { return this.searchQuery; }, // eslint-disable-line object-shorthand
      set: function (value) { // eslint-disable-line object-shorthand
        this.updateSearch(value);
      },
    },
  },
  methods: {
    ...mapActions('youtube', ['startSearch', 'playVideo', 'stopVideo']),
    ...mapMutations('youtube', ['updateSearch']),
  },
};
</script>

<style scoped>
  .selected-video >>> img {
    border: 1px #00bcd4 solid;
  }
</style>
