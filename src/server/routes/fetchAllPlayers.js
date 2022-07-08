const { Router } = require('express')
const fetch = require('node-fetch')
const router = Router()
const mongoUtil = require('../helper/mongoUtil')
require('dotenv').config()

//TODO: Look into this 
//https://stackoverflow.com/questions/24122981/how-to-stop-insertion-of-duplicate-documents-in-a-mongodb-collection

router.get('/', (_req, res) => {
  //console.log('Fetch All Sleeper Players Endpoint')
  const nflPlayersUrl = 'https://api.sleeper.app/v1/players/nfl'
  let players
  const collectionName = 'AllPlayers'

  const fetchUsers = async () => {
    const db = await mongoUtil.getDb()
    //Collection (Table) Name in MongoDB
    players = await db.collection(collectionName)

    await db.collection(collectionName).drop((err, result) => {
      if (err) {
        console.log(`Error dropping collection ${collectionName}`)
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
