const { Router } = require('express')
const MongoClient = require('mongodb').MongoClient
const fetch = require('node-fetch')
const router = Router()
require('dotenv').config()

const url = `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`

let db, players
const collectionName = 'AllPlayers'

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
      console.log('Mongodb Connection Successful in fetchAllPlayers!')
    }
    //Database Name
    db = client.db('SleeperNflPlayers')
    //Collection (Table) Name in MongoDB
    players = db.collection(collectionName)
  }
)

router.get('/', (_req, res) => {

  console.log('Fetch All Sleeper Players Endpoint')
  db.collection(collectionName).drop((err, result) => {
    if (err) {
      console.log(`ERROR DROPPING collection ${collectionName}`)
    } else {
      console.log(result)
    }
  })

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
    return res.status(200).json({ message: 'Successfully fetched all players' })
  }
  fetchUsers()
})

module.exports = router