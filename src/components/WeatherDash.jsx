import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/weatherDash.css';

const WeatherDetails = ({ city_name }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
        console.log('component called!!')
      try {
        const response = await axios.get(`https://weatheryouknow-backend.onrender.com/user/${city_name}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error.message);
      }
    };

    fetchWeather();
  }, [city_name]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { description, cityName, countryCode, timeZone, dateTime } = weatherData;

  // Determine image based on description (customize this logic)
  // const imageSrc = `https://openweathermap.org/img/wn/${weatherData.weather}@2x.png`;

  return (
    <div className="weather-details-container">
      <div className="weather-details-content">
        
        <div className="weather-info">
          <h2>{cityName}, {countryCode}</h2>
          <p>{dateTime}</p>
          <p>{description}</p>
          <p>Time Zone: {timeZone}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;