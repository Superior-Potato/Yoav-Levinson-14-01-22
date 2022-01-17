import './App.css';
import { Favorites } from './components/Favorites';
import { Toolbar } from './components/Toolbar';
import { useState } from 'react';
import Weather from './components/weather/Weather';
import { getItemFromStorage } from './storage';

function App() {

  const [isFavorites,setIsFavorites] = useState(false)
  const [fav,setFav] = useState(JSON.parse(getItemFromStorage('favorites')))
  return (
    <div className="App">

      <header className="App-header">
        <Toolbar onSelectionChanged = {(selection) => {selection === 'fav' ? setIsFavorites(true) : setIsFavorites(false)}}/>
        {isFavorites ? <Favorites setFav = {setFav} fav = {fav}/> : <Weather setFav = {setFav}/>}
     </header>


    </div>
  );
}

export default App;
