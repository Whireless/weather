<script>
import preloader from './components/preloader.vue';
import formWeather from './components/formWeather.vue';
export default {
  data() {
    return {}
  },
  components: {
    preloader,
    formWeather,
  },
}
</script>

<template>
  <main class="main-content">
    <preloader></preloader>
    <h3 class="weather__intro">Введи город или населённый пункт:</h3>
    <section class="weather">
      <form-weather></form-weather>
      <footer class="main-footer">
        <p class="main-footer__dev">Разработано: <a href="https://github.com/Whireless">Whireless</a></p>
        <p class="main-footer__version">Версия: 1.0.4</p>
      </footer>
    </section>
  </main>
</template>
