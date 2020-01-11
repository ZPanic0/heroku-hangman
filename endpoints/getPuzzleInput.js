async function getPuzzleInput(client, request, response) {
    const queryResult = await client.db(process.env.DB_NAME).collection('word-dictionary').findOne({}, { $sample: 1 })

    return response.send(queryResult.word.toUpperCase())
}

module.exports = getPuzzleInput