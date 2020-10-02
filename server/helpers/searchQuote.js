const axios = require('axios')

function searchQuote(req, res, next) {
  axios({
    method: 'get',
    url: `https://favqs.com/api/qotd`,
  })
    .then(data => {
      console.log(data.data.quote.body, '<<<<<<<data quote')
      author = data.data.quote.author
      quote = data.data.quote.body
      res.status(200).json({ author, quote })
    })
    .catch(next)
}

module.exports = searchQuote