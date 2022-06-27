const { Router } = require('express')
const router = Router()
const keeptradecut = require('./ktcRankings')
const fantasyFootballersRankings = require('./fantasyFootballersRankings')
require('dotenv').config()

//request body examples
// {
//   "rankings" : "ffballers/ktc",
//   "position": "QB/RB/WR/TE/DST/K"
// }

router.get('/', (req, res) => {
  console.log('Rankings Endpoint')

  switch (req.body.rankings) {
    case 'ktc':
      console.log('KTC Flow!')
      keeptradecut.keepTradeCutCall(res)
      break
    case 'ffballers':
      console.log('FFBallers Flow!')
      fantasyFootballersRankings.fantasyFootballersRankings(req, res)
      break
    default:
      res.send(500, 'No Rankings Found')
  }
})

module.exports = router
