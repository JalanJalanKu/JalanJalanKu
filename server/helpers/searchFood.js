const axios = require('axios')
const getWeather = require('./getWeather')

function searchFood(req, res, next) {
    let { keyword } = req.params
    axios({
        method: 'get',
        url: `https://developers.zomato.com/api/v2.1/search?q=${keyword}`,
        headers: {
            'user-key': 'c9d33c4ca5a705fbabb08eff4a198b51'
        }
    })
        .then(data => {
            data = data.data.restaurants.map(elem => {
                // let weather = getWeather(elem.restaurant.location.longitude, elem.restaurant.location.latitude)
                console.log(weather, 'masuk searchfood');
                return {
                    name: elem.restaurant.name,
                    url: elem.restaurant.url,
                    location: elem.restaurant.location,
                    images: elem.restaurant.photos_url,
                    menus: elem.restaurant.menu_url,
                    weather: getWeather(elem.restaurant.location.longitude, elem.restaurant.location.latitude)
                }
            })
            res.status(200).json(data)
        })
        .catch(next)
}

module.exports = searchFood