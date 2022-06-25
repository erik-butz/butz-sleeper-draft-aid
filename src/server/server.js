const express = require('express')
const MongoDb = require('./helper/mongoUtil')
const fetchAllPlayers = require('./routes/fetchAllPlayers')

const app = express()
app.use(express.json())

//Connecting to MongoDB
MongoDb.connectToMongoDb()

const ktcRookieRankings = require('./routes/ktcRookieRankings')

app.use('/fetchAllPlayers', fetchAllPlayers)
app.use('/ktcRookieRankings', ktcRookieRankings)

app.listen(3000, () => console.log('Server Ready and Running'))
