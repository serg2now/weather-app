const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Serg2now'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Serg2now'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Some help message',
        name: 'Serg2now'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress){
        return res.send({
            error: 'You must provide an adress'
        })
    } else{
        const {adress} = req.query
        geocode(adress, (error, {latitude, longitude, location} = {}) => {
            if (error){
                return res.send({
                    error
                })
            } 
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    location,
                    forecast: forecastData,
                    adress
                })
              })
        })
    }
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMessage: 'Help article not found',
        name: 'Serg2now'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Serg2now'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})