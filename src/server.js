const express = require('express')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const fetch = require('node-fetch')
const axios = require('axios')
const cheerio = require('cheerio')
const reader = require('xlsx')
const _ = require('lodash')

const app = express()

let db, players
let collectionName = 'AllPlayers'

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
    //Database Name
    db = client.db('SleeperNflPlayers')
    //Collection (Table) Name in MongoDB
    players = db.collection(collectionName)
  }
)

app.get('/fetchAllPlayers', (req, res) => {
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
    res.status(200).json(data)
  }

  fetchUsers()
})

app.get('/fetchPlayer', (req, res) => {
  console.log('Fetch Player Endpoint')
  const playerQueryId = req.query.id
  const query = {
    player_id: `${playerQueryId}`,
  }

  const fetchUserByPlayerId = async () => {
    console.log('Inside fetchUserByPlayerId')
    const foundPlayer = await players.find(query).toArray()
    res.send(foundPlayer)
  }
  fetchUserByPlayerId()
})

app.get('/rankings', (req, res) => {
  console.log('Rankings Endpoint')

  

  const extractLinks = ($) => [
    $('.onePlayer')
      .map((_, player) => {
        const $player = $(player)
        return {
          PlayerName: $player.find('.player-name a').text(),
          Rank: $player.find('.rank-number p').text(),
          Position: $player
            .find('.position-team .position')
            .text()
            .substring(0, 2),
          Team: $player.find('.player-name .player-team').text(),
          Tier: $player.find('.player-info p').text(),
          PlayerValue: $player.find('.value p').text(),
        }
      })
      .get(),
  ]

  axios
    .get('https://keeptradecut.com/dynasty-rankings/rookie-rankings')
    .then(({ data }) => {
      const $ = cheerio.load(data)
      const playerNames = extractLinks($)
      const flattenedPlayerNames = _.flatten(playerNames)

      const workbook = reader.utils.book_new()
      const ws = reader.utils.json_to_sheet(flattenedPlayerNames)
      reader.utils.book_append_sheet(workbook, ws, 'PlayerRankings')


      // const worksheet = workbook.Sheets['Rankings']
      // const test =  reader.utils.json_to_sheet(playerNames,['PlayerRankings'])
      // reader.utils.sheet_add_aoa(test, playerNames)
      reader.writeFileXLSX(workbook, 'KTCData.xlsx', {type: 'file'})

      res.send(flattenedPlayerNames)
    })


    //excel stuff here


})

app.listen(3000, () => console.log('Server Ready and Running'))
