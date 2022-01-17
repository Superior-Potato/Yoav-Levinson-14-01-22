
/**
 * Creates a URL object with given parameters
 * @param {string} baseUrl 
 * @param {string} endPoint 
 * @param {array} queryItems 
 * @returns {URL} object
 */
 export const getURL = (baseUrl,endPoint,queryItems) => {
    var params;
    if(queryItems){
    params = new URLSearchParams(queryItems)
    }
    const url = new URL(baseUrl + endPoint)
    if(queryItems) {
        url.search = params
    }
    return url
}


/**
 * creates a GET request to the provided url
 * @param {URL} url 
 * @returns Promise<*>
 */
export const get = async (url) => {
    return await fetch(url.toString(),{method:'GET',mode:'cors'})
    .then(response => response.json())
}