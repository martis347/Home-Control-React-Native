<template>
  <div class="pb-4">
    <v-subheader><v-icon color="primary" class="mr-1">{{ icon }}</v-icon> {{ title }}</v-subheader>

    <span class="ml-3" style="color: rgba(255,255,255,0.7);" v-if="videos.length === 0">Empty ¯\_(ツ)_/¯</span>
    <v-list v-else two-line :style="{ 'max-height': `${height}px`, 'overflow-y': 'scroll', 'overflow-x': 'hidden' }">
      <video-line-item
        v-for="video in videos"
        :key="video.id"
        :video-id="video.id"
        :title="video.title"
        :description="video.description"
        :thumbnail="video.thumbnail"
        :actions="actions"
        @action="data => $emit('action', { video, data })"
      />
    </v-list>
  </div>
</template>

<script>
import VideoLineItem from './VideoLineItem.vue';

export default {
  components: {
    VideoLineItem,
  },
  props: {
    videos: Array,
    actions: Array,
    title: String,
    icon: String,
    height: {
      type: Number,
      default: 300,
    },
  },
};
</script>
