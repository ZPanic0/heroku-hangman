if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const PORT = process.env.PORT || 5000
const endpoints = require('./endpoints')
const client = MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })

client.connect()

express()
  .use(express.static(path.join(__dirname, 'front-end/build')))
  .get('/LetterStatistics/get', async (req, res) => await endpoints.getLetterStatistics(client, req, res))
  .get('/LetterStatistics/update', async (req, res) => await endpoints.updateLetterStatistics(client, req, res))
  .get('/PuzzleInput/get', async (req, res) => await endpoints.getPuzzleInput(client, req, res))
  .get('/WinLossStatistics/update', async (req, res) => await endpoints.updateWinLossStatistics(client, req, res))
  .get('/WinLossStatistics/get', async (req, res) => await endpoints.getWinLossStatistics(client, req, res))
  .get('*', (req, res) => res.sendFile(path.join(__dirname, '/front-end/build/index.html')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
