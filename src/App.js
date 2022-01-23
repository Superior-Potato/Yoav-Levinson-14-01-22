import './App.css';
import { Favorites } from './components/Favorites';
import { Toolbar } from './components/Toolbar';
import { useEffect, useState } from 'react';
import Weather from './components/weather/Weather';
import { getItemFromStorage } from './storage';
import { useDispatch, useSelector } from 'react-redux';
import { addWeatherData } from './storage/redux';

function App() {

  const [isFavorites,setIsFavorites] = useState(false)
  
  return (
    <div className="App">
      <header className="App-header">
        <Toolbar onSelectionChanged = {(selection) => {selection === 'fav' ? setIsFavorites(true) : setIsFavorites(false)}}/>
        {isFavorites ? <Favorites/> : <Weather/>}
     </header>
    </div>
  );
}

export default App;
