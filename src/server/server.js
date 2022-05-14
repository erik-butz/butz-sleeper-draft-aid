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

app.get('/rankings', (req, res) => {
  console.log('Rankings Endpoint')
  const keepTradeCutCall = async () => {
    axios
      .get('https://keeptradecut.com/dynasty-rankings/rookie-rankings')
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const playerNames = _.flatten((extractLinks($)))
        for (let i = 0; i < playerNames.length; i++) {
          const playerName = playerNames[i].PlayerName//.replace(' ', '%20')
          fetchUserByPlayerName(playerName).then(
            console.log('TESTING')
          )
        }
        createExcelWorkbook(playerNames)
      })
  }

  const fetchUserByPlayerName = async (playerName) => {

    console.log('Inside fetchUserByPlayerName')
    const query = {
      full_name: `${playerName}`,
    }

    const foundPlayer = await players.find(query).toArray().then(() => {
      console.log(foundPlayer)
      return foundPlayer
    })
  }

  function createExcelWorkbook(playerNames) {
    const workbook = reader.utils.book_new()
    const ws = reader.utils.json_to_sheet(playerNames)
    reader.utils.book_append_sheet(workbook, ws, 'PlayerRankings')
    reader.writeFileXLSX(workbook, 'KTCData.xlsx', { type: 'file' })
    res.send(playerNames)
  }

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
      .toArray(),
  ]

  keepTradeCutCall()
})




function fetchPlayerById(id) {
  console.log('Fetch Player Endpoint')
  const query = {
    player_id: `${id}`,
  }
  console.log('Inside fetchPlayerById')
  const foundPlayer = players.find(query).toArray()
  return foundPlayer
}

app.listen(3000, () => console.log('Server Ready and Running'))