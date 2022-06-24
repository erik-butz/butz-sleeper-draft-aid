const MongoClient = require('mongodb').MongoClient

const connectToMongoDb = async () => {
  const url = `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`

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
        console.log('Mongodb Connection Successful in fetchAllPlayers!')
      }
      //Database Name
      return client.db('SleeperNflPlayers')

    }
  )
}

module.exports = { connectToMongoDb }