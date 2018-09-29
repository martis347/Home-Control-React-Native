<template>
  <v-card>
    <v-card-text>
      <div class="font-weight-regular" style="font-size: 180px; line-height: 1;">
        {{ time }}
      </div>
      <div class="display-1">
        {{ date }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    time: '--:--',
    date: '',
  }),
  mounted() {
    this.updateTimeAndDate();
    setInterval(this.updateTimeAndDate, 1000);
  },
  methods: {
    updateTimeAndDate() {
      this.time = moment().format('HH:mm');

      let dateSting = `${this.firstLetterToUppercase(moment().locale('lt').format('dddd |'))} ${this.firstLetterToUppercase(moment().locale('lt').format('MMMM D, YYYY'))}`;
      dateSting = dateSting.charAt(0).toUpperCase() + dateSting.slice(1);
      this.date = dateSting;
    },
    firstLetterToUppercase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>
