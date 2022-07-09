const XLSX = require('xlsx')
const mongoUtil = require('./mongoUtil')
const fs = require('fs')

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

  for (const player of jsonData) {
    let playerName = player.Name
    let team = player.Team
    //Massive switch statement to clean up names of sleeper vs excel sheets
    switch (playerName) {
      case 'Jeff Wilson Jr.':
        playerName = 'Jeff Wilson'
        break
      case 'Ronald Jones II':
        playerName = 'Ronald Jones'
        break
      case 'Mark Ingram II':
        playerName = 'Mark Ingram'
        break
      case 'Darrell Henderson Jr.':
        playerName = 'Darrell Henderson'
        break
      case 'Kenneth Walker III':
        playerName = 'Kenneth Walker'
        break
      case 'Melvin Gordon III':
        playerName = 'Melvin Gordon'
        break
      case 'Travis Etienne Jr.':
        playerName = 'Travis Etienne'
        break
      case 'Michael Pittman Jr.':
        playerName = 'Michael Pittman'
        break
      case 'Allen Robinson II':
        playerName = 'Allen Robinson'
        break
      case 'Marvin Jones Jr.':
        playerName = 'Marvin Jones'
        break
      case 'Robby Anderson':
        playerName = 'Robbie Anderson'
        break
      case 'DJ Chark Jr.':
        playerName = 'DJ Chark'
        break
      case 'Cedrick Wilson Jr.':
        playerName = 'Cedrick Wilson'
        break
      case 'John Metchie III':
        playerName = 'John Metchie'
        break
      case 'Terrace Marshall Jr.':
        playerName = 'Terrace Marshall'
        break
      case 'Laviska Shenault Jr.':
        playerName = 'Laviska Shenault'
        break
      case 'Velus Jones Jr.':
        playerName = 'Velus Jones'
        break
      case 'Irv Smith Jr.':
        playerName = 'Irv Smith'
        break
      default:
        break
    }

    const query = {
      full_name: `${playerName}`,
      team: `${team}`,
    }
    const fieldsToQuery = {
      player_id: 1,
      full_name: 1,
      team: 1,
    }
    const foundPlayer = await players
      .find(query)
      .project(fieldsToQuery)
      .toArray()
    player.player_id = await foundPlayer[0]?.player_id
  }
  return jsonData
}

const getPosition = async (res) => {
  try {
    console.log(__dirname)
    const positions = ['QB', 'RB', 'WR', 'TE', 'DST', 'K', 'TOP200']
    for (const position of positions) {
      let workbook = XLSX.readFile(`../UDK/${position}.csv`)
      const file = `../UDK/JSON/${position}.json`
      let workSheet = workbook.Sheets.Sheet1
      const jsonData = XLSX.utils.sheet_to_json(workSheet)
      const trimmedJsonData = await trimJsonData(jsonData)
      fs.writeFile(file, JSON.stringify(trimmedJsonData), (err, _data) => {
        console.log(`POSITION: ${position}`)
        if (!err) {
          console.log(`Successfully created ${position}.json`)
        } else {
          console.log(`Error creating file for ${position}: ${err.message}`)
        }
      })
    }
    res.status(200).json({ "Message": "Success" })
  } catch (error) {
    console.log(`Error creating JSON Files: ${error.message}`)
    res.status(500).json({ "Message": "Could not create JSON files" })
  }
}

module.exports = { getPosition }
