<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: '',
      state: '',
      temp: {
        fact: '',
        feels: '',
      },
      wind: {
        speed: '',
        gust: '',
        deg: '',
      },
      weatherList: {
        Clear: 'Ясная погода',
        Clouds: 'Облачная погода',
        Rain: 'Идёт дождь',
        Snow: 'Идёт снег',
      },
      weatherPic: [
        '/weather/src/img/weather/clear.jpeg',
        '/weather/src/img/weather/clouds.jpeg',
        '/weather/src/img/weather/rain.jpeg',
        '/weather/src/img/weather/snow.jpeg',
      ],
    }
  },
  computed: {
    preloader() {
      const page = document.querySelector('body');
      window.addEventListener('load', () => {
        const preloader = page.querySelector('.preloader');
        preloader.classList.add('preloader--hidden');
      });
    },
    nameCity() {
      return '«' + this.city + '»';
    },
    tempFact() {
      return this.temp.fact;
    },
    tempFeels() {
      return this.temp.feels;
    },
    windSpeed() {
      return this.wind.speed;
    },
    windGust() {
      return this.wind.gust;
    },
    windDeg() {
      // Определение направления ветра по градусам
      if(this.wind.deg > 0 && this.wind.deg < 20) {
        return 'Северный'
      } else if (this.wind.deg >= 10 && this.wind.deg < 80) {
        return 'Северо-Восточный'
      } else if(this.wind.deg >= 80 && this.wind.deg < 100) {
        return 'Восточный'
      } else if(this.wind.deg >= 100 && this.wind.deg < 170) {
        return 'Юго-Восточный'
      } else if(this.wind.deg >= 170 && this.wind.deg < 190) {
        return 'Южный'
      } else if(this.wind.deg >= 190 && this.wind.deg < 260) {
        return 'Юго-западный'
      } else if(this.wind.deg >= 260 && this.wind.deg < 280) {
        return 'Западный'
      } else if(this.wind.deg >= 270 && this.wind.deg < 360) {
        return 'Северо-Западный'
      }
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
        this.temp.fact = res.data.main.temp + ' °C';
        this.temp.feels = res.data.main.feels_like + ' °C';

        // Ветер
        this.wind.speed = res.data.wind.speed + ' м/с';
        if (res.data.wind.gust) {
          this.wind.gust = res.data.wind.gust + ' м/с';
        } else {
          this.wind.gust = 'без порывов'
        }
        this.wind.deg = res.data.wind.deg;
      })
    },
    getBg() {
      const page = document.querySelector('body');
      const weatherValue = Object.values(this.weatherList);

        weatherValue.forEach((w, i) => {
        if(this.state === w) {
          return page.setAttribute('style', `background-image: url("${this.weatherPic[i]}")`);
        } 
      })
    },
  },
}
</script>

<template>
{{getBg()}}
  <div class="preloader">
    <div class="preloader__logo">{{ preloader }}</div>
  </div>
  <main class="main-content">
    <h2 class="weather__title">Введи город или населённый пункт:</h2>
    <section class="weather">
      <input class="weather__input-city" v-model="city" type="text"  placeholder="напр.: Москва">
      <button class="weather__button weather__button--go" v-if="city !== '' && city.length > 1" @click="getWeather()">Узнать погоду!</button>
      <button class="weather__button weather__button--no" v-else disabled>Узнать погоду!</button>
      <div class="weather__data">
        <h3 class="weather__data-title weather__data-title--basic">Общее состояние:</h3>
        <p class="weather__state">Сейчас: <span class="weather__info">{{ getState }}</span></p>
        <h3 class="weather__data-title weather__data-title--temp">Температура:</h3>
        <ul class="weather__list weather__list--temp">
          <li class="weather__base-item">Фактическая: <span class="weather__info">{{ tempFact }}</span></li>
          <li class="weather__base-item">Ощущается как: <span class="weather__info">{{ tempFeels }}</span></li>
        </ul>
        <h3 class="weather__data-title weather__data-title--wind">Ветер:</h3>
        <ul class="weather__list weather__list--wind">
          <li class="weather__wind-item">Скорость: <span class="weather__info">{{ windSpeed }}</span></li>
          <li class="weather__wind-item">Направление: <span class="weather__info">{{ windDeg }}</span></li>
          <li class="weather__wind-item">Порывы до: <span class="weather__info">{{ windGust }}</span></li>
        </ul>
      </div>
    </section>
    <footer class="main-footer">
      <p class="main-footer__dev">Разработано: <a href="https://github.com/Whireless">Whireless</a></p>
      <p class="main-footer__version">Версия: 1.0.2</p>
    </footer>
  </main>
</template>

<style scoped>
</style>
