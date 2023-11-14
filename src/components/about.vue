<script>
  import { useGlobalStore } from '../store';
  export default {
    setup() {
      const { aboutList } = useGlobalStore();
      return {
        aboutList,
      }
    },
  }
</script>

<template>
  <section class="about">
    <h2 class="about__title">Общая информация:</h2>
    <ul class="about__list">
      <li class="about__item"
      v-for="li in aboutList"
      v-bind:key="li">
      {{ li }}
      </li>
    </ul>
  </section>
</template>