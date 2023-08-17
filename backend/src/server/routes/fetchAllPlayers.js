const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();
const mongoUtil = require('../helper/mongoUtil');
require('dotenv').config();

router.get('/', (_req, res) => {
  console.log('Fetch All Sleeper Players Endpoint')
  const nflPlayersUrl = 'https://api.sleeper.app/v1/players/nfl'
  let players
  const collectionName = 'AllPlayers'
  const playersArray = [];

  const fetchUsers = async () => {
    const response = await fetch(nflPlayersUrl)
    const data = await response.json()

    const db = await mongoUtil.getDb()
    //Collection (Table) Name in MongoDB
    players = await db.collection(collectionName)

    //Mass drop of entire collection and inserting of all players
    //is easier and faster than querying and updating each record
    //This data is not maintained by me and provided by sleeper so a
    //dropping the table and reinserting all the data makes sense
    await db.collection(collectionName).drop()
    .then(() => console.log(`Successfully dropped collection ${collectionName}`))
    .catch(() => console.log(`Error dropping collection ${collectionName}`))

    for (const [_key, value] of Object.entries(data)) {
      playersArray.push(value)
    }
    await players.insertMany(playersArray, { ordered : false })
    .catch(err => console.log(err));
    
    console.log("Finished inserting all players");
    return res.status(200).json({ message: 'Successfully fetched all players' })
  }
  fetchUsers()
})
module.exports = router
