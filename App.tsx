import { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { MOCK_WEATHERS, MockWeather } from "./mocks";

const { width: SCREEN_WIDTH, height } = Dimensions.get("screen");

/**
 * 원래라면 서버에 저장하고, 요청해서 서버에서 가져와야 함
 */
const API_KEY = "882caf0420ba65193c159ecbdd932bd9";

/**
 * 아이콘들
 */
const icons = {
  Clouds: "cloudy",
  Sunny: "day-sunny",
  Clear: "day-sunny",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunder: "lightning",
  Atmosphere: "cloudy-gusts",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState<MockWeather[]>([]);

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
      // const response = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      // );
      // const json = await response.json();

      setDays(MOCK_WEATHERS);
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(String(day.main.temp)).toFixed(1)}&deg;
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Text style={styles.description}>
                  {day.weather[0].main || "No Weather"}
                </Text>
                <Text style={styles.tinyText}>
                  {day.weather?.[0].description}
                </Text>
              </View>
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
    flex: 1,
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
    color: "white",
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
