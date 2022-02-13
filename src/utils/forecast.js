const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_ACCESS_KEY + '&query=' + latitude + ',' + longitude;
    request({ url, json: true }, (error, { body }) => {
        //console.log('response: ', response);
        if (error) {
            console.log('Unable to connect to weather service');
            callback('Unable to connect to weather service', null);
        }
        else if (body.error) {
            console.log('Unable to find provided location');
            callback('Unable to find provided location', null);
        }
        else {
            const data = body;
            const weatherData = data.current;
            callback(null, weatherData);
        }
    });
};

module.exports = forecast;