import { apikey, dev } from "../assets/info"
import { getItemFromStorage, saveItemToStorage } from "../storage"
import { fromJson, toJson } from "../utils/files"
import validators from "../utils/validators"
import { get, getURL } from "./apiTools"

const base = "https://dataservice.accuweather.com/"

/**
 * creates a request for city data with given city name 'query'
 * @param {string} query 
 * @returns Promise<Json>
 */
export const fetchCity = async (query) => {
    if(dev === "BETA") {
      const saved = getItemFromStorage('cities')
      if(validators.validateString(saved)) {
        return toJson(saved)
      }
    }

    const urlComponents = {
        base:base,
        endPoints:'locations/v1/cities/search',
        queryItems:{apikey:apikey,q:query,details:true}
    }
    const url = getURL(urlComponents.base,urlComponents.endPoints,urlComponents.queryItems)
    const request =  get(url)
      return await request.then(data =>{
          if(data.code != 400 && data.data != 404) {
          saveItemToStorage('cities',data)
          }
        return data
    })
}
/**
 * creates a request for weather data with given city key 'cityKey'
 * @param {string} cityKey 
 * @returns Promise<Json>
 */
export const fetchWeather = async (cityKey) => {
    if(dev === "BETA") {
      const saved = getItemFromStorage('weather')
      if(validators.validateString(saved)) {
        return toJson(saved)
      }
    }

    const urlComponents = {
        base:base,
        endPoints:`currentconditions/v1/${cityKey}`,
        queryItems:{apikey:apikey,details:true}
    }
    const url = getURL(urlComponents.base,urlComponents.endPoints,urlComponents.queryItems)
    const request =  get(url)
      return await request.then(data =>{
          if(data.code != 400 && data.code != 404) {
              saveItemToStorage('weather',data)
          }
        return data
    })
}
/**
 * creates a request forweather  forecase data with given city key 'cityKey'
 * @param {string} cityKey 
 * @returns Promise<Json>
 */
export const fetchFiveDayForecast = async (cityKey) => {
    if(dev === "BETA") {
      const saved = getItemFromStorage('forecast')
      if(validators.validateString(saved)) {
        return toJson(saved)
      }
    }

    const urlComponents = {
        base:base,
        endPoints:`forecasts/v1/daily/5day/${cityKey}`,
        queryItems:{apikey:apikey,details:true}
    }
    const url = getURL(urlComponents.base,urlComponents.endPoints,urlComponents.queryItems)
    const request =  get(url)
      return await request.then(data =>{
          if(data.code != 400 && data.code != 404 && dev === "BETA") {
              saveItemToStorage('forecast',data)
          }
        return data
    })
}

/**
 * creates a request for weather data with given city key 'cityKey'
 * @param {string} cityKey 
 * @returns Promise<Json>
 */
 export const fetchAutoCompletion = async (query) => {
  
  if(dev === "BETA") {
    const saved = getItemFromStorage('autoComplete')
    if(validators.validateString(saved)) {
      return toJson(saved)
    }
  }

  const urlComponents = {
      base:base,
      endPoints:`/locations/v1/cities/autocomplete`,
      queryItems:{apikey:apikey,q:query}
  }
  const url = getURL(urlComponents.base,urlComponents.endPoints,urlComponents.queryItems)
  const request =  get(url)
    return await request.then(data =>{
        if(data.code != 400 && data.code != 404) {
            saveItemToStorage('autoComplete',data)
        }
      return data
  })
}