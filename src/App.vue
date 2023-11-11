<script>
import preloader from './components/preloader.vue';
import formWeather from './components/formWeather.vue';
export default {
  components: {
    preloader,
    formWeather,
  },
}
</script>

<template>
  <main class="main-content">
    <preloader></preloader>
    <div class="main-content__intro">
      <h1 class="main-content__title"><span class="weather__info">.easy</span>погода</h1>
      <span class="main-content__subtitle">только погода, ничего лишнего.</span>
    </div>
    <section class="weather">
      <form-weather></form-weather>
      <footer class="main-footer">
        <p class="main-footer__dev">Разработано: <a href="https://github.com/Whireless">Whireless</a></p>
        <p class="main-footer__version">Версия: 1.1.2</p>
      </footer>
    </section>
  </main>
</template>
