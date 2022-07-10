const { Router } = require('express')
const router = Router()
require('dotenv').config()

router.get('/', (req, res) => {
  res.status(200).json({ Message: 'Success' })
})

module.exports = router
