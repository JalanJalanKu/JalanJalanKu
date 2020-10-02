const axios = require('axios')
const getWeather = require('./getWeather')

async function searchFood(req, res, next) {
    try {
        console.log('mulai searchfood');
        let { keyword } = req.params
        let restaurantsArr = await axios({
            method: 'get',
            url: `https://developers.zomato.com/api/v2.1/search?q=${keyword}`,
            headers: {
                'user-key': 'c9d33c4ca5a705fbabb08eff4a198b51'
            }
        })
        let arr = await restaurantsArr.data.restaurants.map(async elem => {
            let weather = await getWeather(elem.restaurant.location.longitude, elem.restaurant.location.latitude)
            console.log(weather, 'INI DI SEARCHFOOD');
            return {
                name: elem.restaurant.name,
                url: elem.restaurant.url,
                location: elem.restaurant.location,
                images: elem.restaurant.photos_url,
                menus: elem.restaurant.menu_url,
                weather
            }
        })
        const restaurants = await Promise.all(arr)
        await console.log(restaurants, 'INI SEARCHFOOD BAWAH');
        await res.status(200).json({ restaurants })
    }
    catch (err) {
        next(err)
    }
}

module.exports = searchFood