import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;

let password;
if (window.location.pathname.startsWith('/player')) {
  password = 'martis347';
} else {
  password = localStorage.getItem('password') || prompt('Enter Password'); // eslint-disable-line
}

if (password === 'martis347') {
  localStorage.setItem('password', 'martis347');
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
}
