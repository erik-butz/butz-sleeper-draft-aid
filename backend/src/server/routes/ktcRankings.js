const axios = require('axios')
const cheerio = require('cheerio')
const _ = require('lodash')
const mongoUtil = require('../helper/mongoUtil')
require('dotenv').config()

let players
const collectionName = 'AllPlayers'

const keepTradeCutCall = async (res) => {
  axios
    .get('https://keeptradecut.com/dynasty-rankings/rookie-rankings')
    .then(({ data }) => {
      const $ = cheerio.load(data)
      const playerNames = _.flatten(extractLinks($))
      fetchUserByPlayerName(playerNames, res)
    })
}

const fetchUserByPlayerName = async (playerNames, res) => {
  console.log('Inside fetchUserByPlayerName')
  try {
    const db = await mongoUtil.getDb()
    //Collection (Table) Name in MongoDB
    players = await db.collection(collectionName)

    for (const element of playerNames) {
      let playerName = element.PlayerName
      console.log(`Searching for player: ${playerName}`)

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
      element.player_id = await foundPlayer[0].player_id
    }
    return res.status(200).json(playerNames)
  } catch (err) {
    console.log(err)
    res.status(500).json('Error in fetchUserByPlayerName')
  }
}

const extractLinks = ($) => [
  $('.onePlayer')
    .map((_a, player) => {
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

module.exports = { keepTradeCutCall }
