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
        />
        <img v-else :src="thumbnail">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="title"/>
        <v-list-tile-sub-title v-html="description"/>
      </v-list-tile-content>
      <v-tooltip v-if="actions.includes('play')" top style="width: 36px;">
        Play Now
        <v-list-tile-action slot="activator">
          <v-btn :loading="loadingPlay" icon @click="$emit('action', 'play') && onPlay()">
            <v-icon color="green">play_arrow</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip v-if="actions.includes('findRelatedVideos')" top style="width: 36px;">
        Find related videos
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'findRelatedVideos')">
            <v-icon color="blue">search</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip v-if="actions.includes('moveToTopOfTheQueue')" top style="width: 36px;">
        Move to the top of the queue
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'moveToTopOfTheQueue')">
            <v-icon color="yellow">expand_less</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip v-if="actions.includes('removeFromQueue')" top style="width: 36px;">
        Remove from queue
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'removeFromQueue')">
            <v-icon color="red">remove</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-tooltip>
      <v-tooltip v-if="actions.includes('addToQueue')" top style="width: 36px;">
        Add to queue
        <v-list-tile-action slot="activator">
          <v-btn icon @click="$emit('action', 'addToQueue')">
            <v-icon color="teal">queue</v-icon>
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
