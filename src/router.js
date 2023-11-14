import { createRouter, createWebHashHistory } from 'vue-router';
import formWeather from './components/formWeather.vue';
import about from './components/about.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', component: formWeather, alias: '/' },
    { path: '/about', component: about },
  ],
});