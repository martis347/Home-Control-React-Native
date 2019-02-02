<template>
  <v-dialog v-model="show" height="800px">
    <v-card>
      <div class="pt-3">
        <v-layout>
          <v-flex xs6>
            <v-text-field v-model="searchQueryString" class="ml-3" label="Search" @keyup.enter.native="search"/>
          </v-flex>
          <v-flex>
            <v-btn
              :loading="searching"
              color="primary"
              fab
              small
              @click="search">
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn
              color="red"
              fab
              small
              @click="stopPlaying">
              <v-icon>stop</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              fab
              small
              @click="playNext"
            >
              <v-icon>skip_next</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <template v-if="currentlyPlaying">
          <div class="pl-3 pb-3"><span style="color: rgba(255,255,255,0.7);">Currently Playing: </span>{{ currentlyPlaying.title }}</div>
        </template>
      </div>
      <v-divider/>
      <v-layout wrap>
        <v-flex xs12 lg6>
          <videos-list
            :videos="searchResults"
            :actions="['play', 'findRelatedVideos', 'addToQueue']"
            title="Search Results"
            icon="search"
            show-clear
            @action="data => onAction(data)"
            @clear="clearSearchResults"
          />
        </v-flex>
        <v-flex xs12 lg6>
          <videos-list
            :height="200"
            :videos="playQueue"
            :actions="['play', 'findRelatedVideos', 'removeFromQueue', 'moveToTopOfTheQueue']"
            title="Play Queue"
            icon="queue_music"
            @action="data => onAction(data)"
          />
          <videos-list
            :height="200"
            :videos="playHistory"
            :actions="['play', 'findRelatedVideos', 'addToQueue']"
            title="Play History"
            icon="history"
            @action="data => onAction(data)"
          />
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import VideosList from './VideosList.vue';

export default {
  components: {
    VideosList,
  },
  props: {
    value: Boolean,
  },
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapState('youtube', ['searchQuery', 'syncing', 'searchResults', 'playQueue', 'playHistory', 'currentlyPlaying', 'searching']),
    searchQueryString: {
      get: function () { return this.searchQuery; }, // eslint-disable-line object-shorthand
      set: function (value) { // eslint-disable-line object-shorthand
        this.updateSearch(value);
      },
    },
    smallView() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  watch: {
    show(newV) {
      this.$emit('input', newV);
    },
    value(newV) {
      this.show = newV;
      if (newV) {
        this.syncState({ readOnly: true });
      }
    },
  },
  methods: {
    ...mapActions('youtube', ['search', 'findRelatedVideos', 'play', 'stopPlaying', 'playNext', 'syncState', 'addToQueue', 'removeFromQueue', 'moveToTopOfTheQueue', 'clearSearchResults']),
    ...mapMutations('youtube', ['updateSearch']),
    onAction({ data, video }) {
      this[data](video);
    },
  },
};
</script>
