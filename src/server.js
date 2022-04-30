const express = require('express')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const axios = require('axios')

const app = express()

app.get('/fetchAllPlayers', (req, res) => {
  let db, players

  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.log(err)
        return
      } else {
        console.log('Mongodb Connection Successful!')
      }
      db = client.db('SleeperNflPlayers')
      players = db.collection('Players')
    })

  const fetchUsers = async () => {
    const response = await fetch(url)
    const data = await response.json()
    return data.json()
  }

  fetchUsers()

  //axios.get('https://api.sleeper.app/v1/players/nfl')
  // axios
  //   .get('https://api.sleeper.app/v1/user/mavelas')
  //   .then((res) => {
  //     return res.data
  //     //console.log(res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     return
  //   })



})

app.listen(3000, () => console.log('Server Ready and Running'))