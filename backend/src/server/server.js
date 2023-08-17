const express = require('express')
const MongoDb = require('./helper/mongoUtil')
const fetchAllPlayers = require('./routes/fetchAllPlayers')
const setUpRankings = require('./routes/setUpRankings')
const rankings = require('./routes/rankings')
const helloWorld = require('./routes/helloWorld')
const cors = require('cors')

const port = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors());

//Connecting to MongoDB
MongoDb.connectToMongoDb()

app.use('/fetchAllPlayers', fetchAllPlayers)
app.use('/rankings', rankings)
app.use('/setUpRankings', setUpRankings)
app.use('/helloWorld', helloWorld)

app.listen(port, () => console.log(`Server Ready and Running on port ${port}`))
