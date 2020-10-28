const request = require('request')


const geolocation = (callback) => {
    const geoLocationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic291bWFqaXQtMTMxMiIsImEiOiJja2c2cHlrOTkxNmF6MzZyMjV4bWFzN3IxIn0.KJEuOYpNP_h7OeonAcJ8yw'

    request({ url: geoLocationUrl, json: true }, (error, response) => {
        if (error) {
            callback('there is an error', undefined)
        }
        else {
            callback('undefined',{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1]
            })
        }
    })
}

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=82fdf9a963ea76e3d583bf51bca0f610&query=' + longitude + ',' + latitude + '&units=f'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('not able to find location , search again ', undefined)
        } else {
            callback('undefined', 'current temp is : ' + response.body.current.temperature + ' and feels like : ' + response.body.current.feelslike)
        }
    })
}

module.exports = {forecast : forecast , geolocation : geolocation}