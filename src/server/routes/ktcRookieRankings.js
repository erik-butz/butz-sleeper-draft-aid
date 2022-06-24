const MongoClient = require('mongodb').MongoClient
const { Router } = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const reader = require('xlsx')
const _ = require('lodash')
const router = Router()
require('dotenv').config()

const url = `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`
//const url = 'mongodb://localhost:27017'

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
      console.log('Mongodb Connection Successful in ktcRookieRankings!')
    }
    //Database Name
    db = client.db('SleeperNflPlayers')
    //Collection (Table) Name in MongoDB
    players = db.collection(collectionName)
  }
)

router.get('/', (_req, res) => {
  console.log('Rankings Endpoint')
  const keepTradeCutCall = async () => {
    axios
      .get('https://keeptradecut.com/dynasty-rankings/rookie-rankings')
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const playerNames = _.flatten(extractLinks($))
        fetchUserByPlayerName(playerNames)
      })
  }

  const fetchUserByPlayerName = async (playerNames) => {
    console.log('Inside fetchUserByPlayerName')
    try {
      for (const element of playerNames) {
        let playerName = element.PlayerName
        //console.log(`Searching for player: ${playerName}`)

        //Custom switch statements for different names on site vs in mongodb db
        switch (playerName) {
          case 'Kenneth Walker III':
            playerName = 'Kenneth Walker'
            break
          case 'Pierre Strong Jr.':
            playerName = 'Pierre Strong'
            break
          case 'Calvin Austin III':
            playerName = 'Calvin Austin'
            break
          case 'Isiah Pacheco':
            playerName = 'Isaih Pacheco'
            break
          default:
            break
        }

        const query = {
          full_name: `${playerName}`,
        }

        const fieldsToQuery = {
          player_id: 1,
          full_name: 1,
        }

        const foundPlayer = await players
          .find(query)
          .project(fieldsToQuery)
          .toArray()
        //console.log(`FOUND PLAYER: ${foundPlayer}`)
        element.player_id = await foundPlayer[0].player_id

      }
      createExcelWorkbook(playerNames)
    } catch (err) {
      console.log(err)
      res.status(500).json("Error in fetchUserByPlayerName")
    }
  }

  const createExcelWorkbook = (playerNames) => {
    const workbook = reader.utils.book_new()
    const ws = reader.utils.json_to_sheet(playerNames)
    reader.utils.book_append_sheet(workbook, ws, 'PlayerRankings')
    reader.writeFileXLSX(workbook, 'KTCData.xlsx', { type: 'file' })
    return res.status(200).json({ message: 'Successfully created ktcRookieRankings Spreadsheet' })
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

module.exports = router