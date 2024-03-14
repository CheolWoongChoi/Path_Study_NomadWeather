import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH, height } = Dimensions.get("screen");

const DAYS = [3, 5, 10, 15, 20, 25, 30];
const TEMPS = [-5, 0, 10, 4, 5, 20, 30, -15, 40];
const DESCRIPTIONS = [
  "Sunny",
  "Cloudy",
  "Rainy",
  "Snowy",
  "Windy",
  "Foggy",
  "Dusty",
  "Stormy",
  "Hail",
  "Sleet",
  "Hot",
  "Cold",
];

const WEATHERS = Array.from({ length: 10 }, () => ({
  day: DAYS[Math.floor(Math.random() * DAYS.length)],
  temp: TEMPS[Math.floor(Math.random() * TEMPS.length)],
  description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
}));

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
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
    }
  };

  useEffect(() => {
    ask();
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
        {WEATHERS.map(({ day, temp, description }, index) => (
          <View key={"weather-" + index} style={styles.day}>
            <Text style={styles.dayText}>{day}th</Text>
            <Text style={styles.temp}>{temp}&deg;</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        ))}
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
});
