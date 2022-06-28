const XLSX = require('xlsx')
const mongoUtil = require('../helper/mongoUtil')

const trimJsonData = async (jsonData) => {
  Object.entries(jsonData).forEach((player) => {
    delete player[1].Outlook
    delete player[1].Dynasty
    delete player[1].Markers
    delete player[1].Risk
    delete player[1].Points
  })
  jsonData = await addSleeperIdToJson(jsonData)
  return jsonData
}

const addSleeperIdToJson = async (jsonData) => {
  const collectionName = 'AllPlayers'
  const db = await mongoUtil.getDb()
  //Collection (Table) Name in MongoDB
  let players = await db.collection(collectionName)

  Object.entries(jsonData).forEach(async (player) => {
    let playerName = player[1].Name

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
    player[1].player_id = await foundPlayer[0]?.player_id
    //await console.log(player[1])
  })
  return jsonData
}

const getPosition = async (res, position) => {
  try {
    let workbook = XLSX.readFile(`src/UDK/${position}.csv`)
    let workSheet = workbook.Sheets.Sheet1
    const jsonData = XLSX.utils.sheet_to_json(workSheet)
    const trimmedJsonData = await trimJsonData(jsonData)
    await res.status(200).json(trimmedJsonData)
  } catch (error) {
    res.status(500).send('Invalid Position')
  }
}

const fantasyFootballersRankings = (req, res) => {
  console.log('fantasyFootballersRankings endpoint')
  getPosition(res, req?.body?.position)
}

module.exports = { fantasyFootballersRankings }
