import axios from "axios";
import { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await axios(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`,
      );

      setWeatherData(response.data);
      setError("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error.message);
      } else if (err.request) {
        setError("Network error, please try again.");
      } else {
        setError(err.message);
      }
      setWeatherData(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl m-5 font-bold">Weather App</h1>
      <div className="flex gap-2 m-5">
        <input
          type="text"
          placeholder="Enter City"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="text-white p-2 rounded bg-green-600 hover:bg-green-700 transition-colors"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md mt-4 w-72">
          <h2 className="text-xl font-bold">{weatherData.location.name}</h2>
          <p className="text-lg capitalize text-gray-700">
            {weatherData.current.condition.text}
          </p>
          <h1 className="text-4xl font-bold my-4">
            {Math.round(weatherData.current.temp_c)}°C
          </h1>
          <div className="flex flex-col justify-between w-fit text-sm text-gray-600">
            <p>
              <b>Humidity:</b> {weatherData.current.humidity}%
            </p>
            <p>
              <b>Wind:</b> {weatherData.current.wind_kph} km/h
            </p>
            <p>
              <b>Time:</b> {weatherData.location.localtime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
