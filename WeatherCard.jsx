import React from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

function WeatherCard({ data, units, setUnits }) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg text-center">
      <h2 className="text-2xl font-semibold">{data.name}, {data.sys.country}</h2>
      <p className="text-lg">{data.weather[0].description}</p>
      <h1 className="text-5xl font-bold">{Math.round(data.main.temp)}°{units === "metric" ? "C" : "F"}</h1>

      <div className="flex justify-center gap-6 mt-4">
        <p className="flex items-center gap-2"><WiHumidity size={24}/> {data.main.humidity}%</p>
        <p className="flex items-center gap-2"><WiStrongWind size={24}/> {data.wind.speed} m/s</p>
      </div>

      <button
        onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}
        className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
      >
        Switch to {units === "metric" ? "°F" : "°C"}
      </button>
    </div>
  );
}

export default WeatherCard;
