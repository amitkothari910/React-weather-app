import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SearchBar from "./components/SearchBar";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Indore");
  const [units, setUnits] = useState("metric");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, [city, units]);

  const fetchWeather = async (city) => {
    try {
      setError(null);
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.slice(0, 5 * 8)); // 5-day forecast
    } catch (err) {
      setError("City not found. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🌤️ React Weather App</h1>
      <SearchBar onSearch={setCity} />
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard data={weather} units={units} setUnits={setUnits} />}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {forecast.length > 0 &&
          forecast.map((item, index) => (
            <ForecastCard key={index} data={item} units={units} />
          ))}
      </div>
    </div>
  );
}

export default App;
