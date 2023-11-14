<script>
import { useGlobalStore } from '../store';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const { nameCity, forecastData } = storeToRefs(useGlobalStore());
    return {
      nameCity,
      forecastData,
    }
  },
}
</script>

<template>
  <div v-bind:class="forecastData != '' ? 'weather__type weather__type--forecast' : 'weather__type weather__type--forecast weather__type--hidden'">
    <button class="weather__cancel"
            v-on:click="forecastData = ''">
    </button>
    <h2 class="weather__title weather__title--forecast">{{ nameCity }}</h2>
    <ul class="weather__list weather__list--forecast">
      <li class="weather__item weather__item--forecast"
          v-for="li in forecastData"
          v-bind:key="li">
        <span class="weather__option"
              v-for="data in li"
              v-bind:key="data">{{ data }}
        </span>
      </li>
    </ul>
  </div>
</template>