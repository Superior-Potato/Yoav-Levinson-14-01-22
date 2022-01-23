import { fetchWeather } from "../networking/weatherapi"
import { deleteCityFromFavorites, getItemFromStorage } from "../storage"
import removeIcon from '../assets/images/remove.png'
import { card, info_holder, info_item, table_data,table_header,table_header_data,table, table_row, left_icon, right_icon } from "../styles/card"
import validators from "../utils/validators"

import $ from 'jquery'
import { useDispatch, useSelector } from "react-redux"
import { removeFromFavorites } from "../storage/redux"
import React from 'react'

export const Favorites = (props) => {
 

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favList)
    const deleteFromFav = (key) => {
        dispatch(removeFromFavorites(key)) // redux
        deleteCityFromFavorites(key) // local storage
    }
    const getFavoriteElements = () => {
        const getWeatherForItem = (key) => {
            fetchWeather(key)
            .then(weatherData => {
                if(weatherData && weatherData.length > 0) {
                    $('#'+key).html(weatherData[0].Temperature.Metric.Value + weatherData[0].Temperature.Metric.Unit)
                }
            })
        }
        const getAll = (completion) => {
            if(validators.validate(favorites)) {
               
                const elements = favorites.map(fav => <tr key = {fav.Key + fav.LocalizedName} style = {{...table_row,alignItems:'center'}}>
                    <td style = {table_data}>{fav.Key}</td>
                    <td style = {table_data}>{fav.LocalizedName}</td>
                    <td style=  {table_data} id ={fav.Key}></td>
                    <td style = {table_data}><img onClick = {() => deleteFromFav(fav.Key)} style = {{width:'30px',height:'30px',cursor:'pointer'}} src = {removeIcon}/></td>
                </tr>)
                  completion(favorites)
                return elements
           }else {
               return <tr>No Favorites</tr>
           }
        }
        return (<div style={info_item}>
        <table style={{...table}}>
            <thead >
                <tr style={{...table_row,...table_header}}>
                    <td style={table_header_data}>Key</td>
                    <td style={table_header_data}>Name</td>
                    <td style={table_header_data}>Current W</td>
                    {favorites.length >0 &&<td style = {table_header_data}></td>}
                </tr>
            </thead>

            <tbody>
               {getAll(favorites =>  favorites.forEach(fav => getWeatherForItem(fav.Key)))}
              
            </tbody>
        </table>
    </div>)
    }
    return (<div style = {card}>
       <div style = {info_holder}>
        {getFavoriteElements()}
    </div>
    </div>)
}