const express = require('express')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const fetch = require('node-fetch')

const app = express()

app.get('/fetchAllPlayers', (req, res) => {
  let db, players

  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.log(err)
        return
      } else {
        console.log('Mongodb Connection Successful!')
      }
      db = client.db('TESTSleeperNflPlayers')
      players = db.collection('TESTPlayers')
    })

  const nflPlayersUrl = 'https://api.sleeper.app/v1/user/mavelas'
  const fetchUsers = async () => {
    const response = await fetch(nflPlayersUrl)
    const data = await response.json()
    console.log(data)
    players.insertOne(data)
    res.status(200).json(data)
  }

  fetchUsers()
})

app.listen(3000, () => console.log('Server Ready and Running'))