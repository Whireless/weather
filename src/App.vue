<script>
import preloader from './components/preloader.vue';
export default {
  components: {
    preloader,
  },
}
</script>

<template>
  <main class="main-content">
    <preloader></preloader>
    <header class="main-header">
      <router-link to="/home" class="main-header__title"><span class="weather__info">.easy</span>погода</router-link>
      <span class="main-header__subtitle">только погода, ничего лишнего.</span>
    </header>
    <router-view></router-view>
    <footer class="main-footer">
      <router-link to="/about" class="main-footer__link main-footer__link--about">О сайте</router-link>
      <router-link to="/home" class="main-footer__link main-footer__link--home">На главную</router-link>
      <p class="main-footer__version">Версия: 1.0.0</p>
      <a href="https://github.com/Whireless/weather" class="main-footer__link main-footer__link--github">Github</a>
    </footer>
  </main>
</template>
