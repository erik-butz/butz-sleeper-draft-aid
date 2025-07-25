const mongoUtil = require('../../helper/mongoUtil')

const getPosition = async (res, position) => {
  try {
    const db = await mongoUtil.getDb()

    //Collection (Table) Name in MongoDB
    let players = await db.collection(position)

    //Query to get all documents that are greater than Rank 0 (aka all documents)
    const query = {
      Rank: {$gt: 0}
    }
    
    const foundPlayers = await players
      .find(query)
      .sort({ Rank: 1 }) //Rank: 1 sorts all them by rank in ascending order (1, 2, 3)
      .toArray()
    
    res.status(200).json(foundPlayers)
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`)
  }
}

const fantasyFootballersRankings = (req, res) => {
  getPosition(res, req?.body?.position)
}

module.exports = { fantasyFootballersRankings }
