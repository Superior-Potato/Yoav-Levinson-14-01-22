import { weather_icon } from "../../assets/images"
import { card, big_text, top_icon, info_holder, info_item, input, button, small_text, small_text_2, small_text_secondary, small_text_header, info_holder_secondary, table, table_row, table_header, table_data, table_data_left, table_data_middle, table_data_right, table_header_data, left_icon, right_icon, card_row } from "../../styles/card"
import { useEffect, useState } from 'react'
import $ from 'jquery'
import { fetchAutoCompletion, fetchCity, fetchFiveDayForecast, fetchWeather } from "../../networking/weatherapi"
import '../../App.css'
import fav from '../../assets/images/favorites.png'
import { getDayString } from "../../utils/date"
import { getItemFromStorage, saveAndMerge, saveItemToStorage } from "../../storage"
import { suggestionList, suggestionListItem } from "../../styles/main"
const Weather = (props) => {

    // Componenet State
    const [showing, setShowing] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [weatherForecast, setWeatherForecast] = useState(null)
    const [cityData, setCityData] = useState(null)
    const [suggestions, setSuggestions] = useState([])

    // JQuery customization
    useEffect(() => {
        $('tr:nth-child(2n)').css({ 'backgroundColor': 'lightgray' })
        $('.suggestion_item').hover((e) => {
            e.currentTarget.style.backgroundColor = 'gray'
            e.currentTarget.style.color = 'white'
        },(e) => {
            e.currentTarget.style.backgroundColor = 'whitesmoke'
            e.currentTarget.style.color = 'black'
        })
    })

    const toggleItemFavorite = () => {
        saveAndMerge('favorites', cityData)
        props.setFav(JSON.parse(getItemFromStorage('favorites')))
    }


    /**
     * autocompletes input city search
     * 
     * @param {Event} e 
     */
    const autoComplete = (e) => {
        const query = e.target.value

        if (query.length == 0) {
            setSuggestions([])
            animateList(false,400)
        } else {
            fetchAutoCompletion(query)
                .then(data => {
                    const cities = data.map(d => d.LocalizedName)
                    setSuggestions(cities)
                    animateList(cities.length > 0,400)
                })
        }
    }
    /**
     * chooses a suggestion from suggestion list
     * @param {Event} e 
     */
    const chooseSuggestion = (element,suggestion) => {
        $('input').val(suggestion)
        animateList(false,0)
        setSuggestions([])
    }

    /**
     * searches a city by name
     * fetch weather data && forecast data corresponding to a provided city key
     * @param {Event} e 
     */
    const search = (e) => {
        e.preventDefault()
        const val = e.target[0].value
        fetchCity(val)
            .then(cityDataRes => {
                setCityData(cityDataRes[0])
                fetchFiveDayForecast(cityDataRes[0].Key)
                    .then(forecastData => {
                        setWeatherForecast(forecastData)
                    })
                fetchWeather(cityDataRes[0].Key)
                    .then(weatherData => {
                        setWeatherData(weatherData[0])
                        setShowing(true)
                    })
            })
    }


    const animateList = (show, time) => {
        if (show)
            $('#suggestions').slideDown(time)
        else
            $('#suggestions').slideUp(time)
    }
    // UI visible element (Search/Show Data)
    const getCardElement = () => {
        if (showing && weatherData) {
            return (<div style={info_holder}>
                <div style={info_item}>
                    <h3 style={big_text}>Showing Weather for City: {cityData.EnglishName}</h3>
                </div>
                <div style={info_item}>
                    <h3 style={small_text}>{new Date(weatherData.LocalObservationDateTime).toDateString()}</h3>
                </div>
                <div style={info_item}>
                    <h3 style={small_text}>Status: {weatherData.WeatherText}</h3>
                </div>
                <div style={info_item}>
                    <h3 style={small_text}>Metric:  {weatherData.Temperature.Metric.Value}{weatherData.Temperature.Metric.Unit}</h3>
                </div>
                <div style={info_item}>
                    <h3 style={small_text}>Imperial:  {weatherData.Temperature.Imperial.Value}{weatherData.Temperature.Imperial.Unit}</h3>
                </div>

                <div style={info_holder_secondary}>
                    <div style={info_item}>
                        <h3 style={small_text_header}>{"5 Day weather forecast"}</h3>
                    </div>
                    <div style={info_item}>
                        <h3 style={small_text_secondary}>Status: {weatherForecast.Headline.Text}</h3>
                    </div>
                    <div style={info_item}>
                        <table style={table}>
                            <thead >
                                <tr style={{ ...table_row, ...table_header }}>
                                    <td style={table_header_data}>Day</td>
                                    <td style={table_header_data}>Free Text</td>
                                    <td style={table_header_data}>Temperature</td>
                                </tr>
                            </thead>

                            <tbody>
                                {weatherForecast.DailyForecasts.map(forecast => {
                                    let day = new Date(forecast.Date).getDay()
                                    return (<tr key={forecast.Date + forecast.EpochDate} style={table_row}>
                                        <td style={table_data}>{getDayString(day)}</td>
                                        <td style={table_data}>{forecast.Day.IconPhrase}</td>
                                        <td style={table_data}>{(forecast.Temperature.Maximum.Value + forecast.Temperature.Minimum.Value) / 2 + forecast.Temperature.Minimum.Unit}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button style={button} onClick={() => {
                    setShowing(false)
                    setWeatherData(null)
                    setCityData(null)
                }}>Back</button>
            </div>)
        } else {
            return (<form style={info_holder} onSubmit={(e) => search(e)}>
                <div style={info_item}>
                    Search Weather by city
                </div>
                <div style={info_item}>
                    <input onChange={(e) => autoComplete(e)} style={input} placeholder="Enter city name"></input>
                    <ul id='suggestions' style = {suggestionList($('input').innerWidth()+4)}>
                        {suggestions.map(city =>
                            <li key = {city} className="suggestion_item" onClick = {(e) => chooseSuggestion(e.currentTarget,$(e.target).text())} style={suggestionListItem}
                            >{city}<hr /></li>)}
                    </ul>
                </div>
                <div style={info_item}>
                    <button type='submit' style={button}>Search</button>
                </div>
            </form>)
        }
    }
    return (
        <div style={card}>
            <div style={card_row}>
                <img style={left_icon} src={weather_icon} alt="image not found" />
                {showing && <img onClick={() => toggleItemFavorite()} id='fav_icon' style={right_icon} src={fav} alt="image not found" />}
            </div>
            {getCardElement()}
        </div>
    )
}
export default Weather