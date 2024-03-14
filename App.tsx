import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH, height } = Dimensions.get("screen");

/**
 * 원래라면 서버에 저장하고, 요청해서 서버에서 가져와야 함
 */
const API_KEY = "882caf0420ba65193c159ecbdd932bd9";

/**
 *
 */
const MOCK_CURRENT_WEATHER = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
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
} as const;

type CurrentWeather = typeof MOCK_CURRENT_WEATHER;

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState<CurrentWeather[]>([]);

  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    if (location?.[0]) {
      const { city, region, street } = location[0];
      // 도시가 없으면, region을 보여줌
      setCity(city || region + " " + street || "Not Found!");

      // API_KEY가 invalid라고 뜸
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();

      setDays([MOCK_CURRENT_WEATHER]);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 40 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={`day-${index}`} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(String(day.main.temp)).toFixed(1)}&deg;
              </Text>
              <Text style={styles.description}>
                {day.weather?.[0].main || "No Weather"}
              </Text>
              <Text style={styles.tinyText}>
                {day.weather?.[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Colors
// CDF7F6, 8FB8DE, 9A94BC
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDF7F6",
  },
  city: {
    flex: 0.5,
    backgroundColor: "#8FB8DE",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 33,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    // backgroundColor: "#9A94BC",
  },
  dayText: {
    marginTop: 15,
    fontSize: 50,
  },
  temp: {
    marginTop: 20,
    fontSize: 60,
  },
  description: {
    marginTop: -10,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});
