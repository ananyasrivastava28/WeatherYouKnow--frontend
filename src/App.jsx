import React, { useState } from 'react';
import WeatherDetails from './components/WeatherDash';
import './App.css';

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
    <div className='parent-container'>
      <div className='input-field'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <WeatherDetails  city_name={city}/>
    </div>
  );
}

export default App;
