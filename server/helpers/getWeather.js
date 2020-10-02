const axios = require('axios')

async function getWeather(lat, long) {
    let weather = {}
    await axios({
        method: 'get',
        url: `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_KEY}`
    })
    .then(data => {
        weather = {
            description: data.data.data[0].weather.description,
            imageUrl: `https://www.weatherbit.io/static/img/icons/${data.data.data[0].weather.icon}.png`
        }
    })
    .catch(err => {
        return err
    })
    return weather
}

module.exports = getWeather