'use strict';
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fábio Reis'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Fábio Reis'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This isn\'t quite helpful but serves well as an example help page.',
        title: 'Help',
        name: 'Fábio Reis'
    });
});

app.get('/weather', (req, res) => {
    if (req.query.lat && req.query.lon) {
        forecast(req.query.lat, req.query.lon, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            return res.send({
                forecast: forecastData,
                location: forecastData.locationName + ', ' + forecastData.region + ', ' + forecastData.country,
                address: req.query.address
            });
        });
    }
    else if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
        });
    }
    else {
        return res.send({
            error: 'You must provide an address'
        });
    }

    
});


app.get('/help/*', (req, res) => {
    res.send('404', {
        title: '404',
        name: 'Fábio Reis',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fábio Reis',
        errorMessage: 'Whoops! Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});