<script>
import actualWeather from './actualWeather.vue';
import forecastWeather from './forecastWeather.vue';
import { useGlobalStore } from '../store';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const { city, cities, isDisabled, } = storeToRefs(useGlobalStore());
    const { getActualWeather, getForecastWeather, } = useGlobalStore();
    return {
      city,
      cities,
      isDisabled,
      getActualWeather,
      getForecastWeather,
    }
  },
  components: {
    actualWeather,
    forecastWeather,
  },
}
</script>

<template>
  <form class="form" v-on:submit.prevent>
    <h2 class="form__title">Введи город или населённый пункт:</h2>
    <input class="form__input-city"
    v-model="city"
    type="text"
    list="cities"
    placeholder="напр.: Москва">
    <datalist id="cities">
      <option v-for="city in cities"
      v-bind:key="city">
      {{ city }}
      </option>
    </datalist>
    <div class="form__button-block">
      <button class="form__button form__button--actual"
      v-bind:disabled="isDisabled"
      v-on:click="getActualWeather()">
      Узнать актуальную погоду</button>
      <button class="form__button form__button--forecast"
      v-bind:disabled="isDisabled"
      v-on:click="getForecastWeather()">
      Прогноз на 5 дней</button>
    </div>
  </form>
  <actual-weather></actual-weather>
  <forecast-weather></forecast-weather>
</template>