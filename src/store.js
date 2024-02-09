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
    months: [
      {
        name: 'Января',
        days: 31,
      },
      {
        name: 'Февраля',
        days: 28,
      },
      {
        name: 'Марта',
        days: 31,
      },
      {
        name: 'Апреля',
        days: 30,
      },
      {
        name: 'Мая',
        days: 31,
      },
      {
        name: 'Июня',
        days: 30,
      },
      {
        name: 'Июля',
        days: 31,
      },
      {
        name: 'Августа',
        days: 31,
      },
      {
        name: 'Сентября',
        days: 30,
      },
      {
        name: 'Октября',
        days: 31,
      },
      {
        name: 'Ноября',
        days: 30,
      },
      {
        name: 'Декабря',
        days: 31,
      },
    ],
    forecastData: [
      {
        title: '',
        list: [],
      },
      {
        title: '',
        list: [],
      },
      {
        title: '',
        list: [],
      },
      {
        title: '',
        list: [],
      },
      {
        title: '',
        list: [],
      },
    ],
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
      'Кайеркан', 'Керчь', 'Усть-Лабинск', 'Таганрог', 'Адлер',
      'Новороссийск', 'Валуйки', 'Старый Оскол', 'Шебекено',

      // Станицы, ПГТ и посёлки
      'Каневская', 'Новоминская', 'Староминская', 'Старощербиновская', 'Стародеревянковская',
      'Привольная', 'Копанская', 'Морской', 'Камышеватская', 'Крыловская',
      'Глафировка', 'Николаевка', 'Козлово', 'Динская', 'Васюринская', 'Ленинградская',
      'Лазаревское',
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
    // Основное состояние погоды
    getMainСondition(mainСondition, arr) {
      let main = '';
      const weathers = Object.entries(this.weatherList);
      weathers.forEach((w, i) => {
        if (mainСondition === w[0]) {
          main = weathers[i][1];
        }
      });

      if(arr) {
        return arr.push(main);
      }
      return main;
    },

    // Направление ветра
    getWindDeg (actualDeg, arr) {
      const deg = actualDeg;
      let direction = '';
      if(deg > 0 && deg < 20) {
        direction = 'Северный';
      } else if (deg >= 10 && deg < 80) {
        direction ='Северо-Восточный';
      } else if(deg >= 80 && deg < 100) {
        direction = 'Восточный';
      } else if(deg >= 100 && deg < 170) {
        direction = 'Юго-Восточный';
      } else if(deg >= 170 && deg < 190) {
        direction = 'Южный';
      } else if(deg >= 190 && deg < 260) {
        direction = 'Юго-Западный';
      } else if(deg >= 260 && deg < 280) {
        direction = 'Западный';
      } else if(deg >= 270 && deg < 360) {
        direction = 'Северо-Западный';
      } else {
        if(arr) {
          direction = 'Переменный';
        }
      }

      if(arr) {
        arr.push(direction);
      }
      return direction;
    },

    // Запрос актуальной погоды
    getActualWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        this.globalData['Сейчас: '] = this.getMainСondition(res.data.weather[0].main);
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

        this.windData['Направление: '] = this.getWindDeg(res.data.wind.deg);
      })
    },

    // Запрос прогноза на 5 дней
    getForecastWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=3df6733d821f7b6f821fc99652fcb7a4`)
      .then(res => {
        const forecast = res.data.list;
        // Получаем актуальный день и месяц
        const date = new Date();
        const actualDay = date.getDate();
        const actualMonth = date.getMonth();
        const dateList = [];

        this.forecastData.forEach((day, i) => {
          this.months.forEach((month, j) => {
            if(actualMonth === j) {
              day.list = [];
              let dayNum = actualDay + i;
              if (dayNum <= month.days) {
                day.title = `${actualDay + i} ${month.name}`;
                dateList.push(actualDay + i);
              } else {
                let nextMonth = this.months[j + 1];
                dayNum = 0;
                day.title = `${dayNum + i} ${nextMonth.name}`;
                dateList.push(dayNum + i);
              }
            }
          });

          forecast.forEach(item => {
            const date = item.dt_txt.split('').slice(8, 10).join('');
            const time = item.dt_txt.split('').slice(11, 16).join('');
            if(date == dateList[i]) {
              const arr3 = [];
              arr3.push(time);
              arr3.push(`${Math.floor(item.main.temp)} °C`);
              arr3.push(`${item.main.humidity} %`);
              this.getWindDeg(item.wind.deg, arr3);
              arr3.push(`${Math.floor(item.wind.speed)} м/с`);
              this.getMainСondition(item.weather[0].main, arr3);
              day.list.push(arr3);
            }
          });
        });
      })
    },
  }
});