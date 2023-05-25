import React, { useEffect, useState } from 'react'
import './styles/styles.scss';

//: 68a6ed7432bd43bb80e205841230205
//: TEST -----> http://api.weatherapi.com/v1/current.json?key=68a6ed7432bd43bb80e205841230205&q=miami
// : http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
function App() {


  const [weather, setWeather] = useState({})
  const [search, setSearch] = useState('');
  const [icon, setIcon] = useState("");

  const searchPressed = () => {

    if (search) {

      fetch(`http://api.weatherapi.com/v1/current.json?key=68a6ed7432bd43bb80e205841230205&q=${search}`)
        .then(response => response.json())
        .then(result => {
          setWeather(result)
          setIcon(result.current.condition.text)
        })
        .catch(error => console.error(error));

    }

  }

  useEffect(() => {

    fetch(`https://www.weatherapi.com/docs/weather_conditions.json`)
      .then(res => res.json())
      .then(resultado => setIcon(resultado))

    console.log("cambio de ciudad")

  }, [weather])


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        searchPressed();
    }
}

  return (<div className='huge'>
    <div className='big-container'>
      {/* HEADER */}
      <h1>Weather App</h1>

      {/* search box */}
      <div className='container1'>
        <input type='text' placeholder='Enter city/town...' onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={searchPressed}>Search</button>

      </div>
      <div className='container2'>
        {/* Location */}
        {weather.location && weather.location.name && weather.location.region && (
          <p>
            {weather.location.name}, {weather.location.region}
          </p>
        )}

        {/* Temperature */}
        {weather.current && weather.current.temp_c && <p>{weather.current.temp_c}°C</p>}

        {/* Condition (sunny) */}
        {weather.current && weather.current.condition && weather.current.condition.text && (
          <p>{weather.current.condition.text}</p>



        )}
        {/** Time */}
        {weather.location && weather.location.localtime && (
          <p>{weather.location.localtime.slice(-5)}</p>
        )}
      </div>
    </div>
  </div>
  )
}

export default App
