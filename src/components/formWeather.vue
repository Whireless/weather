<script>
import axios from 'axios';
export default {
  data() {
    return {
      // Название города
      city: '',
      // Данные для обработки текущей погоды
      weatherList: {
        Clear: 'Ясно',
        Clouds: 'Облачно',
        Rain: 'Дождь',
        Snow: 'Cнег',
        Thunderstorm: 'Гроза',
      },
      weatherData: '',
      generalData: {
        'Сейчас: ': '',
        'Влажность: ': '',
      },
      tempData: {
        'Фактическая: ': '',
        'Ощущается как: ': '',
      },
      windData: {
        'Скорость: ': '',
        'Направление: ': '',
        'Порывы до: ': '',
      },
      // Данные для обработки погоды на 5 дней
      forecastData: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
    }
  },
  computed: {
    nameCity() {
      return '«' + this.city + '»';
    },
    isDisabled() {
      if(this.city !== '' && this.city.length > 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    goForecast(item, i) {
      this.forecastData[i] = [];
      
      const dateAndTime = item.dt_txt.split('').slice(5, 16).join('');
      this.forecastData[i].push(dateAndTime);
      this.forecastData[i].push(`${Math.floor(item.main.temp)} °C`);
      this.forecastData[i].push(`${item.main.humidity} %`);

      const deg = item.wind.deg;
        if(deg > 0 && deg < 20) {
          this.forecastData[i].push('С');
        } else if (deg >= 10 && deg < 80) {
          this.forecastData[i].push('С-В');
        } else if(deg >= 80 && deg < 100) {
          this.forecastData[i].push('В');
        } else if(deg >= 100 && deg < 170) {
          this.forecastData[i].push('Ю-В');
        } else if(deg >= 170 && deg < 190) {
          this.forecastData[i].push('Ю');
        } else if(deg >= 190 && deg < 260) {
          this.forecastData[i].push('Ю-З');
        } else if(deg >= 260 && deg < 280) {
          this.forecastData[i].push('З');
        } else if(deg >= 270 && deg < 360) {
          this.forecastData[i].push('С-З');
        }

      this.forecastData[i].push(`${Math.floor(item.wind.speed)} м/с`);

      const weatherKey = Object.keys(this.weatherList);
      const weatherValue = Object.values(this.weatherList);

      weatherKey.forEach((w, index) => {
        if (item.weather[0].main === w) {
          this.forecastData[i].push(weatherValue[index]);
        }
      });
    },
    // Получение актуальной погоды
    getActualWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        // Общее состояние и влажность
        const weatherKey = Object.keys(this.weatherList);
        const weatherValue = Object.values(this.weatherList);

        weatherKey.forEach((w, i) => {
          if (res.data.weather[0].main === w) {
            this.generalData['Сейчас: '] = weatherValue[i];
          }
        });
        this.generalData['Влажность: '] = `${res.data.main.humidity} %`;

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
          this.windData['Направление: '] = 'Юго-Западный';
        } else if(deg >= 260 && deg < 280) {
          this.windData['Направление: '] = 'Западный';
        } else if(deg >= 270 && deg < 360) {
          this.windData['Направление: '] = 'Северо-Западный';
        }
        this.weatherData = res.data;
      })
    },
    // Получение прогноза на 5 дней
    getForecastWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        const forecast = res.data.list;
        forecast.forEach((item, i) => {
          this.goForecast(item, i);
        });
      })
    },
  }
}
</script>

<template>
  <form class="weather__form" v-on:submit.prevent>
    <h2 class="weather__form-title">Введи город или населённый пункт:</h2>
    <input class="weather__input-city" v-model.trim="city" type="text"  placeholder="напр.: Москва">
    <button class="weather__button weather__button--actual" v-bind:disabled="isDisabled" v-on:click="getActualWeather()">Узнать актуальную погоду</button>
    <button class="weather__button weather__button--forecast" v-bind:disabled="isDisabled" v-on:click="getForecastWeather()">Прогноз на 5 дней</button>
  </form>
  <div v-bind:class="weatherData != '' ? 'weather__type weather__type--actual' : 'weather__type weather__type--actual weather__type--hidden'">
    <button class="weather__cancel" v-on:click="weatherData = ''"></button>
    <h2 class="weather__title">{{ nameCity }}</h2>
    <h3 class="weather__subtitle weather__subtitle--basic">Общее состояние:</h3>
    <ul class="weather__list weather__list--general">
      <li v-for="(result, item) in generalData" v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
    <h3 class="weather__subtitle weather__subtitle--temp">Температура:</h3>
    <ul class="weather__list weather__list--temp">
      <li v-for="(result, item) in tempData" v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
    <h3 class="weather__subtitle weather__subtitle--wind">Ветер:</h3>
    <ul class="weather__list weather__list--wind">
      <li v-for="(result, item) in windData" v-bind:key="item">{{ item }}<span v-bind:class="'weather__info'">{{ result }}</span></li>
    </ul>
  </div>
  <div v-bind:class="forecastData[0] != '' ? 'weather__type weather__type--forecast' : 'weather__type weather__type--forecast weather__type--hidden'">
    <button class="weather__cancel weather__cancel--absolute" v-on:click="forecastData[0] = ''"></button>
    <ul class="weather__list weather__list--forecast">
      <li class="weather__item weather__item--forecast" v-for="li in forecastData" v-bind:key="li">
        <span v-for="data in li" v-bind:key="data">{{ data }}</span>
      </li>
    </ul>
  </div>
</template>