const fs = require('fs')

const getPosition = async (res, position) => {
  try {
    fs.readFile(`src/UDK/JSON/${position}.json`, (err, data) => {
      if (!err) {
        const jsonData = JSON.parse(data)
        res.status(200).json(jsonData)
      } else {
        res.status(500).json({ 'Message': `Error fetching data for position: ${position}` })
      }
    })
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`)
  }
}

const fantasyFootballersRankings = (req, res) => {
  getPosition(res, req?.body?.position)
}

module.exports = { fantasyFootballersRankings }
