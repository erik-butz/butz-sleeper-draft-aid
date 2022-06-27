//const { Router } = require('express')
//const router = Router()
const XLSX = require('xlsx')

const trimJsonData = (jsonData) => {
  Object.entries(jsonData).forEach((player) => {
    delete player[1].Outlook
    delete player[1].Dynasty
    delete player[1].Markers
    delete player[1].Risk
    delete player[1].Points
  })
  return jsonData
}

const getPosition = (res, position) => {
  try {
    let workbook = XLSX.readFile(`src/UDK/${position}.csv`)
    let workSheet = workbook.Sheets.Sheet1
    const jsonData = XLSX.utils.sheet_to_json(workSheet)
    const trimmedJsonData = trimJsonData(jsonData)
    res.status(200).json(trimmedJsonData)
  } catch (error) {
    res.status(500).send('Invalid Position')
  }
}

const fantasyFootballersRankings = (req, res) => {
  console.log('fantasyFootballersRankings endpoint')
  getPosition(res, req?.body?.position)
}

module.exports = { fantasyFootballersRankings }
