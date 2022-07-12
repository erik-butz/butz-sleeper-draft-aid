const { Router } = require('express')
const router = Router()
require('dotenv').config()

router.get('/', (_req, res) => {
  console.log(process.env.ENV)
  res.status(200).json({ Message: 'Success' })
})

module.exports = router
