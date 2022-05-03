const express = require('express')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const fetch = require('node-fetch')

const app = express()

app.get('/fetchAllPlayers', (req, res) => {
  let db, players
  let collectionName = 'TESTPlayers'

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
      players = db.collection(collectionName)

      db.collection(collectionName).drop((err, result) => {
        if (err) {
          console.log(`ERROR DROPPING collection ${collectionName}`)
        } else {
          console.log(result)
        }
      })
    }

  )

  const nflPlayersUrl = 'https://api.sleeper.app/v1/players/nfl'
  const fetchUsers = async () => {
    const response = await fetch(nflPlayersUrl)
    const data = await response.json()

    for (let i = 1; i < Object.keys(data).length; i++) {
      if (data[i] === undefined) {
        continue
      } else {
        players.insertOne(data[i])
      }
    }
    res.status(200).json(data)
  }

  fetchUsers()
})

app.listen(3000, () => console.log('Server Ready and Running'))