const { Router } = require('express')
const router = Router()
const keeptradecut = require('../rankings/ktcRankings')
const rankings = require('../rankings/personalRankings')
require('dotenv').config()

//request body examples
// {
//   "rankings" : "rankings/ktc",
// }

router.post('/', (req, res) => {

  switch (req.body.rankings) {
    case 'ktc':
      console.log('KTC Flow!')
      keeptradecut.keepTradeCutCall(res)
      break
    case 'rankings':
      console.log('Personal Rankings Flow!')
      rankings.getRankings(req, res)
      break
    default:
      res.status(500).send('No Rankings Found')
  }
})

module.exports = router
