import React, { useEffect, useState ,useRef} from 'react';
import './Weather.css';
import search_icon from '../Assets/search.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import clear from '../Assets/clear.png';
import humidity from '../Assets/humidity.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef= useRef();

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if(city ==""){
      alert("Enter the city name ");
      return;
    }

   

    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if(!response.ok){
        alert("city not found");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'  />
        <img src={search_icon} alt="Search Icon" onClick={()=>search(inputRef.current.value)} />
      </div>
      { weatherData ? <>
        
          <img src={weatherData.icon} className='weather-icon' alt="Weather Icon" />
          <p className='temp'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind} alt="Wind Icon" />
              <div>
                <p>{weatherData.wind} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
       </> :<></>}
    </div>
  );
};

export default Weather;
