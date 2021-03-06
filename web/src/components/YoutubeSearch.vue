<template>
  <v-card max-height="370px" style="overflow-y: auto;">
    <v-layout hidden-md-and-down>
      <v-subheader>Youtube</v-subheader>
    </v-layout>
    <span class="grey--text">
      <v-layout>
        <v-flex xs8 md6>
          <v-text-field v-model="searchQueryString" class="ml-3" label="Youtube Search" @keyup.enter.native="search"/>
        </v-flex>
        <v-flex>
          <v-btn
            :ripple="!disableAnimations"
            :loading="searching"
            color="primary"
            fab
            small
            @click="search">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn
            :ripple="!disableAnimations"
            color="red"
            fab
            small
            @click="stopPlaying">
            <v-icon>stop</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </span>

    <v-list two-line>
      <template v-for="result in searchResults">
        <v-list-tile
          :ripple="!disableAnimations"
          :key="result.id"
          avatar
          @click="play(result)"
        >
          <v-list-tile-avatar :class="{ 'selected-video': currentlyPlaying && currentlyPlaying.id === result.id }">
            <v-progress-circular
              v-if="startingVideoId === result.id"
              indeterminate
              color="primary"
            />
            <img v-else :src="result.thumbnail">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="result.title"/>
            <v-list-tile-sub-title v-html="result.description"/>
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
    ...mapState('youtube', ['searching', 'searchQuery', 'searchResults', 'startingVideoId', 'currentlyPlaying']),
    ...mapState(['disableAnimations']),
    searchQueryString: {
      get: function () { return this.searchQuery; }, // eslint-disable-line object-shorthand
      set: function (value) { // eslint-disable-line object-shorthand
        this.updateSearch(value);
      },
    },
  },
  methods: {
    ...mapActions('youtube', ['search', 'play', 'stopPlaying']),
    ...mapMutations('youtube', ['updateSearch']),
  },
};
</script>

<style scoped>
  .selected-video >>> img {
    border: 1px #00bcd4 solid;
  }
</style>
