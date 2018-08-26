<template>
  <div>
    <div class="clock">{{ time }}</div>
    <div class="date">Monday | Liepos 30, 2018</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    time: '--:--',
  }),
  props: {
    data: Object,
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const time = new Date();
      this.time = `${time.getHours()}:${time.getMinutes()}`;
    },
  },
};
</script>

<style scoped>
.clock {
  font-size: 8em;
}

.date {
  font-size: 1.8em;
  margin-top: -40px;
  text-align: center;
}
</style>
