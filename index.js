if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const wordBank = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"]
const PORT = process.env.PORT || 5000
const client = MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })

client.connect()

express()
  .use(express.static(path.join(__dirname, 'front-end/build')))
  .get('/LetterStatistics/get', async (req, res) => {
    const result = await client.db(process.env.DB_NAME).collection('letter-guess-statistics').find().toArray()

    res.send(JSON.stringify(result[0]))
  })
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
  .get('/PuzzleInput/get', (req, res) => {
    const word = wordBank[~~(Math.random() * (wordBank.length + 1))].toUpperCase()

    return res.send(word)
  })
  .get('/WinLossStatistics/update', async (req, res) => {
    if (req.query.won === undefined || !req.query.won.length) {
      return res.sendStatus(400)
    }
    const newValues = { $inc: {} }

    newValues.$inc[req.query.won === 'true' ? 'won' : 'lost'] = 1

    await client.db(process.env.DB_NAME).collection('win-loss-statistics').updateOne({}, newValues)

    return res.sendStatus(200)
  })
  .get('/WinLossStatistics/get', async (req, res) => {
    const result = await client.db(process.env.DB_NAME).collection('letter-guess-statistics').findOne({})

    res.send(JSON.stringify(result))
  })
  .get('*', (req, res) => res.sendFile(path.join(__dirname, '/front-end/build/index.html')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
