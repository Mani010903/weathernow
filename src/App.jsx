import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "a85f0ea89fe075da0e41983066d9a863"; // <-- replace with your OpenWeather API key

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found!");
        setWeather(null);
        return;
      }

      setWeather(data);
      setError("");

      // Change background based on weather
      const mainWeather = data.weather[0].main.toLowerCase();
      const body = document.body;

      if (mainWeather.includes("cloud")) {
        body.style.background =
          "linear-gradient(to top, #d7d2cc, #304352)";
      } else if (mainWeather.includes("rain")) {
        body.style.background =
          "linear-gradient(to top, #00c6fb, #005bea)";
      } else if (mainWeather.includes("clear")) {
        body.style.background =
          "linear-gradient(to top, #fceabb, #f8b500)";
      } else if (mainWeather.includes("mist") || mainWeather.includes("fog")) {
        body.style.background =
          "linear-gradient(to top, #757f9a, #d7dde8)";
      } else {
        body.style.background =
          "linear-gradient(to top, #83a4d4, #b6fbff)";
      }
    }  catch {
  setError("Error fetching data. Please try again.");
  setWeather(null);
}

  };

  return (
    <div className="container">
      <h1>🌤️ WeatherNow</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>☁️ Weather: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
