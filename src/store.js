import { defineStore } from 'pinia';
import axios from 'axios';

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    // Название города
    city: '',
    // Виды состояний погоды
    weatherList: {
      Clear: 'Ясно',
      Clouds: 'Облачно',
      Rain: 'Дождь',
      Snow: 'Cнег',
      Thunderstorm: 'Гроза',
      Mist: 'Туман',
      Tornado: 'Торнадо',
    },
    // Общее состояние
    globalData: {
      'Сейчас: ': '',
      'Влажность: ': '',
    },
    // Температура
    tempData: {
      'Фактическая: ': '',
      'Ощущается как: ': '',
    },
    // Ветер
    windData: {
      'Скорость: ': '',
      'Направление: ': '',
      'Порывы до: ': '',
    },
    // Данные для обработки погоды на 5 дней
    forecastData: [],
  }),
  getters: {
    // Вывод названия города
    nameCity(state) {
      return '«' + state.city + '»';
    },
    // Включение/отключение кнопки получения погоды
    isDisabled(state) {
      if(state.city !== '' && state.city.length > 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  actions: {
    // Запрос актуальной погоды
    getActualWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        // Общее состояние и влажность
        const weatherKey = Object.keys(this.weatherList);
        const weatherValue = Object.values(this.weatherList);

        weatherKey.forEach((w, i) => {
          if (res.data.weather[0].main === w) {
            this.globalData['Сейчас: '] = weatherValue[i];
          }
        });
        this.globalData['Влажность: '] = `${res.data.main.humidity} %`;

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
      })
    },
    // Запрос прогноза на 5 дней
    getForecastWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        const forecast = res.data.list;
        this.forecastData = [];

        forecast.forEach((item, i) => {
          this.forecastData.push([]);

          const date = item.dt_txt.split('').slice(5, 16);
          [date[0], date[1], date[3], date[4]] = [date[3], date[4], date[0], date[1]];
          const itog = date.join('');

          this.forecastData[i].push(itog);
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
        });
      })
    },
  }
})