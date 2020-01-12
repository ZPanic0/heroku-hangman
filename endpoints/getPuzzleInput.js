async function getPuzzleInput(client, request, response) {
    const queryResult = await client
        .db(process.env.DB_NAME)
        .collection('word-dictionary')
        .aggregate([{ $sample: { size: 1 } }])
        .toArray()

    return response.send(queryResult[0].word.toUpperCase())
}

module.exports = getPuzzleInput