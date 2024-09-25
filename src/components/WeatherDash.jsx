import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/weatherDash.css';

// Define image paths for different weather codes
const images = {
  800: '/images/clear sky 800.jpg', // Clear Sky
  300: '/images/drizzle 300.jpg', // Drizzle
  803: '/images/broken cloud 803.jpg', // Broken Clouds
  801: '/images/few cloud 801.jpg', // Few Clouds
  600: '/images/snow 600.jpg', // Snow
  200: '/images/Thunderstorm 200.jpg', // Thunderstorm
  741: '/images/fog 741.jpg',
  others: '/images/others.jpg', // For all other weather codes
};

const WeatherDetails = ({ city_name }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('component called!!');
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

  const { description, cityName, countryCode, timeZone, dateTime, weatherCode } = weatherData;
  console.log(weatherCode);
  // Determine the appropriate background image based on the weather code
  const imageSrc = images[weatherCode] || images.others;
  console.log(`Selected image: ${imageSrc}`);

  return (
    <div
      className="weather-details-container"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}
    >
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
