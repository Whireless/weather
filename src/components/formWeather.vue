<script>
import axios from 'axios';
export default {
  data() {
    return {
      city: '',
      state: '',
      weatherList: {
        Clear: 'Ясная погода',
        Clouds: 'Облачная погода',
        Rain: 'Идёт дождь',
        Snow: 'Идёт снег',
      },
      weatherData: '',
      tempData: {
        'Фактическая: ': '',
        'Ощущается как: ': '',
      },
      windData: {
        'Скорость: ': '',
        'Направление: ': '',
        'Порывы до: ': '',
      },
    }
  },
  computed: {
    nameCity() {
      return '«' + this.city + '»';
    },
    getState() {
      const weatherKey = Object.keys(this.weatherList);
      const weatherValue = Object.values(this.weatherList);

      weatherKey.forEach((w, i) => {
        if (this.state === w) {
          this.state = weatherValue[i];
        }
      });
      return this.state;
    },
  },
  methods: {
    getWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        // Общее состояние
        this.state = res.data.weather[0].main;

        // Температура
        this.tempData['Фактическая: '] = `${Math.floor(res.data.main.temp)} °C`;
        this.tempData['Ощущается как: '] = `${Math.floor(res.data.main.feels_like)} °C`;

        // Ветер
        this.windData['Скорость: '] = `${Math.floor(res.data.wind.speed)} м/с`;
        if (res.data.wind.gust) {
          this.windData['Порывы до: '] = `${Math.floor(res.data.wind.gust)} м/с`;
        } else {
          this.windData['Порывы до: '] = 'без порывов';
        }

        // Определение направления ветра по градусам
        const deg = res.data.wind.deg;
        if(deg > 0 && deg < 20) {
          this.windData['Направление: '] = 'Северный';
        } else if (deg >= 10 && deg < 80) {
          this.windData['Направление: '] = 'Северо-Восточный';
        } else if(deg >= 80 && deg < 100) {
          this.windData['Направление: '] = 'Восточный';
        } else if(deg >= 100 && deg < 170) {
          this.windData['Направление: '] = 'Юго-Восточный';
        } else if(deg >= 170 && deg < 190) {
          this.windData['Направление: '] = 'Южный';
        } else if(deg >= 190 && deg < 260) {
          this.windData['Направление: '] = 'Юго-западный';
        } else if(deg >= 260 && deg < 280) {
          this.windData['Направление: '] = 'Западный';
        } else if(deg >= 270 && deg < 360) {
          this.windData['Направление: '] = 'Северо-Западный';
        }
        this.weatherData = res.data;
      })
    },
  }
}
</script>

<template>
  <form class="weather__form" v-on:submit.prevent>
    <h2 class="weather__form-title">Введи город или населённый пункт:</h2>
    <input class="weather__input-city" v-model.trim="city" type="text"  placeholder="напр.: Москва">
    <button class="weather__button weather__button--go" v-if="city !== '' && city.length > 1" v-on:click="getWeather()">Узнать погоду!</button>
    <button class="weather__button weather__button--no" v-else disabled>Узнать погоду!</button>
  </form>
  <div v-bind:class="weatherData != '' ? 'weather__data' : 'weather__data weather__data--hidden'">
    <button class="weather__cancel" v-on:click="weatherData = ''"></button>
    <h2 class="weather__title">{{ nameCity }}</h2>
    <h3 class="weather__subtitle weather__subtitle--basic">Общее состояние:</h3>
    <p class="weather__state">Сейчас: <span class="weather__info">{{ getState }}</span></p>
    <h3 class="weather__subtitle weather__subtitle--temp">Температура:</h3>
    <ul class="weather__list weather__list--temp">
      <li v-for="(result, item) in tempData" v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
    <h3 class="weather__subtitle weather__subtitle--wind">Ветер:</h3>
    <ul class="weather__list weather__list--wind">
      <li v-for="(result, item) in windData" v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
  </div>
</template>