<script>
export default {
  computed: {
    preloader() {
      window.onload = () => {
        document.querySelector('.preloader').classList.add('preloader--hidden');
      }
    },
  },
}
</script>

<template>
  <div v-bind:class="['preloader', preloader]">
    <p class="preloader__logo">
      <span class="weather__info">.easy</span>погода
    </p>
  </div>
</template>
