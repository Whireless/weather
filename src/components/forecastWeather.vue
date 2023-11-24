<script>
import { useGlobalStore } from '../store';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const { nameCity, forecastData, } = storeToRefs(useGlobalStore());
    return {
      nameCity,
      forecastData,
    }
  },
}
</script>

<template>
  <div v-bind:class="forecastData[0].list != '' ? 'weather__type weather__type--forecast' : 'weather__type weather__type--forecast weather__type--hidden'">
    <button class="weather__cancel"
            v-on:click="forecastData[0].list = ''">
    </button>
    <h2 class="weather__title weather__title--forecast">{{ nameCity }}</h2>
    <div class="weather__data weather__data--forecast">
      <div v-for="block in forecastData">
        <h4 class="weather__date-title">{{ block.title }}</h4>
        <ul class="weather__list">
          <li class="weather__item weather__item--forecast"
              v-for="li in block.list"
              v-bind:key="li">
            <span class="weather__option"
                  v-for="data in li"
                  v-bind:key="data">{{ data }}
            </span>
          </li>
        </ul>
    </div>
    </div>
  </div>
</template>