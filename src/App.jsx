import React, { useState } from "react";
import "./styles/styles.scss";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;
console.log("KEY cargada:", API_KEY ? "sí, largo " + API_KEY.length : "NO (undefined)");
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

function App() {
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchPressed = async () => {
    const city = search.trim();
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}`);
      const result = await response.json();

      // WeatherAPI responds with an "error" object when the city is not found
      if (!response.ok || result.error) {
        setWeather(null);
        setError("City not found. Check the spelling and try again.");
        return;
      }

      setWeather(result);
    } catch {
      setWeather(null);
      setError("Could not reach the weather service. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchPressed();
    }
  };

  return (
    <div className="huge">
      <div className="big-container">
        {/* HEADER */}
        <h1>Weather App</h1>

        {/* search box */}
        <div className="container1">
          <input
            type="text"
            placeholder="Enter city/town..."
            value={search}
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="container2">
          {error && <p className="error">{error}</p>}

          {weather && (
            <>
              {/* Location */}
              <p>
                {weather.location.name}, {weather.location.region}
              </p>

              {/* Temperature (!== undefined so 0 °C still shows) */}
              {weather.current.temp_c !== undefined && <p>{weather.current.temp_c}°C</p>}

              {/* Condition (sunny, cloudy...) */}
              <p>{weather.current.condition.text}</p>

              {/* Local time */}
              <p>{weather.location.localtime.slice(-5)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
