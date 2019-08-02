const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cb8620be770dec8f0a89d0c84ded8731/' + latitude + ',' + longitude + '?units=si'
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else{
            const {temperature, precipProbability} = body.currently
            const {summary, temperatureHigh, temperatureLow} = body.daily.data[0]
            callback(undefined, 'It is currently ' + temperature + ' degrees out. This high today is ' + temperatureHigh + ' with a low of ' + temperatureLow + '. There is a ' + precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast