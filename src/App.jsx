import React, { useState } from 'react';
import WeatherDetails from './components/WeatherDash';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (event) => {
    setCity(inputValue);
    event.preventDefault();
    console.log('Form submitted:', city);
    setInputValue('');
  };
  return (
    <>
    <div className='parent-container'>
      <Router>
        <Navbar />
      </Router>
      <div className='input-field'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} placeholder='eg. New York' onChange={(event) => setInputValue(event.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <WeatherDetails  city_name={city}/>
    </div>
    </>
  );
}

export default App;
