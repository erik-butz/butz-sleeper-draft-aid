const { Router } = require('express')
const fetch = require('node-fetch')
const router = Router()
const mongoUtil = require('../helper/mongoUtil')
require('dotenv').config()

router.get('/', (_req, res) => {

  console.log('Fetch All Sleeper Players Endpoint')
  const nflPlayersUrl = 'https://api.sleeper.app/v1/players/nfl'
  const collectionName = 'AllPlayers'
  let players;

  const fetchUsers = async () => {

    const db = await mongoUtil.connectToMongoDb()
    players = await db.collection(collectionName)
    //Collection (Table) Name in MongoDB

    await db.collection(collectionName).drop((err, result) => {
      if (err) {
        console.log(`ERROR DROPPING collection ${collectionName}`)
      } else {
        console.log(result)
      }
    })

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