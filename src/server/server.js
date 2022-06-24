const express = require('express')

const app = express()
app.use(express.json())

const fetchAllPlayers = require('./routes/fetchAllPlayers')
const ktcRookieRankings = require('./routes/ktcRookieRankings')
const add = require('./helper/mongoUtil')

app.use('/fetchAllPlayers', fetchAllPlayers)
//app.use('/ktcRookieRankings', ktcRookieRankings)

app.get('/testingMethod', (_req, res) => {
  res.json(add.add(1, 15))
})

app.listen(3000, () => console.log('Server Ready and Running'))
