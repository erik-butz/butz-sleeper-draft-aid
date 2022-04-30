const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const axios = require('axios')

let db, players

MongoClient.connect(url, function (err, client) {
  if (err) {
    console.log(err)
  } else {
    console.log('Mongodb Connection Successful!')
  }
  db = client.db('SleeperNflPlayers')
  players = db.collection('Players')

  fetchAllPlayers(function (data) {
    // data.array.forEach(element => {
    //   console.log('TESTING')
    //   console.log(data.user_id)
    // });
    // data.forEach(element => {
    //   console.log(element)
    // });
    console.log(data)
  })
})

function fetchAllPlayers(callback) {
  //axios.get('https://api.sleeper.app/v1/players/nfl')
  axios
    .get('https://api.sleeper.app/v1/user/mavelas')
    .then((res) => {
      console.log('inside fetchAllPlayers')
      callback(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { fetchAllPlayers }
