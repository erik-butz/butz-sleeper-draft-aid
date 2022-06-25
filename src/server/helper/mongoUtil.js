const MongoClient = require('mongodb').MongoClient

let db
const collectionName = 'AllPlayers'

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
        //Collection (Table) Name in MongoDB
        players = db.collection(collectionName)
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
