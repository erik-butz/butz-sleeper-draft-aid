const { Router } = require('express')
const fetch = require('node-fetch')
const router = Router()
const mongoUtil = require('../helper/mongoUtil')
require('dotenv').config()

const defTeamNames = [
  'ARI', 'ATL', 'BAL', 'BUF', 'CAR',
  'CHI', 'CIN', 'CLE', 'DAL', 'DEN',
  'DET', 'GB', 'HOU', 'IND', 'JAX', 
  'KC', 'LAC', 'LAR', 'LV', 'MIA', 
  'MIN', 'NE', 'NO', 'NYG', 'NYJ', 
  'PHI', 'PIT', 'SEA', 'SF', 'TB', 
  'TEN', 'WAS'
]

router.get('/', (_req, res) => {
  //console.log('Fetch All Sleeper Players Endpoint')
  const nflPlayersUrl = 'https://api.sleeper.app/v1/players/nfl'
  let players
  const collectionName = 'AllPlayers'

  const fetchUsers = async () => {
    const db = await mongoUtil.getDb()
    //Collection (Table) Name in MongoDB
    players = await db.collection(collectionName)

    //Mass drop of entire collection and inserting of all players
    //is easier and faster than querying and updating each record
    await db.collection(collectionName).drop((err, result) => {
      if (err) {
        console.log(`Error dropping collection ${collectionName}`)
      } else {
        console.log(`Successfully dropped collection ${collectionName}`)
      }
    })

    const response = await fetch(nflPlayersUrl)
    const data = await response.json()

    //Api from sleeper doesn't generate a sleeper_id for defenses so need to 
    //loop through each of them like this to insert into mongodb
    defTeamNames.forEach(teamName => {
      players.insertOne(data[teamName])
    })

    //The api returns nested player objects with their "sleeper_id" as the parent for each object
    //Because there are some sleeper_id's missing between the total length and each sleeper_id,
    //I'm just continuing to skip over the missing sleeper_ids
    for (let i = 1; i < Object.keys(data).length; i++) {
      if (data[i] === undefined) {
        continue
      } else {
        //Loops through each player and inserts it one at a time
      players.insertOne(data[i])
      }
    }
    return res.status(200).json({ message: 'Successfully fetched all players' })
  }
  fetchUsers()
})
module.exports = router
