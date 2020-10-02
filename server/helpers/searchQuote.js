const axios = require('axios')

function searchQuote(req, res, next) {
  axios({
    method: 'get',
    url: `https://favqs.com/api/qotd`,
  })
    .then(data => {
      data = data.quote.map(elem => {
        return {
          quote: elem.quote.body
        }
      })
      res.status(200).json(data)
    })
    .catch(next)
}

module.exports = searchQuote