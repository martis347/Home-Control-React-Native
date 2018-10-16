<script>
import { Bar } from 'vue-chartjs';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

export default {
  name: 'ChartInternal',
  extends: Bar,
  components: {
    ChartJsPluginDataLabels,
  },
  props: {
    data: {
      type: Array,
    },
    disableAnimations: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.data.map(d => d.hour),
        datasets: [
          {
            label: 'Weather',
            yAxisID: 'Weather',
            borderColor: '#66949c',
            pointRadius: 0,
            fill: false,
            borderWidth: 3,
            data: this.data.map(d => d.temperature),
            type: 'line',
            datalabels: {
              align: 'top',
              color: '#FFFFFF',
            },
            ticks: {
              beginAtZero: false,
              max: 20,
            },
          },
          {
            label: 'Rain',
            yAxisID: 'Rain',
            backgroundColor: '#256772',
            pointRadius: 0,
            fill: true,
            borderWidth: 3,
            data: this.data.map(d => d.rainProbability),
            datalabels: {
              display: false,
            },
          },
        ],
      },
      {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        animation: this.disableAnimations ? false : undefined,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'Rain',
            display: true,
            ticks: {
              beginAtZero: true,
              max: 100,
            },
          }, {
            id: 'Weather',
            display: false,
            ticks: {
              beginAtZero: false,
              max: Math.max(...this.data.map(d => d.temperature)),
              min: Math.min(...this.data.map(d => d.temperature)),
            },
          }],
        },
        layout: {
          padding: {
            top: 60,
          },
        },
      },
    );
  },
};
</script>
