const express = require('express')
const app = express()
const port = 5000
const { default: axios } = require('axios');
  
app.use(express.json())

app.get('/coin_data', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${req.query.coin}/`)
    .then(query => res.send(query.data))
    .catch(err => res.send(err))
})

app.get('/coin_history', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${req.query.coin}/market_chart?vs_currency=usd&days=1`)
    .then(query => res.send(query.data))
    .catch(err => res.send(err))
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})