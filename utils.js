const fs = require('fs')
const request = require('request')



const positionCoordinates = (place, callback) => {
    
    const positionUrl = `http://api.positionstack.com/v1/forward?access_key=f7703f0c4bc8e4055437d9dc5ec9d980&query=${encodeURIComponent(place)}`
    
    request({url: positionUrl, json: true}, (error, response) => { 
        // callback function to run when the request completes
        //how does callback know what is error and response
        if (error) {
            callback('unable to connect', undefined)
            // manages the basic error eg network issues
    
        } else if (response.body.error || response.body.data.length === 0) {
          callback('Invalid location. Not found', undefined)
    
        } else {
            callback(undefined, {
                location: response.body.data[0].label,
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude
            })
        }
        
    })
}


// weatherstack API does not throw error in seemingly wrong coordinates
const weatherForecast = (latitude, longitude, callback) => {
    
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=9943fd2e0d4e5515400b482d5783590c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    //encodeURIComponent stringifies content so that any special char do not break the url

    // json: true automatically parse into json
    request({url: weatherUrl, json: true}, (error, response) => {
    if (error) {
        callback('unable to connect', undefined)
    } else if (response.body.error) {
        callback('unable to find location', undefined)
    } else {
        callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`)
        
    }
})
}

module.exports = {
    positionCoordinates: positionCoordinates,
    weatherForecast: weatherForecast

}