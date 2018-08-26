<template>
  <div class="frame">
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
.frame {
  margin: 0;
}
.clock {
  font-size: 15vw;
  margin-top: -4vh;
}
.date {
  font-size: 3.3vw;
  margin-top: -7vh;
  text-align: center;
}
</style>
