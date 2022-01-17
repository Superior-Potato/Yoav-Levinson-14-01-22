import validators from "../utils/validators"

// returns an item from the local storage
export const getItemFromStorage = (itemName) => {
    return localStorage.getItem(itemName)
}
// saves a json string represntation of an object to the local storage
export const saveItemToStorage = (itemName,item) => {
    localStorage.setItem(itemName,JSON.stringify(item))
}

// merges new data with existing data with no duplicates
export const saveAndMerge = (itemName,newData) => {
    const existingData = JSON.parse(getItemFromStorage(itemName))

    if(validators.validate(existingData)) {
        let merge  = [...existingData].concat([newData])
        let hash = {}

        for (let item of merge) {
            if(hash[item.Key]) {
               let found = merge.findIndex(e => e.Key === item.Key)
               merge = merge.slice(0,found).concat(merge.slice(found+1,merge.length))
            }
            hash[item.Key] = true
        }
        localStorage.setItem(itemName,JSON.stringify(merge))
    }else {
        localStorage.setItem(itemName,JSON.stringify([newData]))
    }
}

// Deletes a city from stored favorites by key
export const deleteCityFromFavorites = (key) => {
  let favoritesStorage = JSON.parse(getItemFromStorage('favorites'))
  if(validators.validate(favoritesStorage)) {
      const found = favoritesStorage.findIndex(fav => fav.Key === key)
      favoritesStorage = favoritesStorage.slice(0,found).concat(favoritesStorage.slice(found+1,favoritesStorage.length))
      saveItemToStorage('favorites',favoritesStorage)
  }
}