const express = require('express')
const MongoDb = require('./helper/mongoUtil')
const fetchAllPlayers = require('./routes/fetchAllPlayers')
const setUpPositions = require('./routes/setUpPositions')
const rankings = require('./routes/rankings')

const port = 8000

const app = express()
app.use(express.json())

//Connecting to MongoDB
MongoDb.connectToMongoDb()

app.use('/fetchAllPlayers', fetchAllPlayers)
app.use('/rankings', rankings)
app.use('/setUpPositions', setUpPositions)

app.listen(port, () => console.log(`Server Ready and Running on port ${port}`))
