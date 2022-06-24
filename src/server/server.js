const express = require('express')

const app = express()
app.use(express.json())

const fetchAllPlayers = require('./routes/fetchAllPlayers')
const ktcRookieRankings = require('./routes/ktcRookieRankings')

app.use('/fetchAllPlayers', fetchAllPlayers)
app.use('/ktcRookieRankings', ktcRookieRankings)

app.listen(3000, () => console.log('Server Ready and Running'))
