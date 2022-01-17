// json string to object
export const toJson = (string) => {
    return JSON.parse(string)
}

// object to json string
export const fromJson = (json) => {
   return JSON.stringify(json)
}