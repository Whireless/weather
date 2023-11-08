<script>
export default {
  data() {
    return {}
  },
  computed: {
    preload() {
      window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('preloader--hidden');
      });
    },
  },
}
</script>

<template>
  <div class="preloader">
    <p class="preloader__logo">{{ preload }}
      <span class="weather__info">.easy</span>погода
    </p>
  </div>
</template>
