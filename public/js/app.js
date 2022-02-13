const serviceOn = true; // Test variable for toggling the API callout

const weatherForm = document.querySelector('form');
const $messageOne = document.getElementById('message-1');
const $messageTwo = document.getElementById('message-2');

const $yourLocationBtn = document.getElementById('your-location');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = document.querySelector('input');
    const location = search.value;

    $messageOne.textContent = 'Loading...';

    if (location && serviceOn) {
        fetch('/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.error('Error: ', data.error);
                    $messageOne.textContent = data.error;
                }
                else {
                    $messageOne.textContent = data.location;
                    $messageTwo.innerHTML = 'Temperature: ' + data.forecast.temperature + ' ºC' + '<br/>' +
                    data.forecast.weather_descriptions[0] + '<br/>' +
                    'Wind speed: ' + data.forecast.wind_speed + ' km/h' + '<br/>' +
                    'Wind direction: ' + data.forecast.wind_dir;
                }
            });
        });
    }
    
});

$yourLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation :(');
    }

    navigator.geolocation.getCurrentPosition((position) => {

        navigator.geolocation.getCurrentPosition((position) => {

            fetch('/weather?address=' + location)
            .then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.error('Error: ', data.error);
                        $messageOne.textContent = data.error;
                    }
                    else {
                        $messageOne.textContent = data.location;
                        $messageTwo.innerHTML = 'Temperature: ' + data.forecast.temperature + ' ºC' + '<br/>' +
                        data.forecast.weather_descriptions[0] + '<br/>' +
                        'Wind speed: ' + data.forecast.wind_speed + ' km/h' + '<br/>' +
                        'Wind direction: ' + data.forecast.wind_dir;
                    }
                });
            });
        });
    });
});