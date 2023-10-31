<script>
export default {
  data() {
    return {}
  },
  computed: {
    preload() {
      const page = document.querySelector('body');
      window.addEventListener('load', () => {
        const preloader = page.querySelector('.preloader');
        preloader.classList.add('preloader--hidden');
      });
    },
  },
}
</script>

<template>
  <div class="preloader">
    <div class="preloader__logo">{{ preload }}</div>
  </div>
</template>
