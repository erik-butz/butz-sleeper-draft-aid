const { Router } = require('express')
const router = Router()
const createJsonFiles = require('../helper/createJsonFiles')
require('dotenv').config()


router.get('/', async (_req, res) => {
  console.log('setUpPositions Endpoint')

  //Create Json files for different positions
  await createJsonFiles.getPosition()
  res.status(200).json({ "Message": "Success" })
})

module.exports = router
