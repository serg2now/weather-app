const request = require('request')

const geocode = (adress, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) +'.json?access_token=pk.eyJ1Ijoic2VyZzJub3ciLCJhIjoiY2p5bzc2bG5hMHlrZzNtdXdyZHFjZWF6diJ9.O5MKKTHAJ3bo90hVZQTIgA'
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode