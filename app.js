const functions = require('./utils.js')

if (!process.argv[2]) {
    console.log("please input location")

} else {

    functions.positionCoordinates(process.argv[2], (error, positionData) => {
    
        if (error) {
            return console.log(error)
        }
    
        functions.weatherForecast(positionData.latitude, positionData.longitude, (error, weatherData) => {
            
            if (error) {
                return console.log(error)
            }
    
            console.log(positionData.location)
            console.log(weatherData)
            
        })
    })
    

}




