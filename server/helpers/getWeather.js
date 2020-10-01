const axios = require('axios')

function getWeather(lat, long) {
    axios({
        method: 'get',
        url: `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_KEY}`
    })
    .then(data => {
        console.log('masuk get weather');
        return {
            description: data.data.data[0].weather.description,
            imageUrl: `https://www.weatherbit.io/static/img/icons/${data.data.data[0].weather.icon}.png`
        }
    })
    .catch(err => {
        // console.log(err);
        return err
    })
}

module.exports = getWeather