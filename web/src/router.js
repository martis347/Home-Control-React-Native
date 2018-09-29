import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import YoutubePlayer from './views/YoutubePlayer.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
    },
    {
      path: '/player/:videoId?',
      name: 'Player',
      component: YoutubePlayer,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
