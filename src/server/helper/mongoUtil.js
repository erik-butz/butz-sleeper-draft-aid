const MongoClient = require('mongodb').MongoClient

let db

const connectToMongoDb = () => {
  const url = `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`
  try {
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
          console.log('Mongodb Connection Successful!!!')
        }
        //Database Name
        db = client.db('SleeperNflPlayers')
      }
    )
  } catch (error) {
    throw error
  }
}

const getDb = () => {
  return db
}

module.exports = { connectToMongoDb, getDb }
