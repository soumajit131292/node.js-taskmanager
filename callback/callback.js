const methods = require('./utils/utils')

methods.geolocation((error, data) => {
    console.log(data.longitude)
    console.log(data.latitude)
    methods.forecast(data.latitude, data.longitude, (error, data) => {
        console.log('Data', data)
    })
})