import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../components/weatherDash.css';

// Define image paths for different weather codes
const images = {
  800: '/images/clear_sky_800.jpg', // Clear Sky
  300: '/images/drizzle_300.jpg', // Drizzle
  803: '/images/broken_cloud_803.jpg', // Broken Clouds
  801: '/images/few_cloud_801.jpg', // Few Clouds
  600: '/images/snow_600.jpg', // Snow
  200: '/images/Thunderstorm_200.jpg', // Thunderstorm
  741: '/images/fog_741.jpg', // fog
  721: '/images/Haze_721.jpg', // Haze
  others: '/images/others.jpg', // For all other weather codes
};

const WeatherDetails = ({ city_name }) => {
  const [weatherData, setWeatherData] = useState(null);

  // Memoized function to get cached data
  const getCachedData = useMemo(() => {
    return (cityName) => {
      const cachedData = localStorage.getItem(`weather_${cityName}`);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Check if cache is less than 5 minutes old
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          return data;
        }
      }
      return null;
    };
  }, []);

  // Memoized function to set cached data
  const setCachedData = useMemo(() => {
    return (cityName, data) => {
      localStorage.setItem(
        `weather_${cityName}`,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    };
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      // Check cache first
      const cachedData = getCachedData(city_name);
      if (cachedData) {
        console.log('Using cached data for:', city_name);
        setWeatherData(cachedData);
        return;
      }

      console.log('Fetching new data for:', city_name);
      try {
        const response = await axios.get(`https://weatheryouknow-backend.onrender.com/user/${city_name}`);
        setWeatherData(response.data);
        // Cache the new data
        setCachedData(city_name, response.data);
      } catch (error) {
        console.error('Error fetching weather:', error.message);
      }
    };

    fetchWeather();
  }, [city_name, getCachedData, setCachedData]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { description, cityName, countryCode, timeZone, dateTime, weatherCode } = weatherData;
  const imageSrc = images[weatherCode] || images.others;

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