const { MongoClient } = require('mongodb')

require('dotenv').config()
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URL

const db = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).connect()

process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('Disconnected')
  process.exit(1)
})

module.exports = db
