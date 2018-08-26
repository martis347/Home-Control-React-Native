import Vue from 'vue';
import Router from 'vue-router';
import Clock from './views/Clock.vue';
import Control from './views/Control.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/control',
    },
    {
      path: '/clock',
      name: 'Clock',
      component: Clock,
    },
    {
      path: '/control',
      name: 'Control',
      component: Control,
    },
  ],
});
