import cloneDeep from "lodash/cloneDeep";

const MOCK_WEATHER = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 501,
      main: "Cloud",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: Math.random() * 15, // 임시로 바꿈
    feels_like: 298.74,
    temp_min: 297.56,
    temp_max: 300.05,
    pressure: 1015,
    humidity: 64,
    sea_level: 1015,
    grnd_level: 933,
  },
  visibility: 10000,
  wind: {
    speed: 0.62,
    deg: 349,
    gust: 1.18,
  },
  rain: {
    "1h": 3.16,
  },
  clouds: {
    all: 100,
  },
  dt: 1661870592,
  sys: {
    type: 2,
    id: 2075663,
    country: "IT",
    sunrise: 1661834187,
    sunset: 1661882248,
  },
  timezone: 7200,
  id: 3163858,
  name: "Zocca",
  cod: 200,
};

const MOCK_WEATHER_CLOUD = {
  ...cloneDeep(MOCK_WEATHER),
  weather: [
    {
      id: 800,
      main: "Clouds",
      description: "구름이 조금 있어요.",
      icon: "01d",
    },
  ],
};

const MOCK_WEATHER_CLEAR = {
  ...cloneDeep(MOCK_WEATHER),
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "하늘이 맑네요.",
      icon: "01d",
    },
  ],
};

const MOCK_WEATHER_RAIN = {
  ...cloneDeep(MOCK_WEATHER),
  weather: [
    {
      id: 800,
      main: "Rain",
      description: "막걸리와 파전이 땡기는 날씨에요.",
      icon: "01d",
    },
  ],
};

const MOCK_WEATHER_SUNNY = {
  ...cloneDeep(MOCK_WEATHER),
  weather: [
    {
      id: 800,
      main: "Sunny",
      description: "화창하군요.",
      icon: "01d",
    },
  ],
};

export const MOCK_WEATHERS = [
  MOCK_WEATHER_CLOUD,
  MOCK_WEATHER_CLEAR,
  MOCK_WEATHER_RAIN,
  MOCK_WEATHER_SUNNY,
];

export type MockWeather = typeof MOCK_WEATHER;
