<script>
import { useGlobalStore } from '../store';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const { globalData, nameCity, tempData, windData } = storeToRefs(useGlobalStore());
    return {
      globalData,
      nameCity,
      tempData,
      windData,
    }
  },
  computed: {
    goActual() {
      if(this.globalData['Сейчас: '] != '') {
        return 'weather__type weather__type--actual'
      } else {
        return 'weather__type weather__type--actual weather__type--hidden' 
      }
    },
  },
}
</script>

<template>
  <div v-bind:class="goActual">
    <button class="weather__cancel"
    v-on:click="globalData['Сейчас: '] = ''"></button>
    <h2 class="weather__title weather__title--actual">{{ nameCity }}</h2>
    <h3 class="weather__subtitle weather__subtitle--basic">Общее состояние:</h3>
    <ul class="weather__list weather__list--general">
      <li v-for="(result, item) in globalData"
          v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
    <h3 class="weather__subtitle weather__subtitle--temp">Температура:</h3>
    <ul class="weather__list weather__list--temp">
      <li v-for="(result, item) in tempData"
          v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
    <h3 class="weather__subtitle weather__subtitle--wind">Ветер:</h3>
    <ul class="weather__list weather__list--wind">
      <li v-for="(result, item) in windData"
          v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
  </div>
</template>