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
    <h1 class="main-content__title">.easyпогода <br>
      <sup class="main-content__subtitle">только погода, ничего лишнего.</sup>
    </h1>
    <section class="weather">
      <form-weather></form-weather>
      <footer class="main-footer">
        <p class="main-footer__dev">Разработано: <a href="https://github.com/Whireless">Whireless</a></p>
        <p class="main-footer__version">Версия: 1.0.5</p>
      </footer>
    </section>
  </main>
</template>
