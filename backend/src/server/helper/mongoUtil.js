const MongoClient = require('mongodb').MongoClient

let db

const mongoDbEnvHelper = () => {
  switch (process.env.NODE_ENV) {
    case 'local':
    case 'development':
      return `mongodb://localhost:27017`
    case 'production':
      return `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPw}@${process.env.MongoDbCollection}`
    default:
      return 'mongodb://localhost:27017'
  }
}

const connectToMongoDb = () => {
  const url = mongoDbEnvHelper()
  console.log(url)
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
          console.log('Successfully connected to MongoDB database')
        }
        //Database Name
        db = client.db('SleeperNflPlayers')
      }
    )
  } catch (error) {
    console.log('Error connecting to MongoDb ' + error.toString())
    throw error
  }
}

const getDb = () => {
  return db
}

module.exports = { connectToMongoDb, getDb }