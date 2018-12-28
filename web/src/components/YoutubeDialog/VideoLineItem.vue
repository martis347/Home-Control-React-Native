<template>
  <div>
    <v-list-tile
      :key="videoId"
      avatar
    >
      <v-list-tile-avatar tile>
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <img v-else :src="thumbnail">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="title"></v-list-tile-title>
        <v-list-tile-sub-title v-html="description"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-tooltip top style="width: 36px;" v-if="actions.includes('play')">
        Play Now
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'play') && onPlay()" :loading="loadingPlay">
            <v-icon color="primary">play_arrow</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip top style="width: 36px;" v-if="actions.includes('findRelatedVideos')">
        Find related videos
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'findRelatedVideos')">
            <v-icon color="primary">search</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip top style="width: 36px;" v-if="actions.includes('moveToTopOfTheQueue')">
        Move to the top of the queue
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'moveToTopOfTheQueue')">
            <v-icon color="primary">expand_less</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip top style="width: 36px;" v-if="actions.includes('removeFromQueue')">
        Remove from queue
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'removeFromQueue')">
            <v-icon color="primary">remove</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip top style="width: 36px;" v-if="actions.includes('addToQueue')">
        Add to queue
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'addToQueue')">
            <v-icon color="primary">queue</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
    </v-list-tile>
    <v-divider :key="`divider-${videoId}`"/>
  </div>
</template>

<script>
export default {
  props: {
    videoId: String,
    thumbnail: String,
    title: String,
    description: String,
    loading: Boolean,
    actions: Array,
  },
  data: () => ({
    loadingPlay: false,
  }),
  methods: {
    async onPlay() {
      this.loadingPlay = true;
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.loadingPlay = false;
    },
  },
};
</script>
