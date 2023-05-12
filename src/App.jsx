// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../weather.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (searchCity.trim() === '') {
        return;
      }

      const apiKey = '352c82359aa6336f714e8d9210c94729'; 

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
      }
    };

    fetchData();
  }, [searchCity]);

  const handleInputChange = (event) => {
    setSearchCity(event.target.value);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  if (!weatherData) {
    return (
      <div>
        <input type="text" value={searchCity} onChange={handleInputChange} placeholder="Buscar ciudad" />
        <div>Cargando...</div>
      </div>
    );
  }

  const { name, main, weather } = weatherData;
  const temperature = isCelsius ? convertKelvinToCelsius(main.temp) : convertKelvinToFahrenheit(main.temp);

  return (
    <div>
      <input type="text" value={searchCity} onChange={handleInputChange} placeholder="Buscar ciudad" />
      <div className="weather-container">
        <h1>{name}</h1>
        <p>Temperatura: {temperature} {isCelsius ? '°C' : '°F'}</p>
        <p>Descripción: {weather[0].description}</p>
        <button onClick={toggleTemperatureUnit}>Cambiar a {isCelsius ? '°F' : '°C'}</button>
      </div>
    </div>
  );
  
};

const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

const convertKelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(2);
};

export default App;