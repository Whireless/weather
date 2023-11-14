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
    // Города для автозаполнения
    cities: [
      // Столицы регионов
      'Москва', 'Санкт-Петербург', 'Краснодар', 'Омск', 'Нижний Новгород', 'Абакан',
      'Ростов на Дону', 'Белгород', 'Красноярск', 'Курган', 'Уфа', 'Анадырь',
      'Саранск', 'Рязань', 'Казань', 'Ижевск', 'Чебоксары', 'Ярославль', 'Астрахань',
      'Якутск', 'Южно-Сахалинск', 'Элиста', 'Чита', 'Черкесск', 'Барнаул',
      'Челябинск', 'Ханты-Мансийск', 'Хабаровск', 'Ульяновск', 'Улан-Удэ', 'Биробиджан',
      'Тюмень', 'Тула', 'Томск', 'Тамбов', 'Тверь', 'Благовещенск',
      'Сыктывкар', 'Ставрополь', 'Смоленск', 'Симферополь', 'Севастополь', 'Брянск',
      'Саратов', 'Самара', 'Салехард', 'Петрозаводск', 'Петропавловск-Камчатский', 'Архангельск',
      'Псков', 'Пенза', 'Оренбург', 'Орёл', 'Новосибирск', 'Великий Новгород',
      'Пермь', 'Нарьян-Мар', 'Нальчик', 'Мурманск', 'Махачкала', 'Владивосток',
      'Майкоп', 'Магас', 'Магадан', 'Липецк', '	Кызыл', 'Владимир',
      'Курск', 'Кострома', 'Киров', 'Кемерово', 'Калуга', 'Волгоград',
      'Калининград', 'Йошкар-Ола', 'Иркутск', 'Иваново', 'Екатеринбург',
      'Грозный', 'Горно-Алтайск', 'Воронеж', 'Вологда', 'Владикавказ',
       
      // Остальные города
      'Норильск',  'Сочи', 'Гатчина', 'Армавир', 'Апшеронск', 
      'Геленджик', 'Темрюк', 'Азов',  'Новочеркасск', 'Новошахтинск',
      'Туапсе', 'Конаково', 'Анапа', 'Ейск', 'Абинск', 

      // Станицы, ПГТ и посёлки
      'Каневская', 'Новоминская', 'Староминская', 'Старощербиновская', 'Стародеревянковская',
      'Привольная', 'Копанская', 'Морской', 'Камышеватская', 'Крыловская',
      'Глафировка', 'Николаевка',
    ],
    // Информация о сайте
    aboutList: [
      'На сайте есть возможность узнать погоду практически для любого населённого пункта в мире.',
      'Автозаполнение работает не для всех населённых пунктов, однако их можно ввести вручную.',
      'Названия можно вводить в любом регистре и на любом языке, например: МоСкВа, Moscow и т.д. выдаст одинаковые данные для Москвы.',
      'Сайт предоставляется "Как есть", использовать его можно свободно и без какой-либо оплаты.',
    ],
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