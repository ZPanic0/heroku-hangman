if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const PORT = process.env.PORT || 5000
const client = MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })

client.connect()

express()
  .use(express.static(path.join(__dirname, 'front-end/build')))
  .get('/LetterStatistics/get', async (req, res) => res.send(await client.db(process.env.DB_NAME).collection('letter-guess-statistics').find().toArray()))
  .get('/LetterStatistics/update', async (req, res) => {
    if (!req.query.letter ||
      req.query.letter.length !== 1 ||
      !'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(req.query.letter)) {
      return res.sendStatus(400)
    }

    const newValues = { $inc: {} }
    newValues.$inc[req.query.letter] = 1

    await client.db(process.env.DB_NAME).collection('letter-guess-statistics').updateOne({}, newValues)

    return res.sendStatus(200)
  })
  .get('*', (req, res) => res.sendFile(path.join(__dirname, '/front-end/build/index.html')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
