const XLSX = require('xlsx')
const mongoUtil = require('./mongoUtil')

const trimData = async (data) => {
  Object.entries(data).forEach((player) => {
    delete player[1].Outlook
    delete player[1].Dynasty
    delete player[1].Markers
    delete player[1].Risk
    delete player[1].Points
  })
  data = await addSleeperIdToData(data)
  return data
}

const addSleeperIdToData = async (data) => {
  const collectionName = 'AllPlayers'
  const db = await mongoUtil.getDb()
  //Collection (Table) Name in MongoDB
  let players = await db.collection(collectionName)

  for (const player of data) {
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
        playerName = 'Ken Walker'
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
  return data
}

const getPosition = async (res) => {
  try {
    console.log(__dirname)
    const positions = ['QB', 'RB', 'WR', 'TE', 'DST', 'K', 'TOP200']
    for (const position of positions) {
      console.log(`POSITION: ${position}`)
      const db = await mongoUtil.getDb()
      const positionTable = await db.collection(position)

      //Need to drop to update all rankings
      await db.collection(position).drop((err, result) => {
        if (err) {
          console.log(`Error dropping collection ${position}`)
        } else {
          console.log(result)
        }
      })

      //Paste csv files in helper folder
      let workbook = XLSX.readFile(`${__dirname}` + `/${position}.csv`)
      let workSheet = workbook.Sheets.Sheet1
      const jsonData = XLSX.utils.sheet_to_json(workSheet)
      const trimmedJsonData = await trimData(jsonData)
      trimmedJsonData.forEach(async (player) => {
        //const responseFromDb = 
        await positionTable.insertOne(player)
        //TODO: Add error if response from DB is not True (success). Need to log it out
      })
    }
    res.status(200).json({ Message: 'Success' })
  } catch (error) {
    console.log(`Error inserting into position collections: ${error.message}`)
    res
      .status(500)
      .json({ Message: 'Could not create players into collections' })
  }
}

module.exports = { getPosition }
