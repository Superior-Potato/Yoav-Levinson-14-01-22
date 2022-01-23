import {createSlice,configureStore} from '@reduxjs/toolkit'
import { getItemFromStorage } from '..'

/**
 * User Weather City favorites slice
 * Loads from local storage
 */
const weatherFavorites = createSlice({
    name:'userFavorites',
    initialState:{favList:JSON.parse(getItemFromStorage("favorites"))},
    reducers: {
        setFavorites: (state,action) => {
            Object.assign(state,{favList:action.payload})
            },
        removeFromFavorites: (state,action) => { 
            const key = action.payload // key
            const index = state.favList.findIndex(fav => fav.Key === key)
            Object.assign(state,{favList:state.favList.slice(0,index).concat(state.favList.slice(index+1,state.favList.length))})
        }
    }
})
export const {setFavorites,removeFromFavorites} = weatherFavorites.actions
const store = configureStore({reducer: { favorites:weatherFavorites.reducer }})
export default store